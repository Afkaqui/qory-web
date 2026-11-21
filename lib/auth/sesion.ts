import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { hashToken, nuevoToken } from "@/lib/auth/password";
import { NIVEL_ROL, type Rol } from "@/lib/auth/roles";

export const COOKIE = "qory_sesion";
const DURACION_MS = 1000 * 60 * 60 * 12; // 12 horas

export type Usuario = { id: string; email: string; nombre: string; rol: Rol; area: string | null };

export async function crearSesion(usuarioId: string) {
  const token = nuevoToken();
  const expira = new Date(Date.now() + DURACION_MS);
  await pool.query("INSERT INTO sesiones (token_hash, usuario_id, expira_en) VALUES ($1,$2,$3)", [
    hashToken(token),
    usuarioId,
    expira,
  ]);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expira,
  });
}

export async function cerrarSesion() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await pool.query("DELETE FROM sesiones WHERE token_hash = $1", [hashToken(token)]);
  jar.delete(COOKIE);
}

/** Usuario de la sesión actual, o null. La sesión vive en la base: se puede revocar. */
export const usuarioActual = cache(async (): Promise<Usuario | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const { rows } = await pool.query(
    `SELECT u.id, u.email, u.nombre, u.rol, u.area
       FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
      WHERE s.token_hash = $1 AND s.expira_en > now() AND u.activo`,
    [hashToken(token)],
  );
  return rows[0] ?? null;
});

/** Para páginas y acciones: exige sesión y, si se pide, un rol mínimo. */
export async function exigir(minimo: Rol = "operario"): Promise<Usuario> {
  const u = await usuarioActual();
  if (!u) redirect("/intranet");
  if (NIVEL_ROL[u.rol] < NIVEL_ROL[minimo]) notFound();
  return u;
}
