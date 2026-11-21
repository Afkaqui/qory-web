import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { capturar } from "@/lib/servidor/tablero";

export async function POST(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  const d = await cuerpo<{ periodo: string; codigo: string; valor: unknown; denominador: unknown; meta: unknown; referencia: string }>(req);
  return responder(
    await capturar(a.usuario, {
      periodo: String(d.periodo ?? ""),
      codigo: String(d.codigo ?? ""),
      valor: d.valor,
      denominador: d.denominador,
      meta: d.meta,
      referencia: String(d.referencia ?? ""),
    }),
  );
}
