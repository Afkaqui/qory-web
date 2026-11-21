/** Tipos y formato compartidos por las pantallas del tablero. */

export type Formato = "entero" | "pct" | "soles";

export type Indicador = {
  codigo: string;
  frente: string;
  nombre: string;
  numDesc: string | null;
  denDesc: string | null;
  tipo: "valor" | "razon";
  formato: Formato;
  sentido: "menor" | "mayor";
  fuente: string | null;
  decision: string | null;
  responsable: string | null;
  valor: number | null;
  denominador: number | null;
  meta: number | null;
  referencia: string | null;
  resultado: number | null;
  estado: "Sin dato" | "Sin meta" | "En meta" | "Fuera de meta";
};

export type FilaCaja = {
  semana: number;
  inicio: string | null;
  cajaInicial: number | null;
  cobros: number | null;
  pagos: number | null;
  cajaFinal: number | null;
  evidencia: string | null;
};

export type Accion = {
  id: number;
  codigo: string;
  brecha: string;
  accion: string | null;
  responsable: string | null;
  fechaLimite: string | null;
  estado: string;
  evidencia: string | null;
  seguimiento: "Cerrada" | "Vencida" | "Falta evidencia" | "Incompleta" | "En seguimiento";
};

const n = (v: number, dec: number) =>
  v.toLocaleString("es-PE", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** El espacio de «S/ » es duro (U+00A0): la cifra no se separa de su símbolo. */
export function formatear(v: number | null, formato: Formato): string {
  if (v === null) return "—";
  if (formato === "pct") return `${n(v * 100, 1)} %`;
  if (formato === "soles") return `S/ ${n(v, 2)}`;
  return n(v, 0);
}

export const soles = (v: number | null) => formatear(v, "soles");

/** Cómo se muestra una meta en el campo de captura (porcentajes como 95, no 0,95). */
export function metaParaCampo(v: number | null, formato: Formato): string {
  if (v === null) return "";
  return formato === "pct" ? String(Math.round(v * 10000) / 100) : String(v);
}

export function periodoActual(): string {
  const f = new Date().toLocaleDateString("en-CA", { timeZone: "America/Lima" }); // AAAA-MM-DD
  return f.slice(0, 7);
}

export const periodoValido = (p: string | undefined): string =>
  p && /^\d{4}-(0[1-9]|1[0-2])$/.test(p) ? p : periodoActual();

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
export const nombrePeriodo = (p: string) => `${MESES[Number(p.slice(5)) - 1]} ${p.slice(0, 4)}`;

export const fechaCorta = (iso: string | null) =>
  iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "—";
