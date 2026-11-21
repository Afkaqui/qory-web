"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { auditar } from "@/lib/auth/auditoria";
import { hashClave, hashToken, nuevoToken, validarClave, verificarClave } from "@/lib/auth/password";
import { puedeGestionar, rolesAsignables, type Rol } from "@/lib/auth/roles";
import { cerrarSesion, crearSesion, exigir } from "@/lib/auth/sesion";

export type Estado = { error?: string; enlace?: string; ok?: string } | undefined;

const MAX_INTENTOS = 5;
const BLOQUEO_MIN = 15;
const VIGENCIA_ENLACE_H = 72;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const texto = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

/** Clave falsa para gastar el mismo tiempo cuando el correo no existe. */
const HASH_FALSO = "scrypt$00000000000000000000000000000000$" + "00".repeat(64);

/* ------------------------------------------------------------------ ingreso */

export async function ingresar(_prev: Estado, form: FormData): Promise<Estado> {
  const email = texto(form, "email").toLowerCase();
  const clave = String(form.get("clave") ?? "");
  const generico = { error: "Correo o contraseña incorrectos." };
  if (!email || !clave) return generico;

  const { rows } = await pool.query(
    "SELECT id, email, clave_hash, activo, intentos, bloqueado_hasta FROM usuarios WHERE lower(email) = $1",
    [email],
  );
  const u = rows[0];

  if (u?.bloqueado_hasta && new Date(u.bloqueado_hasta) > new Date()) {
    await verificarClave(clave, HASH_FALSO);
    return { error: `Demasiados intentos. Vuelve a probar en ${BLOQUEO_MIN} minutos o pide ayuda a un administrador.` };
  }

  const correcta = await verificarClave(clave, u?.clave_hash ?? HASH_FALSO);
  if (!u || !u.activo || !correcta) {
    if (u) {
      const intentos = u.intentos + 1;
      const bloquear = intentos >= MAX_INTENTOS;
      await pool.query(
        "UPDATE usuarios SET intentos = $2, bloqueado_hasta = $3 WHERE id = $1",
        [u.id, bloquear ? 0 : intentos, bloquear ? new Date(Date.now() + BLOQUEO_MIN * 60_000) : null],
      );
      if (bloquear) await auditar({ id: u.id, email: u.email }, "bloqueo_por_intentos", u.email);
    }
    return generico;
  }

  await pool.query("UPDATE usuarios SET intentos = 0, bloqueado_hasta = NULL, ultimo_ingreso = now() WHERE id = $1", [u.id]);
  await crearSesion(u.id);
  await auditar({ id: u.id, email: u.email }, "ingreso");
  redirect("/intranet/panel");
}

export async function salir() {
  await cerrarSesion();
  redirect("/intranet");
}

/* --------------------------------------------------------------- activación */

/** Crea un enlace de un solo uso y devuelve la URL completa (el token no se guarda en claro). */
async function emitirEnlace(usuarioId: string, tipo: "activacion" | "reset"): Promise<string> {
  const token = nuevoToken();
  await pool.query("DELETE FROM enlaces WHERE usuario_id = $1 AND usado_en IS NULL", [usuarioId]);
  await pool.query(
    "INSERT INTO enlaces (token_hash, usuario_id, tipo, expira_en) VALUES ($1,$2,$3, now() + make_interval(hours => $4))",
    [hashToken(token), usuarioId, tipo, VIGENCIA_ENLACE_H],
  );
  const origen = process.env.APP_URL ?? "";
  return `${origen}/intranet/activar/${token}`;
}

