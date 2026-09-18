/**
 * Datos de ejemplo de la maqueta de intranet.
 *
 * MAQUETA VISUAL: no hay base de datos ni sesión. Todo lo que se ve aquí son
 * constantes en este archivo, pensadas para mostrar cómo se vería el sistema
 * funcionando. Ninguna pantalla guarda nada.
 */

export type RolDemo = "operario" | "jefe" | "encargado";

export const ROLES: { id: RolDemo; nombre: string; quien: string }[] = [
  { id: "operario", nombre: "Operario", quien: "Registra su trabajo" },
  { id: "jefe", nombre: "Jefe de área", quien: "Valida y ve su área" },
  { id: "encargado", nombre: "Encargado", quien: "Control total" },
];

export const NAV: {
  href: string;
  texto: string;
  desde: RolDemo;
  grupo: "Captura" | "Gestión" | "Dirección";
}[] = [
  { href: "/intranet/panel", texto: "Tablero", desde: "operario", grupo: "Gestión" },
  { href: "/intranet/produccion", texto: "Producción", desde: "operario", grupo: "Captura" },
  { href: "/intranet/calidad", texto: "Calidad", desde: "operario", grupo: "Captura" },
  { href: "/intranet/tareas", texto: "Tareas", desde: "operario", grupo: "Captura" },
  { href: "/intranet/procesos", texto: "Procesos", desde: "jefe", grupo: "Gestión" },
  { href: "/intranet/personas", texto: "Personas", desde: "jefe", grupo: "Gestión" },
  { href: "/intranet/usuarios", texto: "Usuarios", desde: "encargado", grupo: "Dirección" },
  { href: "/intranet/auditoria", texto: "Auditoría", desde: "encargado", grupo: "Dirección" },
];

export const NIVEL: Record<RolDemo, number> = { operario: 1, jefe: 2, encargado: 3 };

/* ------------------------------------------------------------------ lotes */

export type EstadoLote =
  | "programado"
  | "fabricacion"
  | "envasado"
  | "acondicionado"
  | "analisis"
  | "liberado"
  | "rechazado";

export const ESTADO: Record<EstadoLote, { texto: string; tono: Tono }> = {
  programado: { texto: "Programado", tono: "neutro" },
  fabricacion: { texto: "Fabricación", tono: "curso" },
  envasado: { texto: "Envasado", tono: "curso" },
  acondicionado: { texto: "Acondicionado", tono: "curso" },
  analisis: { texto: "En análisis", tono: "alerta" },
  liberado: { texto: "Liberado", tono: "ok" },
  rechazado: { texto: "Rechazado", tono: "malo" },
};

export type Tono = "ok" | "curso" | "alerta" | "malo" | "neutro";

export const LOTES: {
  codigo: string;
  producto: string;
  linea: string;
  teorica: number;
  obtenida: number | null;
  estado: EstadoLote;
  etapa: string;
}[] = [
  { codigo: "2026-09-045", producto: "Gel crema antiedad 50 g", linea: "Activen", teorica: 1500, obtenida: null, estado: "programado", etapa: "—" },
  { codigo: "2026-09-044", producto: "Sérum ácido hialurónico 30 mL", linea: "Daya", teorica: 900, obtenida: 872, estado: "fabricacion", etapa: "Fabricación" },
  { codigo: "2026-09-043", producto: "Crema corporal · marca cliente", linea: "Maquila", teorica: 2500, obtenida: 2445, estado: "analisis", etapa: "Calidad" },
  { codigo: "2026-09-042", producto: "Gel de baño 430 mL", linea: "Daya", teorica: 3000, obtenida: 2892, estado: "envasado", etapa: "Envasado" },
  { codigo: "2026-09-041", producto: "Gel crema antiedad 50 g", linea: "Activen", teorica: 1500, obtenida: 1472, estado: "liberado", etapa: "Cerrado" },
  { codigo: "2026-09-040", producto: "Gel de baño 430 mL", linea: "Daya", teorica: 3000, obtenida: 2946, estado: "liberado", etapa: "Cerrado" },
  { codigo: "2026-09-039", producto: "Jabón exfoliante 150 g", linea: "Activen", teorica: 1200, obtenida: 1094, estado: "rechazado", etapa: "Reanálisis" },
];

export const PARTES = [
  { fecha: "17/09 · 14:20", lote: "2026-09-044", etapa: "Fabricación", obtenida: 872, merma: 12, minutos: 185, operario: "R. Quispe" },
  { fecha: "17/09 · 11:05", lote: "2026-09-042", etapa: "Envasado", obtenida: 2892, merma: 41, minutos: 240, operario: "J. Huayta" },
  { fecha: "16/09 · 16:40", lote: "2026-09-043", etapa: "Acondicionado", obtenida: 2445, merma: 55, minutos: 310, operario: "B. Bautista" },
  { fecha: "16/09 · 09:15", lote: "2026-09-042", etapa: "Fabricación", obtenida: 2940, merma: 18, minutos: 205, operario: "R. Quispe" },
  { fecha: "15/09 · 15:50", lote: "2026-09-041", etapa: "Acondicionado", obtenida: 1472, merma: 21, minutos: 160, operario: "B. Bautista" },
];

