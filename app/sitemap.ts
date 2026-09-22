import type { MetadataRoute } from "next";
import { EMPRESA } from "@/lib/empresa";

/**
 * Solo entran páginas indexables. Las legales y la intranet quedan fuera:
 * llevan `noindex` y no tiene sentido pedirle a Google que las rastree.
 *
 * La prioridad es una señal relativa dentro del propio sitio, no una nota
 * frente a otros dominios.
 */
const RUTAS: { ruta: string; prioridad: number }[] = [
  { ruta: "/", prioridad: 1 },
  { ruta: "/maquila", prioridad: 0.9 },
  { ruta: "/contacto", prioridad: 0.9 },
  { ruta: "/productos", prioridad: 0.8 },
  { ruta: "/capacidades", prioridad: 0.8 },
  { ruta: "/marcas", prioridad: 0.7 },
  { ruta: "/calidad", prioridad: 0.7 },
  { ruta: "/nosotros", prioridad: 0.6 },
  { ruta: "/sostenibilidad", prioridad: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return RUTAS.map(({ ruta, prioridad }) => ({
    url: `${EMPRESA.sitio}${ruta === "/" ? "" : ruta}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: prioridad,
  }));
}