export async function activar(token: string, _prev: Estado, form: FormData): Promise<Estado> {
  const clave = String(form.get("clave") ?? "");
  const repetida = String(form.get("repetida") ?? "");
  const falla = validarClave(clave);
  if (falla) return { error: falla };
  if (clave !== repetida) return { error: "Las contraseñas no coinciden." };

  const hash = await hashClave(clave);
  const cliente = await pool.connect();
  let usuarioId: string | null = null;
  try {
    await cliente.query("BEGIN");
    // El UPDATE ... RETURNING marca el enlace como usado de forma atómica: dos intentos
    // simultáneos con el mismo enlace no pueden pasar ambos.
    const { rows } = await cliente.query(
      `UPDATE enlaces SET usado_en = now()
        WHERE token_hash = $1 AND usado_en IS NULL AND expira_en > now()
        RETURNING usuario_id`,
      [hashToken(token)],
    );
    if (rows[0]) {
      usuarioId = rows[0].usuario_id;
      await cliente.query(
        "UPDATE usuarios SET clave_hash = $2, intentos = 0, bloqueado_hasta = NULL WHERE id = $1 AND activo",
        [usuarioId, hash],
      );
      // Cambiar la clave cierra las sesiones abiertas de esa cuenta.
      await cliente.query("DELETE FROM sesiones WHERE usuario_id = $1", [usuarioId]);
    }
    await cliente.query("COMMIT");
  } catch (e) {
    await cliente.query("ROLLBACK");
    throw e;
  } finally {
    cliente.release();
  }

  if (!usuarioId) return { error: "Este enlace ya se usó o venció. Pide uno nuevo a un administrador." };
  const { rows } = await pool.query("SELECT id, email, activo FROM usuarios WHERE id = $1", [usuarioId]);
  if (!rows[0]?.activo) return { error: "Esta cuenta está desactivada." };
  await auditar({ id: rows[0].id, email: rows[0].email }, "clave_definida", rows[0].email);
  await crearSesion(rows[0].id);
  redirect("/intranet/panel");
}

/* ----------------------------------------------------- gestión de usuarios */

export async function crearUsuario(_prev: Estado, form: FormData): Promise<Estado> {
  const actor = await exigir("administrador");
  const email = texto(form, "email").toLowerCase();
  const nombre = texto(form, "nombre");
  const rol = texto(form, "rol") as Rol;
  const area = texto(form, "area") || null;

  if (!EMAIL.test(email)) return { error: "Escribe un correo válido." };
  if (nombre.length < 3) return { error: "Escribe el nombre completo." };
  if (!rolesAsignables(actor.rol).includes(rol)) return { error: "No tienes permiso para crear ese rol." };

  let id: string;
  try {
    const { rows } = await pool.query(
      "INSERT INTO usuarios (email, nombre, rol, area, creado_por) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [email, nombre, rol, area, actor.id],
    );
    id = rows[0].id;
  } catch (e) {
    if ((e as { code?: string }).code === "23505") return { error: "Ya existe un usuario con ese correo." };
    throw e;
  }
  await auditar(actor, "usuario_creado", email, `rol ${rol}`);
  revalidatePath("/intranet/usuarios");
  return { ok: `Usuario creado: ${nombre}.`, enlace: await emitirEnlace(id, "activacion") };
}

async function objetivoGestionable(actorRol: Rol, id: string) {
  const { rows } = await pool.query("SELECT id, email, rol, activo FROM usuarios WHERE id = $1", [id]);
  const o = rows[0];
  if (!o || !puedeGestionar(actorRol, o.rol)) return null;
  return o as { id: string; email: string; rol: Rol; activo: boolean };
}

export async function nuevoEnlace(_prev: Estado, form: FormData): Promise<Estado> {
  const actor = await exigir("administrador");
  const o = await objetivoGestionable(actor.rol, texto(form, "id"));
  if (!o) return { error: "No tienes permiso sobre esa cuenta." };
  if (!o.activo) return { error: "La cuenta está desactivada." };
  await auditar(actor, "enlace_emitido", o.email);
  return { ok: `Enlace nuevo para ${o.email}. Vale ${VIGENCIA_ENLACE_H} horas y se usa una sola vez.`, enlace: await emitirEnlace(o.id, "reset") };
}

export async function cambiarEstado(form: FormData) {
  const actor = await exigir("administrador");
  const o = await objetivoGestionable(actor.rol, texto(form, "id"));
  if (!o || o.id === actor.id) return; // nadie se desactiva a sí mismo
  const activar = texto(form, "activo") === "1";

  if (!activar && o.rol === "superadmin") {
    // Nunca puede quedar el sistema sin un superadmin activo.
    const { rows } = await pool.query("SELECT count(*)::int AS n FROM usuarios WHERE rol = 'superadmin' AND activo");
    if (rows[0].n <= 1) return;
  }
  await pool.query("UPDATE usuarios SET activo = $2 WHERE id = $1", [o.id, activar]);
  if (!activar) await pool.query("DELETE FROM sesiones WHERE usuario_id = $1", [o.id]);
  await auditar(actor, activar ? "usuario_reactivado" : "usuario_desactivado", o.email);
  revalidatePath("/intranet/usuarios");
}
