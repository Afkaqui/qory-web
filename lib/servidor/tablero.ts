import "server-only";
import { pool } from "@/lib/db";
import { auditar } from "@/lib/auth/auditoria";
import { NIVEL_ROL } from "@/lib/auth/roles";
import type { Usuario } from "@/lib/servidor/servicio";

/**
 * Tablero de control gerencial: indicadores, captura mensual, caja a 13 semanas y
 * registro de acciones. Reproduce la lógica del libro de Excel entregado por Qory:
 * el resultado, la meta y el estado se calculan aquí y la interfaz solo los muestra.
 */

const falla = (error: string, status = 400) => ({ ok: false as const, error, status });

const PERIODO = /^\d{4}-(0[1-9]|1[0-2])$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const esJefe = (u: Usuario) => NIVEL_ROL[u.rol] >= NIVEL_ROL.jefe;
const esAdmin = (u: Usuario) => NIVEL_ROL[u.rol] >= NIVEL_ROL.administrador;

export const primerDia = (periodo: string) => `${periodo}-01`;

/** Acepta «1 234,56», «1234.56» o vacío (= sin dato). Devuelve undefined si no es un número. */
function numero(v: unknown): number | null | undefined {
  if (v === null || v === undefined) return null;
  const s = String(v).trim().replace(/\s/g, "").replace("%", "");
  if (s === "") return null;
  const n = Number(s.includes(",") && !s.includes(".") ? s.replace(",", ".") : s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

/* ------------------------------------------------------------------- caja */

type FilaCaja = {
  semana: number;
  inicio: string | null;
  cajaInicial: number | null;
  cobros: number | null;
  pagos: number | null;
  cajaFinal: number | null;
  evidencia: string | null;
};

const sumarDias = (iso: string, dias: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
};

async function cargarCaja(periodo: string, corte: string | null): Promise<FilaCaja[]> {
  const { rows } = await pool.query(
    "SELECT semana, caja_inicial, cobros, pagos, evidencia FROM caja_semanas WHERE periodo = $1 ORDER BY semana",
    [primerDia(periodo)],
  );
  const porSemana = new Map(rows.map((r) => [r.semana as number, r]));
  const filas: FilaCaja[] = [];
  let previa: number | null = null;
  for (let s = 1; s <= 13; s++) {
    const r = porSemana.get(s);
    // La caja inicial de la semana 1 se captura; las siguientes arrastran la final anterior.
    const inicial: number | null = s === 1 ? num(r?.caja_inicial) : previa;
    const cobros = num(r?.cobros);
    const pagos = num(r?.pagos);
    const final: number | null =
      inicial !== null && cobros !== null && pagos !== null ? inicial + cobros - pagos : null;
    filas.push({
      semana: s,
      inicio: corte ? sumarDias(corte, 1 + 7 * (s - 1)) : null,
      cajaInicial: inicial,
      cobros,
      pagos,
      cajaFinal: final,
      evidencia: r?.evidencia ?? null,
    });
    previa = final;
  }
  return filas;
}

export async function verCaja(periodo: string) {
  if (!PERIODO.test(periodo)) return falla("Periodo no válido.");
  const corte = await corteDe(periodo);
  return { ok: true as const, periodo, corte, filas: await cargarCaja(periodo, corte) };
}

export async function guardarCaja(
  actor: Usuario,
  d: { periodo: string; semana: number; cajaInicial?: unknown; cobros: unknown; pagos: unknown; evidencia?: string },
) {
  if (!esJefe(actor)) return falla("Sin permiso.", 403);
  if (!PERIODO.test(d.periodo)) return falla("Periodo no válido.");
  if (!Number.isInteger(d.semana) || d.semana < 1 || d.semana > 13) return falla("Semana no válida.");
  const inicial = d.semana === 1 ? numero(d.cajaInicial) : null;
  const cobros = numero(d.cobros);
  const pagos = numero(d.pagos);
  if (inicial === undefined || cobros === undefined || pagos === undefined) return falla("Escribe solo números.");
  if ((cobros ?? 0) < 0 || (pagos ?? 0) < 0) return falla("Cobros y pagos se registran como montos positivos.");
  await pool.query(
    `INSERT INTO caja_semanas (periodo, semana, caja_inicial, cobros, pagos, evidencia, usuario_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (periodo, semana) DO UPDATE SET caja_inicial=$3, cobros=$4, pagos=$5, evidencia=$6, usuario_id=$7, actualizado_en=now()`,
    [primerDia(d.periodo), d.semana, inicial, cobros, pagos, (d.evidencia ?? "").trim() || null, actor.id],
  );
  await auditar(actor, "caja_actualizada", `${d.periodo} semana ${d.semana}`, `cobros ${cobros ?? "—"} · pagos ${pagos ?? "—"}`);
  return { ok: true as const };
}

/* ------------------------------------------------------------------ cortes */

async function corteDe(periodo: string): Promise<string | null> {
  const { rows } = await pool.query("SELECT to_char(corte,'YYYY-MM-DD') AS corte FROM cortes WHERE periodo = $1", [primerDia(periodo)]);
  return rows[0]?.corte ?? null;
}

export async function fijarCorte(actor: Usuario, periodo: string, corte: string) {
  if (!esAdmin(actor)) return falla("Solo administración fija el corte.", 403);
  if (!PERIODO.test(periodo) || !FECHA.test(corte) || Number.isNaN(Date.parse(corte))) return falla("Fecha no válida.");
  await pool.query(
    "INSERT INTO cortes (periodo, corte) VALUES ($1,$2) ON CONFLICT (periodo) DO UPDATE SET corte = $2",
    [primerDia(periodo), corte],
  );
  await auditar(actor, "corte_fijado", periodo, corte);
  return { ok: true as const };
}

/* ---------------------------------------------------------------- tablero */

type Fila = {
  codigo: string;
  frente: string;
  nombre: string;
  numDesc: string | null;
  denDesc: string | null;
  tipo: "valor" | "razon";
  formato: "entero" | "pct" | "soles";
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

function estadoDe(f: { resultado: number | null; meta: number | null; sentido: string }): Fila["estado"] {
  if (f.resultado === null) return "Sin dato";
  if (f.meta === null) return "Sin meta";
  const cumple = f.sentido === "menor" ? f.resultado <= f.meta : f.resultado >= f.meta;
  return cumple ? "En meta" : "Fuera de meta";
}

async function filas(periodo: string, cajaMinima: number | null): Promise<Fila[]> {
  const { rows } = await pool.query(
    `SELECT i.*, c.valor, c.denominador, c.meta AS meta_cap, c.referencia
       FROM indicadores i
       LEFT JOIN capturas c ON c.codigo = i.codigo AND c.periodo = $1
      ORDER BY i.orden`,
    [primerDia(periodo)],
  );
  return rows.map((r) => {
    const valor = num(r.valor);
    const den = num(r.denominador);
    let resultado: number | null;
    if (r.codigo === "F03") resultado = cajaMinima; // sale de la hoja de caja, no se digita
    else if (r.tipo === "razon") resultado = valor !== null && den !== null && den > 0 ? valor / den : null;
    else resultado = valor;
    const meta = num(r.meta_cap) ?? num(r.meta_defecto);
    return {
      codigo: r.codigo,
      frente: r.frente,
      nombre: r.nombre,
      numDesc: r.num_desc,
      denDesc: r.den_desc,
      tipo: r.tipo,
      formato: r.formato,
      sentido: r.sentido,
      fuente: r.fuente,
      decision: r.decision,
      responsable: r.responsable,
      valor,
      denominador: den,
      meta,
      referencia: r.referencia,
      resultado,
      estado: estadoDe({ resultado, meta, sentido: r.sentido }),
    };
  });
}

export async function periodos(): Promise<string[]> {
  const { rows } = await pool.query(
    `SELECT DISTINCT to_char(p,'YYYY-MM') AS p FROM (
        SELECT periodo AS p FROM capturas UNION SELECT periodo FROM cortes UNION SELECT periodo FROM caja_semanas
      ) t ORDER BY p DESC`,
  );
  return rows.map((r) => r.p);
}

/** Indicadores que se grafican a lo largo del tiempo, con el mes elegido como último punto. */
const SERIES = ["C01", "P01", "F01", "F02", "F04"];

async function series(hasta: string) {
  const { rows } = await pool.query(
    `SELECT c.codigo, to_char(c.periodo,'YYYY-MM') AS periodo, c.valor, c.denominador, i.tipo
       FROM capturas c JOIN indicadores i ON i.codigo = c.codigo
      WHERE c.codigo = ANY($1) AND c.periodo <= $2 AND c.valor IS NOT NULL
      ORDER BY c.periodo`,
    [SERIES, primerDia(hasta)],
  );
  const salida: Record<string, { periodo: string; valor: number }[]> = Object.fromEntries(SERIES.map((c) => [c, []]));
  for (const r of rows) {
    const v = Number(r.valor);
    const d = num(r.denominador);
    const valor = r.tipo === "razon" ? (d !== null && d > 0 ? v / d : null) : v;
    if (valor !== null) salida[r.codigo].push({ periodo: r.periodo, valor });
  }
  for (const c of SERIES) salida[c] = salida[c].slice(-12);
  return salida;
}

export async function verTablero(periodo: string) {
  if (!PERIODO.test(periodo)) return falla("Periodo no válido.");
  const corte = await corteDe(periodo);
  const caja = await cargarCaja(periodo, corte);
  const completa = caja.every((f) => f.cajaFinal !== null);
  const cajaMinima = completa ? Math.min(...caja.map((f) => f.cajaFinal as number)) : null;
  const indicadores = await filas(periodo, cajaMinima);
  const acciones = await listarAcciones(corte);
  return {
    ok: true as const,
    periodo,
    corte,
    periodos: await periodos(),
    indicadores,
    series: await series(periodo),
    caja: caja.map((f) => ({ semana: f.semana, inicio: f.inicio, cajaFinal: f.cajaFinal })),
    accionesPorEstado: acciones.reduce<Record<string, number>>((m, a) => ({ ...m, [a.seguimiento]: (m[a.seguimiento] ?? 0) + 1 }), {}),
    resumen: {
      fueraDeMeta: indicadores.filter((i) => i.estado === "Fuera de meta").length,
      sinDatoOMeta: indicadores.filter((i) => i.estado === "Sin dato" || i.estado === "Sin meta").length,
      enMeta: indicadores.filter((i) => i.estado === "En meta").length,
      accionesVencidas: corte ? acciones.filter((a) => a.seguimiento === "Vencida").length : null,
    },
  };
}

/* ----------------------------------------------------------------- captura */

export async function capturar(
  actor: Usuario,
  d: { periodo: string; codigo: string; valor: unknown; denominador: unknown; meta: unknown; referencia?: string },
) {
  if (!esJefe(actor)) return falla("Sin permiso.", 403);
  if (!PERIODO.test(d.periodo)) return falla("Periodo no válido.");
  const { rows } = await pool.query("SELECT * FROM indicadores WHERE codigo = $1", [d.codigo]);
  const ind = rows[0];
  if (!ind) return falla("Indicador desconocido.", 404);
  if (d.codigo === "F03") return falla("Este indicador sale de la hoja de caja a 13 semanas.");

  const valor = numero(d.valor);
  const den = ind.tipo === "razon" ? numero(d.denominador) : null;
  let meta = numero(d.meta);
  if (valor === undefined || den === undefined || meta === undefined) return falla("Escribe solo números.");
  if (valor !== null && valor < 0) return falla("El valor no puede ser negativo.");
  if (den !== null && den < 0) return falla("El denominador no puede ser negativo.");
  // En indicadores porcentuales la meta se escribe como 95 o 0,95: se guarda como fracción.
  if (meta !== null && ind.formato === "pct" && meta > 1) meta = meta / 100;

  const previa = await pool.query("SELECT meta FROM capturas WHERE codigo=$1 AND periodo=$2", [d.codigo, primerDia(d.periodo)]);
  const metaActual = num(previa.rows[0]?.meta) ?? num(ind.meta_defecto);
  if (!esAdmin(actor) && meta !== null && meta !== metaActual) return falla("Solo administración cambia las metas.", 403);
  const metaFinal = esAdmin(actor) ? meta : num(previa.rows[0]?.meta);

  await pool.query(
    `INSERT INTO capturas (codigo, periodo, valor, denominador, meta, referencia, usuario_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (codigo, periodo) DO UPDATE SET valor=$3, denominador=$4, meta=$5, referencia=$6, usuario_id=$7, actualizado_en=now()`,
    [d.codigo, primerDia(d.periodo), valor, den, metaFinal, (d.referencia ?? "").trim() || null, actor.id],
  );
  await auditar(
    actor,
    "indicador_capturado",
    `${d.codigo} · ${d.periodo}`,
    `valor ${valor ?? "—"}${ind.tipo === "razon" ? ` / ${den ?? "—"}` : ""}${meta !== null ? ` · meta ${meta}` : ""}`,
  );
  return { ok: true as const };
}

/* ---------------------------------------------------------------- acciones */

type AccionFila = {
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

/** Misma regla que la columna «Seguimiento» del libro de Excel. */
function seguimiento(a: { estado: string; evidencia: string | null; responsable: string | null; fechaLimite: string | null }, corte: string | null): AccionFila["seguimiento"] {
  if (a.estado === "Cerrada" && a.evidencia) return "Cerrada";
  if (a.fechaLimite && corte && a.fechaLimite < corte) return "Vencida";
  if (a.estado === "Cerrada") return "Falta evidencia";
  if (!a.responsable || !a.fechaLimite || !a.estado) return "Incompleta";
  return "En seguimiento";
}

async function listarAcciones(corte: string | null): Promise<AccionFila[]> {
  const { rows } = await pool.query(
    `SELECT id, codigo, brecha, accion, responsable, to_char(fecha_limite,'YYYY-MM-DD') AS fecha_limite, estado, evidencia
       FROM acciones ORDER BY (estado = 'Cerrada'), fecha_limite NULLS LAST, id`,
  );
  return rows.map((r) => {
    const base = { estado: r.estado, evidencia: r.evidencia, responsable: r.responsable, fechaLimite: r.fecha_limite };
    return {
      id: Number(r.id),
      codigo: r.codigo,
      brecha: r.brecha,
      accion: r.accion,
      responsable: r.responsable,
      fechaLimite: r.fecha_limite,
      estado: r.estado,
      evidencia: r.evidencia,
      seguimiento: seguimiento(base, corte),
    };
  });
}

export async function verAcciones(periodo: string) {
  if (!PERIODO.test(periodo)) return falla("Periodo no válido.");
  const corte = await corteDe(periodo);
  return { ok: true as const, corte, acciones: await listarAcciones(corte) };
}

type DatosAccion = { codigo?: string; brecha?: string; accion?: string; responsable?: string; fechaLimite?: string; estado?: string; evidencia?: string };

function limpiarAccion(d: DatosAccion) {
  const t = (v?: string) => (v ?? "").trim();
  const fecha = t(d.fechaLimite);
  if (fecha && (!FECHA.test(fecha) || Number.isNaN(Date.parse(fecha)))) return falla("Fecha límite no válida.");
  const estado = t(d.estado) || "Abierta";
  if (!["Abierta", "En curso", "Cerrada"].includes(estado)) return falla("Estado no válido.");
  return {
    ok: true as const,
    codigo: t(d.codigo).slice(0, 40),
    brecha: t(d.brecha).slice(0, 600),
    accion: t(d.accion).slice(0, 600) || null,
    responsable: t(d.responsable).slice(0, 120) || null,
    fecha: fecha || null,
    estado,
    evidencia: t(d.evidencia).slice(0, 600) || null,
  };
}

export async function crearAccion(actor: Usuario, d: DatosAccion) {
  if (!esJefe(actor)) return falla("Sin permiso.", 403);
  const a = limpiarAccion(d);
  if (!a.ok) return a;
  if (!a.codigo || !a.brecha) return falla("Indica el código del indicador o lote y la brecha o decisión.");
  const { rows } = await pool.query(
    `INSERT INTO acciones (codigo, brecha, accion, responsable, fecha_limite, estado, evidencia, creado_por)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [a.codigo, a.brecha, a.accion, a.responsable, a.fecha, a.estado, a.evidencia, actor.id],
  );
  await auditar(actor, "accion_creada", `${a.codigo} #${rows[0].id}`, a.brecha);
  return { ok: true as const };
}

export async function actualizarAccion(actor: Usuario, id: number, d: DatosAccion) {
  if (!esJefe(actor)) return falla("Sin permiso.", 403);
  const a = limpiarAccion(d);
  if (!a.ok) return a;
  if (!a.codigo || !a.brecha) return falla("Indica el código del indicador o lote y la brecha o decisión.");
  const r = await pool.query(
    `UPDATE acciones SET codigo=$2, brecha=$3, accion=$4, responsable=$5, fecha_limite=$6, estado=$7, evidencia=$8, actualizada_en=now()
      WHERE id=$1`,
    [id, a.codigo, a.brecha, a.accion, a.responsable, a.fecha, a.estado, a.evidencia],
  );
  if (!r.rowCount) return falla("No existe esa acción.", 404);
  await auditar(actor, "accion_actualizada", `${a.codigo} #${id}`, a.estado);
  return { ok: true as const };
}

/* ------------------------------------------------------------- referencias */

export async function verReferencias() {
  const { rows } = await pool.query("SELECT clave, datos FROM contenido");
  const por = Object.fromEntries(rows.map((r) => [r.clave, r.datos]));
  return {
    ok: true as const,
    conectores: por.conectores ?? [],
    modelo: por.modelo ?? [],
    evidencia: por.evidencia ?? [],
    notas: por.notas ?? {},
  };
}
