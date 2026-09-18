import { Caja, Marco } from "@/components/intranet/marco";
import { PROCESOS } from "@/lib/intranet-demo";

const FLUJOS = ["Por pedido", "Por stock"] as const;

export default function Page() {
  const maxOrdenes = Math.max(...PROCESOS.map((p) => p.ordenes), 1);

  return (
    <Marco
      titulo="Procesos"
      bajada="El mapa de procesos de la empresa, vivo. Cada etapa muestra cuántas órdenes tiene encima y cuántos días lleva en promedio, para ver dónde se acumula el trabajo."
    >
      <div className="grid gap-3.5">
        {FLUJOS.map((flujo) => {
          const etapas = PROCESOS.filter((p) => p.flujo === flujo);
          return (
            <Caja
              key={flujo}
              titulo={`${flujo} · ${flujo === "Por pedido" ? "maquila y marca privada" : "Daya y Activen"}`}
            >
              <ol className="grid gap-2">
                {etapas.map((e, i) => (
                  <li
                    key={e.etapa}
                    className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[28px_minmax(0,1.1fr)_minmax(0,1fr)_86px]"
                  >
                    <span className="font-mono text-[11px] text-acero-claro">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] font-medium text-verde">{e.etapa}</span>
                    <span className="col-span-2 sm:col-span-1">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 flex-1 rounded-full bg-nube">
                          <span
                            className="block h-2.5 rounded-full bg-verde"
                            style={{ width: `${(e.ordenes / maxOrdenes) * 100}%` }}
                          />
                        </span>
                        <span className="w-16 shrink-0 font-mono text-[11.5px] text-acero tabular-nums">
                          {e.ordenes} órd.
                        </span>
                      </span>
                    </span>
                    <span className="col-span-2 font-mono text-[11.5px] text-acero-claro tabular-nums sm:col-span-1 sm:text-right">
                      {e.dias} d prom.
                    </span>
                  </li>
                ))}
              </ol>
            </Caja>
          );
        })}

        <div className="aviso">
          <span className="aviso-tag">Cómo se lee</span>
          La barra es la <strong>cantidad de órdenes detenidas</strong> en esa etapa; el número
          de la derecha, los <strong>días promedio</strong> que llevan ahí. Una etapa con pocas
          órdenes pero muchos días es un cuello de botella distinto al de una etapa con muchas
          órdenes y pocos días: la primera es lentitud, la segunda es acumulación.
        </div>
      </div>
    </Marco>
  );
}
