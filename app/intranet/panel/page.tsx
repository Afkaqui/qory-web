import { api } from "@/lib/api";
import { FormCorte } from "@/components/intranet/tablero-forms";
import { Caja, Chip, Marco, Tile } from "@/components/intranet/marco";
import { SelectorPeriodo } from "@/components/intranet/selector-periodo";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import { NIVEL_ROL } from "@/lib/auth/roles";
import type { Tono } from "@/lib/intranet-demo";
import { fechaCorta, formatear, nombrePeriodo, periodoValido, type Indicador } from "@/lib/intranet/tablero";

const TONO: Record<Indicador["estado"], Tono> = {
  "En meta": "ok",
  "Fuera de meta": "malo",
  "Sin dato": "neutro",
  "Sin meta": "neutro",
};

export default async function Page({ searchParams }: PageProps<"/intranet/panel">) {
  const u = await exigir("jefe");
  const periodo = periodoValido((await searchParams).periodo as string | undefined);
  const r = await api<{
    corte: string | null;
    periodos: string[];
    indicadores: Indicador[];
    resumen: { fueraDeMeta: number; sinDatoOMeta: number; enMeta: number; accionesVencidas: number | null };
  }>(`/api/tablero?periodo=${periodo}`, { token: await tokenActual() });

  if (!r.ok) {
    return (
      <Marco titulo="Tablero">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const { indicadores, resumen, corte, periodos } = r.datos;
  const frentes = [...new Set(indicadores.map((i) => i.frente))];

  return (
    <Marco
      titulo="Control gerencial"
      bajada="Cierre mensual y revisión semanal de caja y excepciones. Cada indicador se calcula con lo que se captura en el mes."
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <SelectorPeriodo periodo={periodo} periodos={periodos} />
        {NIVEL_ROL[u.rol] >= NIVEL_ROL.administrador && <FormCorte periodo={periodo} corte={corte} />}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Tile etiqueta="Mes" valor={nombrePeriodo(periodo)} pie={`Corte: ${fechaCorta(corte)}`} />
        <Tile etiqueta="Fuera de meta" valor={String(resumen.fueraDeMeta)} pie="indicadores" tono={resumen.fueraDeMeta ? "alerta" : "normal"} />
        <Tile etiqueta="En meta" valor={String(resumen.enMeta)} pie="indicadores" />
        <Tile etiqueta="Sin dato o meta" valor={String(resumen.sinDatoOMeta)} pie="por completar" />
        <Tile
          etiqueta="Acciones vencidas"
          valor={resumen.accionesVencidas === null ? "—" : String(resumen.accionesVencidas)}
          pie={resumen.accionesVencidas === null ? "Falta fijar el corte" : "al corte"}
          tono={resumen.accionesVencidas ? "alerta" : "normal"}
        />
      </div>

      {frentes.map((frente) => (
        <Caja key={frente} titulo={frente} className="mt-3.5" nivel={2}>
          <div className="tabla border-0">
            <table className="min-w-[760px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Indicador</th>
                  <th scope="col" className="text-right">Resultado</th>
                  <th scope="col" className="text-right">Meta</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Decisión que informa</th>
                  <th scope="col">Responsable</th>
                </tr>
              </thead>
              <tbody>
                {indicadores
                  .filter((i) => i.frente === frente)
                  .map((i) => (
                    <tr key={i.codigo}>
                      <td className="font-mono whitespace-nowrap">{i.codigo}</td>
                      <td className="font-medium">{i.nombre}</td>
                      <td className="text-right font-mono whitespace-nowrap tabular-nums">{formatear(i.resultado, i.formato)}</td>
                      <td className="text-right font-mono whitespace-nowrap tabular-nums text-acero-claro">
                        {i.meta === null ? "—" : `${i.sentido === "menor" ? "≤ " : "≥ "}${formatear(i.meta, i.formato)}`}
                      </td>
                      <td>
                        <Chip tono={TONO[i.estado]}>{i.estado}</Chip>
                      </td>
                      <td className="text-acero">{i.decision}</td>
                      <td className="whitespace-nowrap text-acero">{i.responsable}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Caja>
      ))}
    </Marco>
  );
}
