"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { EMPRESA } from "@/lib/empresa";
import { cerrarSesion, exigir, guardarSesion, tokenActual } from "@/lib/auth/sesion";

/**
 * Acciones del formulario. No tocan la base de datos: llaman al backend con el token
 * de la sesión, y el backend decide si se puede (aquí solo se vuelve a exigir sesión).
 */

export type Estado = { error?: string; enlace?: string; ok?: string } | undefined;

const texto = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
type Sesion = { token: string; expira: string };

/** Enlace completo que se entrega a la persona; el token viaja solo en el enlace. */
const urlEnlace = (token: string) => `${EMPRESA.sitio}/intranet/activar/${token}`;

export async function ingresar(_prev: Estado, form: FormData): Promise<Estado> {
  const r = await api<Sesion>("/api/auth/login", {
    metodo: "POST",
    cuerpo: { email: texto(form, "email"), clave: String(form.get("clave") ?? "") },
  });
  if (!r.ok) return { error: r.error };
  await guardarSesion(r.datos.token, r.datos.expira);
  redirect("/intranet/panel");
}

export async function salir() {
  await cerrarSesion();
  redirect("/intranet");
}

export async function activar(token: string, _prev: Estado, form: FormData): Promise<Estado> {
  const r = await api<Sesion>("/api/auth/activar", {
    metodo: "POST",
    cuerpo: { token, clave: String(form.get("clave") ?? ""), repetida: String(form.get("repetida") ?? "") },
  });
  if (!r.ok) return { error: r.error };
  await guardarSesion(r.datos.token, r.datos.expira);
  redirect("/intranet/panel");
}

export async function crearUsuario(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("administrador");
  const r = await api<{ mensaje: string; token: string }>("/api/usuarios", {
    metodo: "POST",
    token: await tokenActual(),
    cuerpo: {
      email: texto(form, "email"),
      nombre: texto(form, "nombre"),
      rol: texto(form, "rol"),
      area: texto(form, "area"),
    },
  });
  if (!r.ok) return { error: r.error };
  revalidatePath("/intranet/usuarios");
  return { ok: r.datos.mensaje, enlace: urlEnlace(r.datos.token) };
}

export async function nuevoEnlace(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("administrador");
  const id = encodeURIComponent(texto(form, "id"));
  const r = await api<{ mensaje: string; token: string }>(`/api/usuarios/${id}/enlace`, {
    metodo: "POST",
    token: await tokenActual(),
  });
  if (!r.ok) return { error: r.error };
  return { ok: r.datos.mensaje, enlace: urlEnlace(r.datos.token) };
}

export async function cambiarEstado(form: FormData) {
  await exigir("administrador");
  const id = encodeURIComponent(texto(form, "id"));
  await api(`/api/usuarios/${id}/estado`, {
    metodo: "POST",
    token: await tokenActual(),
    cuerpo: { activo: texto(form, "activo") === "1" },
  });
  revalidatePath("/intranet/usuarios");
}
