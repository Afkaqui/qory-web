import { autenticar, responder } from "@/lib/servidor/http";
import { verReferencias } from "@/lib/servidor/tablero";

export async function GET(req: Request) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  return responder(await verReferencias());
}
