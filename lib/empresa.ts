/**
 * Datos de la empresa. Fuente única para cabecera, pie, contacto y metadatos.
 *
 * Datos confirmados por la empresa el 22/09/2026.
 */

export const EMPRESA = {
  razon: "Qory Laboratorios S.A.C.",
  firma: "Qory Lab",
  ruc: "20601831601",
  desde: 2017,
  direccion: "APV. Inca Manco Cápac 2.ª etapa, Calle 4, Mz. F, Lt. 4–5",
  distrito: "San Juan de Lurigancho, Lima, Perú",
  referencia: "Av. Los Claveles, frente a la fábrica Celima",
  // Buzón de área, no personal: sobrevive a cambios de puesto y no expone
  // el nombre de nadie en una página pública.
  correo: "ventas01@qorylab.com",
  telefonos: [
    { numero: "936 518 211", rol: "Central · Administración" },
    { numero: "936 516 958", rol: "Gerencia General" },
  ],
  horario: ["Lunes a viernes, de 8:00 a 17:30"],
  // El sitio vive en el subdominio: el dominio raíz sigue en el hosting
  // anterior. De aquí salen metadataBase, Open Graph, sitemap y canónicos,
  // así que al mover el sitio al dominio raíz basta con cambiar esta línea.
  sitio: "https://web.qorylab.com",
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
};
