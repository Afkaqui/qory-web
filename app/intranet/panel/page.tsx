import { exigir } from "@/lib/auth/sesion";
import { KpiGerencia } from "@/components/intranet/kpi";
import { Marco } from "@/components/intranet/marco";
import {
  CAJA_MINIMA,
  CARTERA_META,
  DEFINICIONES,
  INVENTARIO_META,
  OTIF_META,
  caja,
  cajaEstado,
  cartera,
  carteraEstado,
  inventario,
  inventarioEstado,
  otif,
  otifEstado,
  pct,
  soles,
  ventas,
  ventasEstado,
} from "@/lib/intranet-gerencia";

const dec1 = (razon: number) =>
  (razon * 100).toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const signo = (v: number) => `${v >= 0 ? "+" : "−"}${pct(Math.abs(v))}`;

export default async function Page() {
  await exigir("administrador");

  return (
    <Marco
      titulo="Tablero"
      bajada="Los cinco indicadores de gerencia. Las cifras son de ejemplo hasta conectar los datos reales."
    >
          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <KpiGerencia
              etiqueta="Ventas netas facturadas"
              valor={soles(ventas.neto)}
              estado={ventasEstado()}
              pie={`${signo(ventas.variacion)} frente a setiembre · ${ventas.mes}`}
              {...DEFINICIONES.ventas}
            />
            <KpiGerencia
              etiqueta="Entregas completas a tiempo"
              valor={`${dec1(otif.valor)} %`}
              estado={otifEstado()}
              pie={`${otif.ok} de ${otif.pedidos} pedidos · meta ${pct(OTIF_META, 0)}`}
              {...DEFINICIONES.otif}
            />
            <KpiGerencia
              etiqueta="Inventario sin movimiento > 90 días"
              valor={soles(inventario.quieto)}
              estado={inventarioEstado()}
              pie={`${pct(inventario.proporcion)} del inventario · meta hasta ${pct(INVENTARIO_META, 0)}`}
              {...DEFINICIONES.inventario}
            />
            <KpiGerencia
              etiqueta="Caja mínima a 13 semanas"
              valor={soles(caja.minimo)}
              estado={cajaEstado()}
              pie={`${caja.semanasBajoMinimo} semana${caja.semanasBajoMinimo === 1 ? "" : "s"} bajo ${soles(CAJA_MINIMA)} · punto más bajo el ${caja.semanaMinimo}`}
              {...DEFINICIONES.caja}
            />
            <KpiGerencia
              etiqueta="Cartera vencida"
              valor={soles(cartera.vencida)}
              estado={carteraEstado()}
              pie={`${pct(cartera.proporcion)} de ${soles(cartera.total)} por cobrar · meta hasta ${pct(CARTERA_META, 0)}`}
              {...DEFINICIONES.cartera}
            />
          </div>

    </Marco>
  );
}
