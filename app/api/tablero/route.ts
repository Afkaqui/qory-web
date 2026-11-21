import { autenticar, responder } from "@/lib/servidor/http";
import { verTablero } from "@/lib/servidor/tablero";

export async function GET(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  const periodo = new URL(req.url).searchParams.get("periodo") ?? "";
  return responder(await verTablero(periodo));
}
