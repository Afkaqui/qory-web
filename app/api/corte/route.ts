import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { fijarCorte } from "@/lib/servidor/tablero";

export async function POST(req: Request) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  const d = await cuerpo<{ periodo: string; corte: string }>(req);
  return responder(await fijarCorte(a.usuario, String(d.periodo ?? ""), String(d.corte ?? "")));
}
