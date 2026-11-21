import { autenticar, cuerpo, error, responder } from "@/lib/servidor/http";
import { actualizarAccion } from "@/lib/servidor/tablero";

export async function POST(req: Request, ctx: RouteContext<"/api/acciones/[id]">) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id)) return error("Identificador no válido.", 400);
  return responder(await actualizarAccion(a.usuario, id, await cuerpo(req)));
}
