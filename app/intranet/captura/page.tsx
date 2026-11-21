import { api } from "@/lib/api";
import { Marco } from "@/components/intranet/marco";
import { SelectorPeriodo } from "@/components/intranet/selector-periodo";
import { FilaCaptura } from "@/components/intranet/tablero-forms";
import { NIVEL_ROL } from "@/lib/auth/roles";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import { periodoValido, type Indicador } from "@/lib/intranet/tablero";

export default async function Page({ searchParams }: PageProps<"/intranet/captura">) {
  const u = await exigir("jefe");
  const periodo = periodoValido((await searchParams).periodo as string | undefined);
  const r = await api<{ periodos: string[]; indicadores: Indicador[] }>(`/api/tablero?periodo=${periodo}`, {
    token: await tokenActual(),
  });

  if (!r.ok) {
    return (
      <Marco titulo="Captura mensual">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const puedeMeta = NIVEL_ROL[u.rol] >= NIVEL_ROL.administrador;

  return (
    <Marco
      titulo="Captura mensual de indicadores"
      bajada="Las celdas ámbar son las que se editan. Registra 0 únicamente si la fuente confirma cero; si no hay dato, deja el campo vacío."
    >
      <div className="mb-4">
        <SelectorPeriodo periodo={periodo} periodos={r.datos.periodos} />
      </div>
      <div className="grid gap-2.5">
        {r.datos.indicadores.map((i) => (
          <FilaCaptura key={`${periodo}-${i.codigo}`} ind={i} periodo={periodo} puedeMeta={puedeMeta} />
        ))}
      </div>
      {!puedeMeta && (
        <p className="mt-4 text-[12.5px] text-acero-claro">Las metas las fija administración.</p>
      )}
    </Marco>
  );
}
