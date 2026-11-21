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
      celular: texto(form, "celular"),
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

/* ------------------------------------------------------------ tablero */

async function llamar(ruta: string, cuerpo: Record<string, unknown>, revalidar: string[], ok: string): Promise<Estado> {
  const r = await api(ruta, { metodo: "POST", token: await tokenActual(), cuerpo });
  if (!r.ok) return { error: r.error };
  for (const p of revalidar) revalidatePath(p);
  return { ok };
}

export async function guardarCaptura(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("jefe");
  return llamar(
    "/api/captura",
    {
      periodo: texto(form, "periodo"),
      codigo: texto(form, "codigo"),
      valor: texto(form, "valor"),
      denominador: texto(form, "denominador"),
      meta: texto(form, "meta"),
      referencia: texto(form, "referencia"),
    },
    ["/intranet/captura", "/intranet/panel"],
    "Guardado.",
  );
}

export async function guardarCajaSemana(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("jefe");
  return llamar(
    "/api/caja",
    {
      periodo: texto(form, "periodo"),
      semana: Number(texto(form, "semana")),
      cajaInicial: texto(form, "cajaInicial"),
      cobros: texto(form, "cobros"),
      pagos: texto(form, "pagos"),
      evidencia: texto(form, "evidencia"),
    },
    ["/intranet/caja", "/intranet/panel"],
    "Guardado.",
  );
}

export async function fijarCorte(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("administrador");
  return llamar(
    "/api/corte",
    { periodo: texto(form, "periodo"), corte: texto(form, "corte") },
    ["/intranet/panel", "/intranet/caja", "/intranet/acciones"],
    "Corte guardado.",
  );
}

export async function guardarAccion(_prev: Estado, form: FormData): Promise<Estado> {
  await exigir("jefe");
  const id = texto(form, "id");
  return llamar(
    id ? `/api/acciones/${encodeURIComponent(id)}` : "/api/acciones",
    {
      codigo: texto(form, "codigo"),
      brecha: texto(form, "brecha"),
      accion: texto(form, "accion"),
      responsable: texto(form, "responsable"),
      fechaLimite: texto(form, "fechaLimite"),
      estado: texto(form, "estado"),
      evidencia: texto(form, "evidencia"),
    },
    ["/intranet/acciones", "/intranet/panel"],
    id ? "Guardado." : "Acción registrada.",
  );
}
