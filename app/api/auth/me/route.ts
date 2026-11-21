import { autenticar, responder } from "@/lib/servidor/http";

export async function GET(req: Request) {
  const a = await autenticar(req);
  if ("respuesta" in a) return a.respuesta;
  return responder({ ok: true, usuario: a.usuario });
}
