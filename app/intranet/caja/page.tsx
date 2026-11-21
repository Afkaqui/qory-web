import { api } from "@/lib/api";
import { Marco, Tile } from "@/components/intranet/marco";
import { SelectorPeriodo } from "@/components/intranet/selector-periodo";
import { FilaCajaSemana } from "@/components/intranet/tablero-forms";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import { fechaCorta, periodoValido, soles, type FilaCaja } from "@/lib/intranet/tablero";

export default async function Page({ searchParams }: PageProps<"/intranet/caja">) {
  await exigir("jefe");
  const periodo = periodoValido((await searchParams).periodo as string | undefined);
  const token = await tokenActual();
  const [caja, tab] = await Promise.all([
    api<{ corte: string | null; filas: FilaCaja[] }>(`/api/caja?periodo=${periodo}`, { token }),
    api<{ periodos: string[] }>(`/api/tablero?periodo=${periodo}`, { token }),
  ]);

  if (!caja.ok) {
    return (
      <Marco titulo="Caja a 13 semanas">
        <p role="alert" className="text-[#8c382b]">{caja.error}</p>
      </Marco>
    );
  }
  const { corte, filas } = caja.datos;
  const completa = filas.every((f) => f.cajaFinal !== null);
  const minimo = completa ? Math.min(...filas.map((f) => f.cajaFinal as number)) : null;

  return (
    <Marco
      titulo="Proyección de caja a 13 semanas"
      bajada="Usa saldos y movimientos de caja en soles. Para un escenario adverso, modifica cobros o pagos y compara el saldo mínimo."
    >
      <div className="mb-4">
        <SelectorPeriodo periodo={periodo} periodos={tab.ok ? tab.datos.periodos : []} />
      </div>

      {!corte && (
        <div className="aviso mb-4">
          <span className="aviso-tag">Falta el corte</span>
          Administración debe fijar la fecha de corte en el Tablero para ver las fechas de cada semana.
        </div>
      )}

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile etiqueta="Corte" valor={fechaCorta(corte)} pie="la semana 1 empieza al día siguiente" />
        <Tile etiqueta="Caja mínima" valor={minimo === null ? "—" : soles(minimo)} pie={completa ? "menor saldo final semanal" : "completa las 13 semanas"} tono={minimo !== null && minimo < 0 ? "alerta" : "normal"} />
        <Tile etiqueta="Semanas completas" valor={`${filas.filter((f) => f.cajaFinal !== null).length} de 13`} pie="con caja inicial, cobros y pagos" />
      </div>

      <div className="grid gap-2.5">
        {filas.map((f) => (
          <FilaCajaSemana key={`${periodo}-${f.semana}-${f.cajaInicial}`} fila={f} periodo={periodo} />
        ))}
      </div>
    </Marco>
  );
}
