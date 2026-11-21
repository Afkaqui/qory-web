/**
 * Indicadores de gerencia de la maqueta de intranet.
 *
 * Son los cinco que definió la empresa: ventas netas facturadas, entregas
 * completas a tiempo, inventario sin movimiento mayor a 90 días, caja mínima a
 * 13 semanas y cartera vencida.
 *
 * MAQUETA: todas las cifras son de ejemplo, inventadas para mostrar cómo se
 * vería el tablero. No corresponden a datos reales de Qory. Los valores
 * derivados (neto, porcentajes, saldo de caja) se CALCULAN a partir de las
 * cifras base, de modo que el tablero nunca se contradice a sí mismo.
 *
 * Los textos «cómo se mide» y «por qué importa» son los que entregó la empresa.
 */

import type { Tono } from "@/lib/intranet-demo";

/* ------------------------------------------------------------------ formato */

/** Convención peruana: coma para miles, punto para decimales. */
const num = (n: number, dec = 0) =>
  n.toLocaleString("es-PE", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** El espacio es duro (U+00A0): la cifra no se separa de su símbolo al cambiar de renglón. */
export const soles = (n: number) => `S/ ${num(Math.round(n))}`;
export const pct = (razon: number, dec = 1) => `${num(razon * 100, dec)} %`;
export const miles = (n: number) => `${num(n / 1000, n >= 100_000 ? 0 : 1)}k`;

export type Estado = { tono: Tono; texto: string };

/**
 * Regla común para los indicadores donde menos es mejor (inventario quieto,
 * cartera vencida): en meta, hasta una vez y media la meta, y más allá.
 * El texto del estado cambia con el tono: el color nunca va solo.
 */
const estadoMenosEsMejor = (valor: number, meta: number): Estado =>
  valor <= meta
    ? { tono: "ok", texto: "En meta" }
    : valor <= meta * 1.5
      ? { tono: "alerta", texto: "Sobre la meta" }
      : { tono: "malo", texto: "Muy sobre la meta" };

/* ================================================================== VENTAS */

/** IGV vigente (16 % + 2 % de IPM). */
export const IGV = 0.18;

export const MESES = ["May", "Jun", "Jul", "Ago", "Set", "Oct"] as const;

/** Facturación del mes, con IGV incluido, y notas de crédito emitidas, con IGV. */
const FACTURADO = [221_800, 236_400, 229_100, 251_700, 243_900, 268_400];
const NOTAS_CREDITO = [9_600, 14_200, 8_300, 15_900, 11_400, 12_800];

/**
 * Descompone un mes. Cada parte se redondea a sol entero ANTES de restar, y el
 * neto sale de esas partes ya redondeadas: así lo que se muestra en el puente
 * (facturado − IGV − notas de crédito) suma exactamente el neto que se declara,
 * sin diferencias de un sol que un lector atento notaría.
 */
function descomponer(facturado: number, notasCredito: number) {
  const igv = Math.round(facturado - facturado / (1 + IGV));
  const notasBase = Math.round(notasCredito / (1 + IGV));
  return { facturado, igv, notasCredito: notasBase, neto: facturado - igv - notasBase };
}

const MESES_VENTAS = FACTURADO.map((f, i) => descomponer(f, NOTAS_CREDITO[i]));
export const ventasNetasSerie = MESES_VENTAS.map((m) => m.neto);

const ult = FACTURADO.length - 1;
export const ventas = {
  mes: "Octubre 2026",
  ...MESES_VENTAS[ult],
  previo: MESES_VENTAS[ult - 1].neto,
  variacion: MESES_VENTAS[ult].neto / MESES_VENTAS[ult - 1].neto - 1,
};

export const ventasEstado = (): Estado =>
  ventas.variacion >= 0
    ? { tono: "ok", texto: "En alza" }
    : { tono: "alerta", texto: "En baja" };

/* ==================================================================== OTIF */

/** Pedidos entregados en el mes y los que salieron completos y en la fecha pactada. */
const PEDIDOS = [64, 71, 69, 74, 72, 78];
const PEDIDOS_OK = [57, 65, 60, 68, 66, 71];

export const otifSerie = PEDIDOS_OK.map((ok, i) => ok / PEDIDOS[i]);

/** Los mismos datos, fila por fila, para la vista en tabla. */
export const otifFilas = MESES.map((mes, i) => ({
  mes,
  pedidos: PEDIDOS[i],
  ok: PEDIDOS_OK[i],
  valor: otifSerie[i],
}));
export const OTIF_META = 0.95;

export const otif = {
  pedidos: PEDIDOS[ult],
  ok: PEDIDOS_OK[ult],
  valor: otifSerie[ult],
  previo: otifSerie[ult - 1],
  /** Causas de los pedidos que no cumplieron. La suma es igual a pedidos − ok. */
  causas: [
    { etiqueta: "Solo tarde", valor: 3 },
    { etiqueta: "Solo incompleto", valor: 3 },
    { etiqueta: "Tarde e incompleto", valor: 1 },
  ],
};

export const otifEstado = (): Estado =>
  otif.valor >= OTIF_META
    ? { tono: "ok", texto: "En meta" }
    : { tono: "alerta", texto: "Bajo la meta" };

/* ============================================================== INVENTARIO */

export const INVENTARIO_META = 0.1;

export const inventarioCategorias = [
  { etiqueta: "Material de empaque", total: 142_900, quieto: 31_800 },
  { etiqueta: "Materia prima", total: 268_400, quieto: 24_600 },
  { etiqueta: "Producto terminado", total: 201_000, quieto: 9_700 },
];

const invTotal = inventarioCategorias.reduce((s, c) => s + c.total, 0);
const invQuieto = inventarioCategorias.reduce((s, c) => s + c.quieto, 0);

export const inventario = {
  total: invTotal,
  quieto: invQuieto,
  proporcion: invQuieto / invTotal,
};

export const inventarioEstado = (): Estado =>
  estadoMenosEsMejor(inventario.proporcion, INVENTARIO_META);

/* ====================================================================== CAJA */

export const CAJA_MINIMA = 60_000;
const CAJA_INICIAL = 142_000;

export const SEMANAS = [
  "23 nov", "30 nov", "7 dic", "14 dic", "21 dic", "28 dic", "4 ene",
  "11 ene", "18 ene", "25 ene", "1 feb", "8 feb", "15 feb",
];

const ENTRADAS = [
  61_400, 66_200, 72_800, 70_100, 62_500, 58_300, 68_900,
  82_400, 86_100, 80_700, 74_200, 82_900, 88_300,
];
const SALIDAS = [
  58_700, 98_500, 66_300, 126_400, 62_100, 64_800, 74_600,
  66_900, 61_300, 90_200, 64_500, 68_400, 88_800,
];

/** Saldo al cierre de cada semana: el anterior más entradas menos salidas. */
export const cajaSaldo = ENTRADAS.reduce<number[]>((acc, e, i) => {
  const previo = i === 0 ? CAJA_INICIAL : acc[i - 1];
  acc.push(previo + e - SALIDAS[i]);
  return acc;
}, []);

export const cajaFilas = SEMANAS.map((semana, i) => ({
  semana,
  entradas: ENTRADAS[i],
  salidas: SALIDAS[i],
  saldo: cajaSaldo[i],
}));

const idxMin = cajaSaldo.indexOf(Math.min(...cajaSaldo));
export const caja = {
  inicial: CAJA_INICIAL,
  minimo: cajaSaldo[idxMin],
  semanaMinimo: SEMANAS[idxMin],
  semanasBajoMinimo: cajaSaldo.filter((s) => s < CAJA_MINIMA).length,
  brecha: Math.max(0, CAJA_MINIMA - cajaSaldo[idxMin]),
  final: cajaSaldo[cajaSaldo.length - 1],
};

export const cajaEstado = (): Estado =>
  caja.semanasBajoMinimo === 0
    ? { tono: "ok", texto: "Sobre el mínimo" }
    : { tono: "malo", texto: "Bajo el mínimo" };

/* ================================================================== CARTERA */

export const CARTERA_META = 0.15;
const CARTERA_TOTAL = 486_000;

export const carteraTramos = [
  { etiqueta: "1 a 30 días", valor: 54_200 },
  { etiqueta: "31 a 60 días", valor: 31_800 },
  { etiqueta: "61 a 90 días", valor: 17_400 },
  { etiqueta: "Más de 90 días", valor: 22_600 },
];

const vencida = carteraTramos.reduce((s, t) => s + t.valor, 0);

export const cartera = {
  total: CARTERA_TOTAL,
  vencida,
  proporcion: vencida / CARTERA_TOTAL,
  /** Clientes anonimizados: el detalle real no se publica en una maqueta. */
  mayores: [
    { cliente: "Cliente A", valor: 38_900, dias: 74 },
    { cliente: "Cliente B", valor: 27_300, dias: 41 },
    { cliente: "Cliente C", valor: 22_600, dias: 112 },
  ],
};

export const carteraEstado = (): Estado => estadoMenosEsMejor(cartera.proporcion, CARTERA_META);

/* ============================================================== DEFINICIONES */

/** Definiciones entregadas por la empresa. Se muestran junto a cada indicador. */
export const DEFINICIONES = {
  ventas: {
    comoSeMide: "Facturación real del mes restando el IGV y las notas de crédito.",
    porQue:
      "Le muestra al gerente el ingreso real de dinero por ventas, sin cifras infladas.",
  },
  otif: {
    comoSeMide:
      "Porcentaje de pedidos que se entregaron a los clientes cumpliendo exactamente con la fecha y el contenido pactado.",
    porQue:
      "Mide la eficiencia operativa y el nivel de cumplimiento y satisfacción del cliente.",
  },
  inventario: {
    comoSeMide:
      "Valor en dinero de la mercadería o materiales que llevan más de 3 meses sin rotar en el almacén.",
    porQue:
      "Sirve para cuidar el capital de trabajo y evitar que el dinero de la empresa se quede estancado en productos que no se venden.",
  },
  caja: {
    comoSeMide:
      "Una proyección semanal del efectivo disponible (entradas menos salidas) cubriendo los próximos 3 meses.",
    porQue:
      "Es la alerta temprana de liquidez para asegurar que la empresa siempre tendrá dinero para pagar sueldos y proveedores sin sorpresas.",
  },
  cartera: {
    comoSeMide:
      "El saldo total de dinero que los clientes nos deben pero que ya pasó de la fecha de pago acordada.",
    porQue:
      "Controla de inmediato el efectivo que está atrapado en la calle y que se necesita recuperar.",
  },
} as const;
