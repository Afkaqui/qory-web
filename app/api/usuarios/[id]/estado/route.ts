import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { cambiarEstado } from "@/lib/servidor/servicio";

export async function POST(req: Request, ctx: RouteContext<"/api/usuarios/[id]/estado">) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  const { id } = await ctx.params;
  const { activo } = await cuerpo<{ activo: boolean }>(req);
  return responder(await cambiarEstado(a.usuario, id, activo === true));
}
