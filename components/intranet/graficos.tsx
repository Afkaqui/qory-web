import type { ReactNode } from "react";

/**
 * Piezas visuales del tablero. SVG y HTML renderizados en el servidor, sin librerías:
 * no hay nada que hidratar y se leen bien impresos. Cada gráfico lleva una descripción
 * para lectores de pantalla y, en los puntos, un <title> que da el tooltip nativo.
 * Una sola escala por gráfico, las barras parten de cero y el color de alerta se
 * reserva para lo que está fuera de lo esperado.
 */

const MONO = "var(--font-mono)";
const TENUE = "var(--color-acero-claro)";
const REJILLA = "var(--color-linea)";

export const COLOR = {
  ok: "#3cab35",
  malo: "#8c382b",
  neutro: "#b9ba9f",
  serie: "#666745",
  serieFuerte: "#3f4029",
  luz: "#e0de00",
};

/* ------------------------------------------------------------ contenedores */

export function Tarjeta({
  titulo,
  children,
  className = "",
}: {
  titulo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[10px] border border-linea bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] ${className}`}>
      <h2 className="mb-3 text-center text-[14.5px] font-bold tracking-[-0.005em] text-verde">{titulo}</h2>
      {children}
    </section>
  );
}

export function Cifra({
  etiqueta,
  valor,
  pie,
  tono = "normal",
}: {
  etiqueta: string;
  valor: string;
  pie?: string;
  tono?: "normal" | "alerta" | "ok";
}) {
  const color = tono === "alerta" ? "text-[#8c382b]" : tono === "ok" ? "text-[#2d7f28]" : "text-verde";
  return (
    <div className="flex flex-col items-center rounded-[10px] border border-linea bg-white px-3 py-4 text-center">
      <div className="text-[13px] leading-tight font-bold text-verde">{etiqueta}</div>
      <div className={`mt-2.5 text-[34px] leading-none font-bold tracking-[-0.02em] tabular-nums ${color}`}>{valor}</div>
      {pie && <div className="mt-2 text-[11.5px] text-acero-claro">{pie}</div>}
    </div>
  );
}

export const SinDatos = ({ texto = "Aún sin datos para mostrar." }: { texto?: string }) => (
  <p className="grid min-h-[150px] place-items-center px-4 text-center text-[13px] text-acero-claro">{texto}</p>
);

/* -------------------------------------------------------------------- dona */

export function Dona({
  partes,
  descripcion,
  centro,
}: {
  partes: { etiqueta: string; valor: number; color: string }[];
  descripcion: string;
  centro?: { valor: string; texto: string };
}) {
  const total = partes.reduce((s, p) => s + p.valor, 0);
  if (total === 0) return <SinDatos />;
  const R = 62;
  const C = 2 * Math.PI * R;
  let acumulado = 0;
  return (
    <div>
      <svg viewBox="0 0 200 170" className="mx-auto h-auto w-full max-w-[250px]" role="img" aria-label={descripcion}>
        <g transform="translate(100 85) rotate(-90)">
          {partes
            .filter((p) => p.valor > 0)
            .map((p) => {
              const largo = (p.valor / total) * C;
              const el = (
                <circle
                  key={p.etiqueta}
                  r={R}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="26"
                  strokeDasharray={`${largo} ${C - largo}`}
                  strokeDashoffset={-acumulado}
                >
                  <title>{`${p.etiqueta}: ${p.valor} (${Math.round((p.valor / total) * 100)} %)`}</title>
                </circle>
              );
              acumulado += largo;
              return el;
            })}
        </g>
        {centro && (
          <>
            <text x="100" y="86" textAnchor="middle" fontSize="26" fontWeight="700" fill="var(--color-verde)">
              {centro.valor}
            </text>
            <text x="100" y="103" textAnchor="middle" fontSize="9.5" fontFamily={MONO} fill={TENUE}>
              {centro.texto}
            </text>
          </>
        )}
      </svg>
      <ul className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-acero">
        {partes.map((p) => (
          <li key={p.etiqueta} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
            {p.etiqueta} · <strong className="tabular-nums">{p.valor}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------ barras horizontales */

export function BarrasH({
  filas,
}: {
  filas: { etiqueta: string; valor: number; texto: string; color?: string }[];
}) {
  if (filas.length === 0) return <SinDatos />;
  const tope = Math.max(...filas.map((f) => f.valor), 0.0001);
  return (
    <ul className="grid gap-2.5">
      {filas.map((f) => (
        <li key={f.etiqueta} className="grid grid-cols-[minmax(84px,34%)_1fr_auto] items-center gap-2.5 text-[12px]">
          <span className="truncate text-right text-[11px] tracking-[0.04em] text-acero uppercase">{f.etiqueta}</span>
          <span className="h-3.5 rounded-[2px] bg-nube" aria-hidden="true">
            <span
              className="block h-3.5 rounded-[2px]"
              style={{ width: `${Math.max(2, (f.valor / tope) * 100)}%`, background: f.color ?? COLOR.ok }}
            />
          </span>
          <span className="font-mono text-[11.5px] text-acero tabular-nums">{f.texto}</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------- barras verticales */

export function BarrasV({
  datos,
  formato,
  descripcion,
  meta,
}: {
  datos: { etiqueta: string; valor: number }[];
  formato: (n: number) => string;
  descripcion: string;
  /** Línea de referencia opcional (la meta del indicador). */
  meta?: { valor: number; texto: string } | null;
}) {
  if (datos.length === 0) return <SinDatos />;
  const W = 360;
  const H = 190;
  const l = 34;
  const r = 10;
  const t = 22;
  const b = 28;
  const alto = H - t - b;
  const max = Math.max(...datos.map((d) => d.valor), meta?.valor ?? 0) * 1.12 || 1;
  const ranura = (W - l - r) / datos.length;
  const ancho = Math.min(34, ranura - 10);
  const base = t + alto;
  const y = (v: number) => base - (v / max) * alto;
  const marcas = [0, 0.5, 1].map((f) => f * max);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={descripcion}>
      {marcas.map((m) => (
        <g key={m}>
          <line x1={l} x2={W - r} y1={y(m)} y2={y(m)} stroke={REJILLA} strokeDasharray={m === 0 ? undefined : "2 3"} />
          <text x={l - 5} y={y(m) + 3.5} textAnchor="end" fontSize="9" fontFamily={MONO} fill={TENUE}>
            {formato(m)}
          </text>
        </g>
      ))}
      {datos.map((d, i) => {
        const x = l + ranura * i + (ranura - ancho) / 2;
        const ultimo = i === datos.length - 1;
        return (
          <g key={d.etiqueta}>
            <rect x={x} y={y(d.valor)} width={ancho} height={Math.max(1, base - y(d.valor))} rx="2" fill={ultimo ? COLOR.serieFuerte : COLOR.serie}>
              <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
            </rect>
            <text x={x + ancho / 2} y={y(d.valor) - 5} textAnchor="middle" fontSize="9.5" fontFamily={MONO} fill="var(--color-acero)" fontWeight={ultimo ? 700 : 400}>
              {formato(d.valor)}
            </text>
            <text x={x + ancho / 2} y={H - 9} textAnchor="middle" fontSize="9.5" fontFamily={MONO} fill={TENUE}>
              {d.etiqueta}
            </text>
          </g>
        );
      })}
      {meta && (
        <g>
          <line x1={l} x2={W - r} y1={y(meta.valor)} y2={y(meta.valor)} stroke={COLOR.malo} strokeWidth="1.2" strokeDasharray="5 4" />
          <text x={W - r} y={y(meta.valor) - 4} textAnchor="end" fontSize="9.5" fontFamily={MONO} fill={COLOR.malo}>
            {meta.texto}
          </text>
        </g>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------- línea */

export function Linea({
  datos,
  formato,
  umbral,
  descripcion,
}: {
  datos: { etiqueta: string; valor: number }[];
  formato: (n: number) => string;
  umbral?: { valor: number; texto: string } | null;
  descripcion: string;
}) {
  if (datos.length < 2) return <SinDatos texto="Completa las 13 semanas para ver la proyección." />;
  const W = 360;
  const H = 190;
  const l = 44;
  const r = 12;
  const t = 18;
  const b = 28;
  const ph = H - t - b;
  const pw = W - l - r;
  const todos = datos.map((d) => d.valor).concat(0, umbral?.valor ?? 0);
  const min = Math.min(...todos);
  const max = Math.max(...todos);
  const rango = max - min || 1;
  const x = (i: number) => l + (pw * i) / (datos.length - 1);
  const y = (v: number) => t + ph - ((v - min) / rango) * ph;
  const trazo = datos.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.valor).toFixed(1)}`).join(" ");
  const idxMin = datos.reduce((m, d, i) => (d.valor < datos[m].valor ? i : m), 0);
  const marcas = [min, min + rango / 2, max];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={descripcion}>
      {marcas.map((m) => (
        <g key={m}>
          <line x1={l} x2={W - r} y1={y(m)} y2={y(m)} stroke={REJILLA} strokeDasharray="2 3" />
          <text x={l - 5} y={y(m) + 3.5} textAnchor="end" fontSize="9" fontFamily={MONO} fill={TENUE}>
            {formato(m)}
          </text>
        </g>
      ))}
      {min < 0 && <line x1={l} x2={W - r} y1={y(0)} y2={y(0)} stroke={TENUE} />}
      {umbral && (
        <g>
          <line x1={l} x2={W - r} y1={y(umbral.valor)} y2={y(umbral.valor)} stroke={COLOR.malo} strokeWidth="1.2" strokeDasharray="5 4" />
          <text x={W - r} y={y(umbral.valor) - 4} textAnchor="end" fontSize="9.5" fontFamily={MONO} fill={COLOR.malo}>
            {umbral.texto}
          </text>
        </g>
      )}
      <path d={trazo} fill="none" stroke={COLOR.serie} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {datos.map((d, i) => (
        <g key={d.etiqueta + i}>
          <circle cx={x(i)} cy={y(d.valor)} r={i === idxMin ? 4.6 : 2.6} fill={i === idxMin ? COLOR.malo : COLOR.serie} stroke="#fff" strokeWidth="1.5">
            <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
          </circle>
          {(i === 0 || i === datos.length - 1 || i % 3 === 0) && (
            <text x={x(i)} y={H - 9} textAnchor="middle" fontSize="9" fontFamily={MONO} fill={TENUE}>
              {d.etiqueta}
            </text>
          )}
        </g>
      ))}
      <text x={x(idxMin)} y={y(datos[idxMin].valor) + (idxMin === 0 ? 16 : -9)} textAnchor="middle" fontSize="9.5" fontFamily={MONO} fontWeight="700" fill={COLOR.malo}>
        mín. {formato(datos[idxMin].valor)}
      </text>
    </svg>
  );
}
