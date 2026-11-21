import { api } from "@/lib/api";
import { Caja, Chip, Marco } from "@/components/intranet/marco";
import { SelectorPeriodo } from "@/components/intranet/selector-periodo";
import { FormAccion } from "@/components/intranet/tablero-forms";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import type { Tono } from "@/lib/intranet-demo";
import { fechaCorta, periodoValido, type Accion } from "@/lib/intranet/tablero";

const TONO: Record<Accion["seguimiento"], Tono> = {
  Cerrada: "ok",
  "En seguimiento": "curso",
  Vencida: "malo",
  "Falta evidencia": "alerta",
  Incompleta: "alerta",
};

export default async function Page({ searchParams }: PageProps<"/intranet/acciones">) {
  await exigir("jefe");
  const periodo = periodoValido((await searchParams).periodo as string | undefined);
  const r = await api<{ corte: string | null; acciones: Accion[] }>(`/api/acciones?periodo=${periodo}`, {
    token: await tokenActual(),
  });

  if (!r.ok) {
    return (
      <Marco titulo="Acciones">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const { acciones, corte } = r.datos;

  return (
    <Marco
      titulo="Registro de excepciones y decisiones"
      bajada="Usa el código del indicador o del lote afectado. El vencimiento se evalúa a la fecha de corte del mes elegido."
    >
      <div className="mb-4">
        <SelectorPeriodo periodo={periodo} periodos={[]} />
        <p className="mt-1 text-[12.5px] text-acero-claro">Corte: {fechaCorta(corte)}</p>
      </div>

      <Caja titulo="Nueva acción" className="mb-3.5">
        <FormAccion />
      </Caja>

      <div className="grid gap-3">
        {acciones.length === 0 && <p className="text-[13.5px] text-acero-claro">Aún no hay acciones registradas.</p>}
        {acciones.map((a) => (
          <Caja key={`${a.id}-${a.estado}-${a.evidencia}`} titulo={`${a.codigo} · #${a.id}`} nivel={3}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Chip tono={TONO[a.seguimiento]}>{a.seguimiento}</Chip>
              <span className="text-[12.5px] text-acero-claro">Límite: {fechaCorta(a.fechaLimite)}</span>
            </div>
            <FormAccion accion={a} />
          </Caja>
        ))}
      </div>
    </Marco>
  );
}
