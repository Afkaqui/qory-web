import { Caja, Chip, Marco, Tile } from "@/components/intranet/marco";
import { ALERTAS, ESTADO, LIBERADOS, LOTES, POR_LINEA } from "@/lib/intranet-demo";

const ALTO = 118;

/** Porcentaje con coma decimal, como se escribe en español. */
const pct = (razon: number) =>
  (razon * 100).toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Page() {
  const maxUnidades = Math.max(...POR_LINEA.map((l) => l.unidades));

  return (
    <Marco
      titulo="Tablero"
      bajada="Semana 38 · del 14 al 20 de setiembre. Cinco preguntas: si cumplimos, si producimos bien, quién hace qué, si ganamos y dónde estamos expuestos."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile etiqueta="Avance del programa" valor="86 %" pie="18 de 21 lotes" />
        <Tile etiqueta="Conformes a la primera" valor="94 %" pie="1 reanálisis" />
        <Tile etiqueta="Rendimiento medio" valor="97,2 %" pie="merma 1,8 %" />
        <Tile etiqueta="Tareas vencidas" valor="3" pie="2 en Calidad, 1 en Almacén" tono="alerta" />
      </div>

      <div className="mt-3.5 grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Caja titulo="Lotes liberados por semana · últimas 8">
          <svg
            viewBox="0 0 460 170"
            width="100%"
            className="h-auto max-w-full"
            role="img"
            aria-label={`Lotes liberados por semana: ${LIBERADOS.map((l) => `${l.semana} ${l.n}`).join(", ")}.`}
          >
            <g stroke="var(--color-linea)" strokeWidth="1">
              <line x1="34" y1="16" x2="452" y2="16" />
              <line x1="34" y1="58" x2="452" y2="58" />
              <line x1="34" y1="100" x2="452" y2="100" />
            </g>
            <line x1="34" y1="142" x2="452" y2="142" stroke="var(--color-acero-claro)" strokeWidth="1" />
            <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-acero-claro)" textAnchor="end">
              <text x="28" y="19">20</text>
              <text x="28" y="61">14</text>
              <text x="28" y="103">7</text>
              <text x="28" y="145">0</text>
            </g>
            {LIBERADOS.map((l, i) => {
              const h = (l.n / 20) * ALTO;
              const x = 44 + i * 52;
              const y = 142 - h;
              const ultimo = i === LIBERADOS.length - 1;
              return (
                <g key={l.semana}>
                  <rect
                    x={x}
                    y={y}
                    width="34"
                    height={h}
                    rx="4"
                    fill={ultimo ? "var(--color-verde-hondo)" : "var(--color-verde)"}
                  />
                  <text
                    x={x + 17}
                    y={y - 6}
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    fill={ultimo ? "var(--color-tinta)" : "var(--color-acero)"}
                    textAnchor="middle"
                  >
                    {l.n}
                  </text>
                  <text
                    x={x + 17}
                    y="158"
                    fontFamily="var(--font-mono)"
                    fontSize="8.5"
                    fill="var(--color-acero-claro)"
                    textAnchor="middle"
                  >
                    {l.semana}
                  </text>
                </g>
              );
            })}
          </svg>
        </Caja>

        <Caja titulo="Requiere atención">
          <ul className="grid gap-2.5">
            {ALERTAS.map((a) => (
              <li key={a.texto} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-acero">
                <span className="shrink-0 pt-px">
                  <Chip tono={a.tono}>{a.etiqueta}</Chip>
                </span>
                <span>{a.texto}</span>
              </li>
            ))}
          </ul>
        </Caja>
      </div>

      <div className="mt-3.5 grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Caja titulo="Lotes en curso">
          <div className="tabla border-0">
            <table className="min-w-[540px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Lote</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Línea</th>
                  <th scope="col">Rendimiento</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {LOTES.slice(0, 6).map((l) => (
                  <tr key={l.codigo}>
                    <td className="font-mono whitespace-nowrap">{l.codigo}</td>
                    <td>{l.producto}</td>
                    <td>{l.linea}</td>
                    <td className="font-mono tabular-nums">
                      {l.obtenida ? `${pct(l.obtenida / l.teorica)} %` : "—"}
                    </td>
                    <td>
                      <Chip tono={ESTADO[l.estado].tono}>{ESTADO[l.estado].texto}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Caja>

        <Caja titulo="Producción por línea · unidades">
          <ul className="grid gap-3">
            {POR_LINEA.map((l) => (
              <li key={l.linea}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="font-medium text-verde">{l.linea}</span>
                  <span className="font-mono text-[12px] text-acero tabular-nums">
                    {l.unidades.toLocaleString("es-PE")}
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-nube">
                  <div
                    className="h-2 rounded-full bg-verde"
                    style={{ width: `${(l.unidades / maxUnidades) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-[11.5px] text-acero-claro">{l.lotes} lotes</div>
              </li>
            ))}
          </ul>
        </Caja>
      </div>
    </Marco>
  );
}