export const ANALISIS: {
  fecha: string;
  lote: string;
  ph: number;
  viscosidad: number;
  micro: string;
  resultado: "conforme" | "reanalisis" | "rechazado";
  analista: string;
}[] = [
  { fecha: "17/09 · 10:30", lote: "2026-09-043", ph: 5.4, viscosidad: 18200, micro: "En incubación", resultado: "reanalisis", analista: "S. Paredes" },
  { fecha: "16/09 · 08:50", lote: "2026-09-041", ph: 5.6, viscosidad: 17800, micro: "Conforme", resultado: "conforme", analista: "S. Paredes" },
  { fecha: "14/09 · 12:10", lote: "2026-09-040", ph: 6.1, viscosidad: 9400, micro: "Conforme", resultado: "conforme", analista: "T. Mellado" },
  { fecha: "12/09 · 17:05", lote: "2026-09-039", ph: 4.2, viscosidad: 15100, micro: "Fuera de límite", resultado: "rechazado", analista: "S. Paredes" },
];

export const TAREAS: {
  titulo: string;
  origen: string;
  asignado: string;
  vence: string;
  estado: "abierta" | "cerrada";
  vencida: boolean;
}[] = [
  { titulo: "Cerrar desviación DES-2026-014", origen: "Desviación", asignado: "S. Paredes", vence: "05/09", estado: "abierta", vencida: true },
  { titulo: "Reponer stock de sacha inchi", origen: "Almacén", asignado: "R. Estrella", vence: "15/09", estado: "abierta", vencida: true },
  { titulo: "Renovar capacitación BPM · turno tarde", origen: "Capacitación", asignado: "K. De La Cruz", vence: "16/09", estado: "abierta", vencida: true },
  { titulo: "Presentar expediente Daya SPF", origen: "Regulatorio", asignado: "M. Ávalos", vence: "24/09", estado: "abierta", vencida: false },
  { titulo: "Mantenimiento de marmita 2", origen: "Mantenimiento", asignado: "J. Flores", vence: "30/09", estado: "abierta", vencida: false },
  { titulo: "Calibrar balanza de dispensación", origen: "Calidad", asignado: "T. Mellado", vence: "10/09", estado: "cerrada", vencida: false },
];

export const PROCESOS: { etapa: string; flujo: "Por pedido" | "Por stock"; ordenes: number; dias: number }[] = [
  { etapa: "Gestión comercial", flujo: "Por pedido", ordenes: 4, dias: 2 },
  { etapa: "Desarrollo y formulación", flujo: "Por pedido", ordenes: 2, dias: 11 },
  { etapa: "Gestión regulatoria", flujo: "Por pedido", ordenes: 3, dias: 24 },
  { etapa: "Planificación", flujo: "Por pedido", ordenes: 1, dias: 3 },
  { etapa: "Abastecimiento", flujo: "Por pedido", ordenes: 2, dias: 9 },
  { etapa: "Producción", flujo: "Por pedido", ordenes: 3, dias: 4 },
  { etapa: "Control de calidad", flujo: "Por pedido", ordenes: 1, dias: 2 },
  { etapa: "Despacho", flujo: "Por pedido", ordenes: 0, dias: 1 },
  { etapa: "Planeamiento de demanda", flujo: "Por stock", ordenes: 2, dias: 5 },
  { etapa: "Producción para stock", flujo: "Por stock", ordenes: 2, dias: 4 },
  { etapa: "Almacenamiento", flujo: "Por stock", ordenes: 5, dias: 2 },
  { etapa: "Distribución", flujo: "Por stock", ordenes: 3, dias: 1 },
];

