import "server-only";
import { NIVEL_ROL, type Rol } from "@/lib/auth/roles";
import { usuarioPorToken, type Usuario } from "@/lib/servidor/servicio";

const SIN_CACHE = { "Cache-Control": "no-store" };

/** Traduce el resultado de un servicio a una respuesta JSON; los fallos llevan su código HTTP. */
export function responder(r: { ok: boolean; status?: number; [k: string]: unknown }) {
  if (r.ok === false) {
    return Response.json({ error: r.error }, { status: r.status ?? 400, headers: SIN_CACHE });
  }
  const { ok: _ok, ...resto } = r;
  void _ok;
  return Response.json(resto, { headers: SIN_CACHE });
}

export const error = (mensaje: string, status: number) =>
  Response.json({ error: mensaje }, { status, headers: SIN_CACHE });

/** Lee el cuerpo JSON; si viene mal formado, devuelve un objeto vacío (la validación lo rechaza). */
export async function cuerpo<T extends Record<string, unknown>>(req: Request): Promise<Partial<T>> {
  try {
    const v = await req.json();
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

export const tokenDe = (req: Request) => {
  const h = req.headers.get("authorization") ?? "";
  return h.startsWith("Bearer ") ? h.slice(7).trim() : null;
};

/** El usuario de la petición, o la respuesta de error que corresponde (401 / 403). */
export async function autenticar(
  req: Request,
  minimo: Rol = "operario",
): Promise<{ usuario: Usuario } | { respuesta: Response }> {
  const usuario = await usuarioPorToken(tokenDe(req));
  if (!usuario) return { respuesta: error("Sesión no válida.", 401) };
  if (NIVEL_ROL[usuario.rol] < NIVEL_ROL[minimo]) return { respuesta: error("Sin permiso.", 403) };
  return { usuario };
}
