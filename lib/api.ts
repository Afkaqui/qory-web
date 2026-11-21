import "server-only";

/**
 * Cliente del backend (api.qorylab.pe). Se llama solo desde el servidor de la web:
 * el navegador nunca habla con la API ni ve el token de sesión en JavaScript.
 */

export type RespuestaApi<T> = { ok: true; datos: T } | { ok: false; status: number; error: string };

export async function api<T = Record<string, unknown>>(
  ruta: string,
  opciones: { metodo?: "GET" | "POST"; token?: string | null; cuerpo?: unknown } = {},
): Promise<RespuestaApi<T>> {
  const base = process.env.API_URL;
  if (!base) return { ok: false, status: 500, error: "Falta configurar API_URL." };

  try {
    const r = await fetch(`${base}${ruta}`, {
      method: opciones.metodo ?? "GET",
      headers: {
        ...(opciones.cuerpo !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(opciones.token ? { Authorization: `Bearer ${opciones.token}` } : {}),
      },
      body: opciones.cuerpo !== undefined ? JSON.stringify(opciones.cuerpo) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const json = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, status: r.status, error: json.error ?? "No se pudo completar la operación." };
    return { ok: true, datos: json as T };
  } catch {
    return { ok: false, status: 503, error: "El servidor no responde. Inténtalo de nuevo en un momento." };
  }
}