export const PERSONAS: {
  nombre: string;
  puesto: string;
  area: string;
  turno: string;
  presente: boolean;
  capacitacion: "vigente" | "por-vencer" | "vencida";
}[] = [
  { nombre: "R. Quispe", puesto: "Operario de fabricación", area: "Producción", turno: "Mañana", presente: true, capacitacion: "vigente" },
  { nombre: "J. Huayta", puesto: "Operario de envasado", area: "Producción", turno: "Mañana", presente: true, capacitacion: "por-vencer" },
  { nombre: "B. Bautista", puesto: "Operario de acondicionado", area: "Producción", turno: "Tarde", presente: true, capacitacion: "vigente" },
  { nombre: "S. Paredes", puesto: "Analista de control de calidad", area: "Calidad", turno: "Mañana", presente: true, capacitacion: "vigente" },
  { nombre: "T. Mellado", puesto: "Analista de control de calidad", area: "Calidad", turno: "Tarde", presente: false, capacitacion: "por-vencer" },
  { nombre: "R. Estrella", puesto: "Auxiliar de almacén", area: "Almacén", turno: "Mañana", presente: true, capacitacion: "vencida" },
  { nombre: "M. Ávalos", puesto: "Asuntos regulatorios", area: "Calidad", turno: "Mañana", presente: true, capacitacion: "vigente" },
  { nombre: "J. Flores", puesto: "Mantenimiento", area: "Servicios", turno: "Mañana", presente: true, capacitacion: "vigente" },
];

export const USUARIOS: { codigo: string; nombre: string; rol: string; area: string; activo: boolean }[] = [
  { codigo: "GG01", nombre: "Gerencia General", rol: "Encargado", area: "Gerencia", activo: true },
  { codigo: "GA01", nombre: "Gerencia Administrativa", rol: "Encargado", area: "Administración", activo: true },
  { codigo: "DT01", nombre: "Dirección Técnica", rol: "Jefe de área", area: "Calidad", activo: true },
  { codigo: "JP01", nombre: "Jefatura de Producción", rol: "Jefe de área", area: "Producción", activo: true },
  { codigo: "OP01", nombre: "R. Quispe", rol: "Operario", area: "Producción", activo: true },
  { codigo: "OP02", nombre: "B. Bautista", rol: "Operario", area: "Producción", activo: true },
  { codigo: "CC01", nombre: "S. Paredes", rol: "Operario", area: "Calidad", activo: true },
  { codigo: "AL03", nombre: "Auxiliar retirado", rol: "Operario", area: "Almacén", activo: false },
];

export const AUDITORIA = [
  { fecha: "17/09 · 14:20", usuario: "OP01 · R. Quispe", accion: "Registró parte", entidad: "Lote 2026-09-044", detalle: "Fabricación · 872 obtenidas · merma 12" },
  { fecha: "17/09 · 10:31", usuario: "CC01 · S. Paredes", accion: "Registró análisis", entidad: "Lote 2026-09-043", detalle: "Resultado: reanálisis" },
  { fecha: "17/09 · 08:02", usuario: "GG01 · Gerencia General", accion: "Ingreso", entidad: "Sesión", detalle: "—" },
  { fecha: "16/09 · 16:44", usuario: "OP02 · B. Bautista", accion: "Corrigió parte", entidad: "Lote 2026-09-043", detalle: "Merma 48 → 55 · motivo: recuento de descarte" },
  { fecha: "16/09 · 08:51", usuario: "DT01 · Dirección Técnica", accion: "Liberó lote", entidad: "Lote 2026-09-041", detalle: "Análisis conforme" },
  { fecha: "15/09 · 09:10", usuario: "GA01 · Gerencia Administrativa", accion: "Creó usuario", entidad: "CC01", detalle: "S. Paredes · Operario · Calidad" },
];

/** Lotes liberados por semana, para la tendencia del tablero. */
export const LIBERADOS = [
  { semana: "S31", n: 12 },
  { semana: "S32", n: 15 },
  { semana: "S33", n: 11 },
  { semana: "S34", n: 17 },
  { semana: "S35", n: 14 },
  { semana: "S36", n: 19 },
  { semana: "S37", n: 16 },
  { semana: "S38", n: 18 },
];

export const POR_LINEA = [
  { linea: "Daya", lotes: 9, unidades: 24800 },
  { linea: "Activen", lotes: 6, unidades: 9100 },
  { linea: "Maquila", lotes: 5, unidades: 12400 },
  { linea: "Servicios", lotes: 2, unidades: 3200 },
];

export const ALERTAS: { tono: Tono; etiqueta: string; texto: string }[] = [
  { tono: "malo", etiqueta: "Vence", texto: "Registro sanitario de 2 productos Daya vence en 46 días." },
  { tono: "alerta", etiqueta: "Stock", texto: "Sacha inchi: cobertura de 9 días, bajo el mínimo de 15." },
  { tono: "alerta", etiqueta: "Abierta", texto: "Desviación DES-2026-014 sin cierre desde hace 17 días." },
  { tono: "alerta", etiqueta: "Personas", texto: "3 colaboradores con capacitación de buenas prácticas por vencer." },
  { tono: "alerta", etiqueta: "Vence", texto: "Materia prima por S/ 8 420 vence en menos de 60 días." },
  { tono: "ok", etiqueta: "Al día", texto: "Trámites Digemid: 4 en curso, ninguno fuera de plazo." },
];
