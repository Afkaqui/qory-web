import "server-only";
import { pool } from "@/lib/db";
import { auditar } from "@/lib/auth/auditoria";
import { hashClave, hashToken, nuevoToken, validarClave, verificarClave } from "@/lib/auth/password";
import { NIVEL_ROL, puedeGestionar, rolesAsignables, type Rol } from "@/lib/auth/roles";

/**
 * Lógica de negocio del backend (VPS). Las rutas de /api solo traducen HTTP a estas
 * funciones. Nada de aquí se importa desde la interfaz.
 */

export type Usuario = { id: string; email: string; nombre: string; rol: Rol; area: string | null };
export type Resultado<T> = ({ ok: true } & T) | { ok: false; error: string; status: number };

const falla = (error: string, status = 400) => ({ ok: false as const, error, status });

const MAX_INTENTOS = 5;
const BLOQUEO_MIN = 15;
const VIGENCIA_ENLACE_H = 72;
const SESION_MS = 1000 * 60 * 60 * 12;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Clave falsa para gastar el mismo tiempo cuando el correo no existe. */
const HASH_FALSO = "scrypt$00000000000000000000000000000000$" + "00".repeat(64);

/* ----------------------------------------------------------------- sesiones */

async function abrirSesion(usuarioId: string) {
  const token = nuevoToken();
  const expira = new Date(Date.now() + SESION_MS);
  await pool.query("INSERT INTO sesiones (token_hash, usuario_id, expira_en) VALUES ($1,$2,$3)", [
    hashToken(token),
    usuarioId,
    expira,
  ]);
  return { token, expira: expira.toISOString() };
}

export async function usuarioPorToken(token: string | null): Promise<Usuario | null> {
  if (!token) return null;
  const { rows } = await pool.query(
    `SELECT u.id, u.email, u.nombre, u.rol, u.area
       FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
      WHERE s.token_hash = $1 AND s.expira_en > now() AND u.activo`,
    [hashToken(token)],
  );
  return rows[0] ?? null;
}

export async function cerrarSesion(token: string) {
  await pool.query("DELETE FROM sesiones WHERE token_hash = $1", [hashToken(token)]);
}

/* ------------------------------------------------------------------- ingreso */

export async function ingresar(emailEntrada: string, clave: string) {
  const email = emailEntrada.trim().toLowerCase();
  const generico = falla("Correo o contraseña incorrectos.", 401);
  if (!email || !clave) return generico;

  const { rows } = await pool.query(
    "SELECT id, email, nombre, rol, area, clave_hash, activo, intentos, bloqueado_hasta FROM usuarios WHERE lower(email) = $1",
    [email],
  );
  const u = rows[0];

  if (u?.bloqueado_hasta && new Date(u.bloqueado_hasta) > new Date()) {
    await verificarClave(clave, HASH_FALSO);
    return falla(
      `Demasiados intentos. Vuelve a probar en ${BLOQUEO_MIN} minutos o pide ayuda a un administrador.`,
      429,
    );
  }

  const correcta = await verificarClave(clave, u?.clave_hash ?? HASH_FALSO);
  if (!u || !u.activo || !correcta) {
    if (u) {
      const intentos = u.intentos + 1;
      const bloquear = intentos >= MAX_INTENTOS;
      await pool.query("UPDATE usuarios SET intentos = $2, bloqueado_hasta = $3 WHERE id = $1", [
        u.id,
        bloquear ? 0 : intentos,
        bloquear ? new Date(Date.now() + BLOQUEO_MIN * 60_000) : null,
      ]);
      if (bloquear) await auditar({ id: u.id, email: u.email }, "bloqueo_por_intentos", u.email);
    }
    return generico;
  }

  await pool.query("UPDATE usuarios SET intentos = 0, bloqueado_hasta = NULL, ultimo_ingreso = now() WHERE id = $1", [u.id]);
  const sesion = await abrirSesion(u.id);
  await auditar({ id: u.id, email: u.email }, "ingreso");
  return {
    ok: true as const,
    ...sesion,
    usuario: { id: u.id, email: u.email, nombre: u.nombre, rol: u.rol, area: u.area } as Usuario,
  };
}

/* ---------------------------------------------------------------- activación */

/** Crea un enlace de un solo uso y devuelve solo el token (en la base queda su hash). */
async function emitirEnlace(usuarioId: string, tipo: "activacion" | "reset"): Promise<string> {
  const token = nuevoToken();
  await pool.query("DELETE FROM enlaces WHERE usuario_id = $1 AND usado_en IS NULL", [usuarioId]);
  await pool.query(
    "INSERT INTO enlaces (token_hash, usuario_id, tipo, expira_en) VALUES ($1,$2,$3, now() + make_interval(hours => $4))",
    [hashToken(token), usuarioId, tipo, VIGENCIA_ENLACE_H],
  );
  return token;
}

