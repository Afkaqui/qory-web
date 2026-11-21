import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { guardarCaja, verCaja } from "@/lib/servidor/tablero";

export async function GET(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  return responder(await verCaja(new URL(req.url).searchParams.get("periodo") ?? ""));
}

export async function POST(req: Request) {
  const a = await autenticar(req, "jefe");
  if ("respuesta" in a) return a.respuesta;
  const d = await cuerpo<{ periodo: string; semana: number; cajaInicial: unknown; cobros: unknown; pagos: unknown; evidencia: string }>(req);
  return responder(
    await guardarCaja(a.usuario, {
      periodo: String(d.periodo ?? ""),
      semana: Number(d.semana),
      cajaInicial: d.cajaInicial,
      cobros: d.cobros,
      pagos: d.pagos,
      evidencia: String(d.evidencia ?? ""),
    }),
  );
}
