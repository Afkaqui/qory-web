import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { api } from "@/lib/api";
import { NIVEL_ROL, type Rol } from "@/lib/auth/roles";

/**
 * Sesión del lado de la web. El token lo emite y lo valida el backend (que lo guarda
 * hasheado en su base y puede revocarlo); aquí solo vive en una cookie httpOnly.
 */

export const COOKIE = "qory_sesion";

export type Usuario = { id: string; email: string; nombre: string; rol: Rol; area: string | null };

export async function guardarSesion(token: string, expira: string) {
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expira),
  });
}

export async function tokenActual() {
  return (await cookies()).get(COOKIE)?.value ?? null;
}

export async function cerrarSesion() {
  const token = await tokenActual();
  if (token) await api("/api/auth/logout", { metodo: "POST", token });
  (await cookies()).delete(COOKIE);
}

/** Usuario de la sesión actual, o null. Se pregunta al backend: allí está la verdad. */
export const usuarioActual = cache(async (): Promise<Usuario | null> => {
  const token = await tokenActual();
  if (!token) return null;
  const r = await api<{ usuario: Usuario }>("/api/auth/me", { token });
  return r.ok ? r.datos.usuario : null;
});

/** Para páginas y acciones: exige sesión y, si se pide, un rol mínimo. */
export async function exigir(minimo: Rol = "operario"): Promise<Usuario> {
  const u = await usuarioActual();
  if (!u) redirect("/intranet");
  if (NIVEL_ROL[u.rol] < NIVEL_ROL[minimo]) notFound();
  return u;
}
