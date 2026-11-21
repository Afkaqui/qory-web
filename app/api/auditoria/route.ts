import { autenticar, responder } from "@/lib/servidor/http";
import { listarAuditoria } from "@/lib/servidor/servicio";

export async function GET(req: Request) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  return responder(await listarAuditoria());
}
