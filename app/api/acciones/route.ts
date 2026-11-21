import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { crearAccion, verAcciones } from "@/lib/servidor/tablero";

export async function GET(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  return responder(await verAcciones(new URL(req.url).searchParams.get("periodo") ?? ""));
}

export async function POST(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  return responder(await crearAccion(a.usuario, await cuerpo(req)));
}
