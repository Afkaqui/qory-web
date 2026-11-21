import { cuerpo, responder } from "@/lib/servidor/http";
import { ingresar } from "@/lib/servidor/servicio";

export async function POST(req: Request) {
  const { email, clave } = await cuerpo<{ email: string; clave: string }>(req);
  return responder(await ingresar(String(email ?? ""), String(clave ?? "")));
}
