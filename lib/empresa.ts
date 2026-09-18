/**
 * Datos de la empresa. Fuente única para cabecera, pie, contacto y metadatos.
 *
 * PENDIENTE antes de publicar:
 *  - Crear el alias `comercial@qorylab.com` en el dominio (hoy se usa una
 *    cuenta personal y una cuenta de Gmail declarada ante SUNAT).
 *  - Confirmar el horario de atención con Jefatura de Ventas.
 */

export const EMPRESA = {
  razon: "Qory Laboratorios S.A.C.",
  firma: "Qory Lab",
  ruc: "20601831601",
  desde: 2017,
  direccion: "APV. Inca Manco Cápac 2.ª etapa, Calle 4, Mz. F, Lt. 4–5",
  distrito: "San Juan de Lurigancho, Lima, Perú",
  referencia: "Av. Los Claveles, frente a la fábrica Celima",
  correo: "comercial@qorylab.com",
  // El primero es el contacto comercial: es el que se muestra primero en todas partes.
  telefonos: [
    { numero: "945 217 404", rol: "Ventas" },
    { numero: "934 607 692", rol: "Planta" },
    { numero: "983 420 486", rol: "Planta" },
  ],
  horario: ["Lunes a viernes, de 8:00 a 17:30", "Sábados, de 8:00 a 12:30"],
  sitio: "https://qorylab.com",
  redes: {
    linkedin: "https://www.linkedin.com/company/qory-laboratorios-sac/",
    facebook: "https://www.facebook.com/qorylaboratorio/",
    instagram: "https://www.instagram.com/qorylaboratorios/",
  },
} as const;

export const MENU = [
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/maquila", texto: "Maquila 360°" },
  { href: "/capacidades", texto: "Capacidades" },
  { href: "/productos", texto: "Qué fabricamos" },
  { href: "/marcas", texto: "Marcas" },
  { href: "/calidad", texto: "Calidad" },
  { href: "/sostenibilidad", texto: "Sostenibilidad" },
] as const;

/** Flujo real de un pedido de maquila, tomado del mapa de procesos interno. */
export const PASOS = [
  {
    titulo: "Briefing",
    texto:
      "Levantamos tu requerimiento, evaluamos la viabilidad técnica y te entregamos una cotización con tiempos y volúmenes.",
  },
  {
    titulo: "Formulación",
    texto:
      "Nuestra área de I+D desarrolla la fórmula, prepara muestras y las ajusta hasta que las apruebas.",
  },
  {
    titulo: "Regulatorio",
    texto:
      "Armamos el expediente técnico y gestionamos la notificación sanitaria ante Digemid. Sin intermediarios.",
  },
  {
    titulo: "Producción",
    texto:
      "Fabricación por lote con control en proceso, envasado y registro de cada etapa.",
  },
  {
    titulo: "Entrega",
    texto:
      "Acondicionado, liberación del lote por Control de Calidad y despacho del producto listo para vender.",
  },
] as const;

export type Foto = { archivo: string; pie: string };

export const FOTOS: Record<string, Foto> = {
  fabricacion1: {
    archivo: "produccion-area-de-fabricacion-1",
    pie: "Fabricación — reactores y mezcla",
  },
  fabricacion2: {
    archivo: "produccion-area-de-fabricacion-2",
    pie: "Área de fabricación",
  },
  envasado: { archivo: "produccion-area-de-envasado", pie: "Envasado" },
  acondicionado1: {
    archivo: "produccion-area-de-acondicionado-1",
    pie: "Área de acondicionado",
  },
  acondicionado2: {
    archivo: "produccion-area-de-acondicionado-2",
    pie: "Acondicionado y etiquetado",
  },
  fisicoQuimico: {
    archivo: "control-de-calidad-area-fisico-quimico",
    pie: "Control de calidad — físico-químico",
  },
  microbiologia: {
    archivo: "control-de-calidad-microbiologia",
    pie: "Control de calidad — microbiología",
  },
  siembra: {
    archivo: "control-de-calidad-area-de-siembra",
    pie: "Microbiología — área de siembra",
  },
  incubadoras: {
    archivo: "control-de-calidad-area-de-incubadoras",
    pie: "Microbiología — incubadoras",
  },
  agua: {
    archivo: "produccion-area-de-tratamiento-del-agua",
    pie: "Tratamiento y purificación de agua",
  },
  materiaPrima: {
    archivo: "almacen-materia-prima",
    pie: "Almacén de materia prima",
  },
  dispensacion: {
    archivo: "almacen-area-de-dispensacion",
    pie: "Dispensación de insumos",
  },
  esclusa: {
    archivo: "produccion-esclusa-me-pt",
    pie: "Esclusa entre material de empaque y producto terminado",
  },
  higiene: {
    archivo: "area-de-productos-de-higiene-domestica",
    pie: "Línea de higiene doméstica",
  },
};
