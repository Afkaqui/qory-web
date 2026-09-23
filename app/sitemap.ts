import type { MetadataRoute } from "next";
import { EMPRESA, FOTOS } from "@/lib/empresa";

/**
 * Solo entran páginas indexables. Las legales y la intranet quedan fuera:
 * llevan `noindex` y no tiene sentido pedirle a Google que las rastree.
 *
 * Cada página declara además sus imágenes. Un sitemap de imágenes es la vía
 * directa para que Google descubra las fotos de planta: sin él tiene que
 * deducirlas del HTML, y las que pasan por el optimizador de Next quedan tras
 * una URL generada que rastrea peor. Aquí se apunta al archivo original.
 */

const foto = (clave: keyof typeof FOTOS) =>
  `${EMPRESA.sitio}/img/planta/${FOTOS[clave].archivo}.jpg`;

const RUTAS: {
  ruta: string;
  prioridad: number;
  imagenes: string[];
}[] = [
  {
    ruta: "/",
    prioridad: 1,
    imagenes: [
      `${EMPRESA.sitio}/opengraph-image.png`,
      foto("microbiologia"),
      foto("fisicoQuimico"),
    ],
  },
  { ruta: "/maquila", prioridad: 0.9, imagenes: [foto("acondicionado1")] },
  { ruta: "/contacto", prioridad: 0.9, imagenes: [] },
  { ruta: "/productos", prioridad: 0.8, imagenes: [] },
  {
    ruta: "/capacidades",
    prioridad: 0.8,
    imagenes: [
      foto("esclusa"),
      foto("fabricacion1"),
      foto("envasado"),
      foto("acondicionado2"),
      foto("fisicoQuimico"),
      foto("siembra"),
      foto("incubadoras"),
      foto("agua"),
      foto("materiaPrima"),
      foto("dispensacion"),
    ],
  },
  { ruta: "/marcas", prioridad: 0.7, imagenes: [] },
  { ruta: "/calidad", prioridad: 0.7, imagenes: [foto("incubadoras")] },
  { ruta: "/nosotros", prioridad: 0.6, imagenes: [foto("fabricacion1")] },
  { ruta: "/sostenibilidad", prioridad: 0.5, imagenes: [foto("agua")] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return RUTAS.map(({ ruta, prioridad, imagenes }) => ({
    url: `${EMPRESA.sitio}${ruta === "/" ? "" : ruta}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: prioridad,
    ...(imagenes.length ? { images: imagenes } : {}),
  }));
}
