import { cuerpo, responder } from "@/lib/servidor/http";
import { activar } from "@/lib/servidor/servicio";

export async function POST(req: Request) {
  const { token, clave, repetida } = await cuerpo<{ token: string; clave: string; repetida: string }>(req);
  return responder(await activar(String(token ?? ""), String(clave ?? ""), String(repetida ?? "")));
}