export async function activar(token: string, clave: string, repetida: string) {
  const invalida = validarClave(clave);
  if (invalida) return falla(invalida);
  if (clave !== repetida) return falla("Las contraseñas no coinciden.");

  const hash = await hashClave(clave);
  const cliente = await pool.connect();
  let usuarioId: string | null = null;
  try {
    await cliente.query("BEGIN");
    // Marcar el enlace como usado y definir la clave van en la misma transacción:
    // dos intentos simultáneos con el mismo enlace no pueden pasar ambos.
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
      await cliente.query("DELETE FROM sesiones WHERE usuario_id = $1", [usuarioId]);
    }
    await cliente.query("COMMIT");
  } catch (e) {
    await cliente.query("ROLLBACK");
    throw e;
  } finally {
    cliente.release();
  }

  if (!usuarioId) return falla("Este enlace ya se usó o venció. Pide uno nuevo a un administrador.", 410);
  const { rows } = await pool.query("SELECT id, email, nombre, rol, area, activo FROM usuarios WHERE id = $1", [usuarioId]);
  const u = rows[0];
  if (!u?.activo) return falla("Esta cuenta está desactivada.", 403);
  await auditar({ id: u.id, email: u.email }, "clave_definida", u.email);
  return { ok: true as const, ...(await abrirSesion(u.id)) };
}

/* ------------------------------------------------------------------ usuarios */

export async function listarUsuarios(actor: Usuario) {
  const { rows } = await pool.query(
    `SELECT id, nombre, email, rol, area, activo, (clave_hash IS NOT NULL) AS con_clave, ultimo_ingreso
       FROM usuarios
      ORDER BY CASE rol WHEN 'superadmin' THEN 0 WHEN 'administrador' THEN 1 WHEN 'jefe' THEN 2 ELSE 3 END, nombre`,
  );
  return {
    ok: true as const,
    roles: rolesAsignables(actor.rol),
    usuarios: rows.map((u) => ({
      ...u,
      gestionable: puedeGestionar(actor.rol, u.rol) && u.id !== actor.id,
    })),
  };
}

export async function crearUsuario(actor: Usuario, datos: { email: string; nombre: string; rol: string; area?: string }) {
  const email = (datos.email ?? "").trim().toLowerCase();
  const nombre = (datos.nombre ?? "").trim();
  const rol = datos.rol as Rol;
  const area = (datos.area ?? "").trim() || null;

  if (!EMAIL.test(email)) return falla("Escribe un correo válido.");
  if (nombre.length < 3) return falla("Escribe el nombre completo.");
  if (!rolesAsignables(actor.rol).includes(rol)) return falla("No tienes permiso para crear ese rol.", 403);

  let id: string;
  try {
    const { rows } = await pool.query(
      "INSERT INTO usuarios (email, nombre, rol, area, creado_por) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [email, nombre, rol, area, actor.id],
    );
    id = rows[0].id;
  } catch (e) {
    if ((e as { code?: string }).code === "23505") return falla("Ya existe un usuario con ese correo.", 409);
    throw e;
  }
  await auditar(actor, "usuario_creado", email, `rol ${rol}`);
  return { ok: true as const, mensaje: `Usuario creado: ${nombre}.`, token: await emitirEnlace(id, "activacion") };
}

async function objetivoGestionable(actor: Usuario, id: string) {
  const { rows } = await pool.query("SELECT id, email, rol, activo FROM usuarios WHERE id = $1", [id]);
  const o = rows[0];
  if (!o || !puedeGestionar(actor.rol, o.rol)) return null;
  return o as { id: string; email: string; rol: Rol; activo: boolean };
}

export async function nuevoEnlace(actor: Usuario, id: string) {
  const o = await objetivoGestionable(actor, id);
  if (!o) return falla("No tienes permiso sobre esa cuenta.", 403);
  if (!o.activo) return falla("La cuenta está desactivada.", 409);
  await auditar(actor, "enlace_emitido", o.email);
  return {
    ok: true as const,
    mensaje: `Enlace nuevo para ${o.email}. Vale ${VIGENCIA_ENLACE_H} horas y se usa una sola vez.`,
    token: await emitirEnlace(o.id, "reset"),
  };
}

export async function cambiarEstado(actor: Usuario, id: string, activo: boolean) {
  const o = await objetivoGestionable(actor, id);
  if (!o) return falla("No tienes permiso sobre esa cuenta.", 403);
  if (o.id === actor.id) return falla("Nadie se desactiva a sí mismo.", 409);
  if (!activo && o.rol === "superadmin") {
    // Nunca puede quedar el sistema sin un superadmin activo.
    const { rows } = await pool.query("SELECT count(*)::int AS n FROM usuarios WHERE rol = 'superadmin' AND activo");
    if (rows[0].n <= 1) return falla("Debe quedar al menos un super administrador activo.", 409);
  }
  await pool.query("UPDATE usuarios SET activo = $2 WHERE id = $1", [o.id, activo]);
  if (!activo) await pool.query("DELETE FROM sesiones WHERE usuario_id = $1", [o.id]);
  await auditar(actor, activo ? "usuario_reactivado" : "usuario_desactivado", o.email);
  return { ok: true as const };
}

/* ----------------------------------------------------------------- auditoría */

export async function listarAuditoria() {
  const { rows } = await pool.query(
    "SELECT id, cuando, actor, accion, objetivo, detalle FROM auditoria ORDER BY id DESC LIMIT 200",
  );
  return { ok: true as const, registros: rows };
}

export { NIVEL_ROL };
