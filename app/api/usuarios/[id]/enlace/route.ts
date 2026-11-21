import { autenticar, responder } from "@/lib/servidor/http";
import { nuevoEnlace } from "@/lib/servidor/servicio";

export async function POST(req: Request, ctx: RouteContext<"/api/usuarios/[id]/enlace">) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  const { id } = await ctx.params;
  return responder(await nuevoEnlace(a.usuario, id));
}
