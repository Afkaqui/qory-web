import type { ReactNode } from "react";

/**
 * Gráficos de la intranet.
 *
 * SVG y HTML renderizados en el servidor, sin librerías: no hay nada que
 * hidratar, pesan lo mismo que el texto que los acompaña y se leen bien
 * impresos. Cada gráfico tiene:
 *   - etiquetas directas sobre lo importante, no un número en cada marca;
 *   - un `<title>` por punto, que da el tooltip nativo del navegador;
 *   - una descripción accesible y, aparte, una vista en tabla.
 *
 * Reglas de lectura: una sola escala por gráfico (nunca dos ejes), las barras
 * parten siempre de cero y el color de estado se reserva para lo que de verdad
 * está fuera de lo esperado.
 */

const TINTA = "var(--color-acero)";
const TENUE = "var(--color-acero-claro)";
const REJILLA = "var(--color-linea)";
const SERIE = "var(--color-verde)";
const SERIE_FUERTE = "var(--color-verde-hondo)";
const ALERTA = "#8c382b";
const FONDO = "#ffffff";
const MONO = "var(--font-mono)";

type Punto = { etiqueta: string; valor: number };

/* ------------------------------------------------------ barras verticales */

/** Una serie por mes. El último mes va más oscuro: es el que se está leyendo. */
export function BarrasVerticales({
  datos,
  formato,
  descripcion,
  anchoMaximo,
}: {
  datos: Punto[];
  formato: (n: number) => string;
  descripcion: string;
  /** Tope en píxeles: en pantallas anchas un gráfico chico no debe estirarse. */
  anchoMaximo?: number;
}) {
  const W = 360;
  const H = 178;
  const l = 8;
  const r = 8;
  const t = 24;
  const b = 28;
  const alto = H - t - b;
  const max = Math.max(...datos.map((d) => d.valor));
  const ranura = (W - l - r) / datos.length;
  const ancho = Math.min(38, ranura - 14);
  const base = t + alto;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: anchoMaximo }}
      className="h-auto max-w-full"
      role="img"
      aria-label={descripcion}
    >
      <line x1={l} x2={W - r} y1={base} y2={base} stroke={TENUE} strokeWidth="1" />
      {datos.map((d, i) => {
        const h = (d.valor / max) * alto;
        const x = l + ranura * i + (ranura - ancho) / 2;
        const y = base - h;
        const rad = 3;
        const ultimo = i === datos.length - 1;
        // Esquinas redondeadas solo en el extremo del dato; la base queda recta.
        const forma = `M${x},${base} V${y + rad} a${rad},${rad} 0 0 1 ${rad},-${rad} h${ancho - rad * 2} a${rad},${rad} 0 0 1 ${rad},${rad} V${base} Z`;
        return (
          <g key={d.etiqueta}>
            <path d={forma} fill={ultimo ? SERIE_FUERTE : SERIE}>
              <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
            </path>
            <text
              x={x + ancho / 2}
              y={y - 7}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="10.5"
              fontWeight={ultimo ? 600 : 400}
              fill={ultimo ? "var(--color-tinta)" : TINTA}
            >
              {formato(d.valor)}
            </text>
            <text x={x + ancho / 2} y={H - 9} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={TENUE}>
              {d.etiqueta}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ----------------------------------------------------------- línea / serie */

type Umbral = { valor: number; etiqueta: string; detalle: string };

export function LineaSerie({
  datos,
  yMin,
  yMax,
  ticks,
  formatoEje,
  formatoValor,
  umbral,
  marcarBajoUmbral = false,
  etiquetarMinimo = false,
  etiquetarUltimo = false,
  area = false,
  ancho = 640,
  alto = 236,
  margenDerecho = 100,
  anchoMinimo = 0,
  anchoMaximo,
  descripcion,
}: {
  datos: Punto[];
  yMin: number;
  yMax: number;
  ticks: number[];
  formatoEje: (n: number) => string;
  formatoValor: (n: number) => string;
  umbral?: Umbral;
  marcarBajoUmbral?: boolean;
  etiquetarMinimo?: boolean;
  etiquetarUltimo?: boolean;
  area?: boolean;
  ancho?: number;
  alto?: number;
  margenDerecho?: number;
  anchoMinimo?: number;
  anchoMaximo?: number;
  descripcion: string;
}) {
  const W = ancho;
  const H = alto;
  const l = 54;
  const r = margenDerecho;
  const t = 18;
  const b = 34;
  const pw = W - l - r;
  const ph = H - t - b;
  const x = (i: number) => l + (datos.length === 1 ? pw / 2 : (pw * i) / (datos.length - 1));
  const y = (v: number) => t + ph - ((v - yMin) / (yMax - yMin)) * ph;
  const base = t + ph;

  const trazo = datos.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.valor).toFixed(1)}`).join(" ");
  const relleno = `${trazo} L${x(datos.length - 1).toFixed(1)},${base} L${x(0).toFixed(1)},${base} Z`;

  const idxMin = datos.reduce((m, d, i) => (d.valor < datos[m].valor ? i : m), 0);
  const ultimo = datos.length - 1;

  return (
    <div className="overflow-x-auto" style={{ maxWidth: anchoMaximo }}>
      <div style={{ minWidth: anchoMinimo || undefined }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="h-auto max-w-full" role="img" aria-label={descripcion}>
          {/* rejilla recesiva y eje vertical */}
          {ticks.map((tk) => (
            <g key={tk}>
              <line x1={l} x2={W - r} y1={y(tk)} y2={y(tk)} stroke={REJILLA} strokeWidth="1" />
              <text x={l - 8} y={y(tk) + 3.5} textAnchor="end" fontFamily={MONO} fontSize="10.5" fill={TENUE}>
                {formatoEje(tk)}
              </text>
            </g>
          ))}
          <line x1={l} x2={W - r} y1={base} y2={base} stroke={TENUE} strokeWidth="1" />

          {/* umbral: línea de meta o de mínimo */}
          {umbral && (
            <g>
              <line
                x1={l}
                x2={W - r + 8}
                y1={y(umbral.valor)}
                y2={y(umbral.valor)}
                stroke={ALERTA}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <text x={W - r + 14} y={y(umbral.valor) - 2} fontFamily={MONO} fontSize="10.5" fontWeight="500" fill={ALERTA}>
                {umbral.etiqueta}
              </text>
              <text x={W - r + 14} y={y(umbral.valor) + 11} fontFamily={MONO} fontSize="10.5" fill={ALERTA}>
                {umbral.detalle}
              </text>
            </g>
          )}

          {area && <path d={relleno} fill={SERIE} opacity="0.08" />}
          <path d={trazo} fill="none" stroke={SERIE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {datos.map((d, i) => {
            const bajo = marcarBajoUmbral && umbral !== undefined && d.valor < umbral.valor;
            return (
              <g key={d.etiqueta}>
                {/* anillo del color de fondo: separa el punto de la línea que lo cruza */}
                <circle cx={x(i)} cy={y(d.valor)} r={bajo ? 5.4 : 4.4} fill={FONDO} />
                <circle cx={x(i)} cy={y(d.valor)} r={bajo ? 3.8 : 2.8} fill={bajo ? ALERTA : SERIE}>
                  <title>{`${d.etiqueta}: ${formatoValor(d.valor)}${bajo ? " · bajo el mínimo" : ""}`}</title>
                </circle>
                <text x={x(i)} y={H - 12} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={TENUE}>
                  {d.etiqueta}
                </text>
              </g>
            );
          })}

          {etiquetarMinimo && (
            <text
              x={x(idxMin)}
              y={y(datos[idxMin].valor) + 20}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="10.5"
              fontWeight="600"
              fill={ALERTA}
            >
              {`Mínimo ${formatoValor(datos[idxMin].valor)}`}
            </text>
          )}
          {etiquetarUltimo && (
            <text
              x={x(ultimo) + 10}
              y={y(datos[ultimo].valor) + 4}
              fontFamily={MONO}
              fontSize="11"
              fontWeight="600"
              fill="var(--color-tinta)"
            >
              {formatoValor(datos[ultimo].valor)}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- barras horizontales */

/** Pasos de un solo tono, de claro a oscuro: sirven para magnitud ordenada. */
export const ESCALA_OLIVO = ["#b9ba9f", "#8f9070", "#666745", "#3f4029"];

export function BarrasHorizontales({
  filas,
  formato,
  colores,
  max,
}: {
  filas: { etiqueta: string; valor: number; nota?: string }[];
  formato: (n: number) => string;
  colores?: string[];
  max?: number;
}) {
  const tope = max ?? Math.max(...filas.map((f) => f.valor));
  return (
    <ul className="grid gap-3.5">
      {filas.map((f, i) => (
        <li key={f.etiqueta}>
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="font-medium text-verde">{f.etiqueta}</span>
            <span className="font-mono text-[12px] text-acero tabular-nums">{formato(f.valor)}</span>
          </div>
          <div className="mt-1.5 h-2.5 rounded-full bg-nube" aria-hidden="true">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${Math.max(2, (f.valor / tope) * 100)}%`,
                background: colores ? colores[i % colores.length] : SERIE,
              }}
            />
          </div>
          {f.nota && <div className="mt-1 text-[11.5px] text-acero-claro">{f.nota}</div>}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------- vista en tabla */

/** Los mismos datos del gráfico, en texto. Para lector de pantalla y para copiar. */
export function TablaDatos({
  columnas,
  filas,
}: {
  columnas: string[];
  filas: ReactNode[][];
}) {
  return (
    <details className="mt-3.5 border-t border-linea pt-2.5">
      <summary className="cursor-pointer font-mono text-[10px] tracking-[0.1em] text-hoja-txt uppercase">
        Ver datos en tabla
      </summary>
      <div className="tabla mt-2.5">
        <table className="min-w-0 text-[12.5px]">
          <thead>
            <tr>
              {columnas.map((c, i) => (
                <th key={c} scope="col" className={i === 0 ? "" : "text-right"}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i}>
                {fila.map((celda, j) => (
                  <td key={j} className={j === 0 ? "whitespace-nowrap" : "text-right font-mono tabular-nums"}>
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
