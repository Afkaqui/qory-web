import type { MetadataRoute } from "next";
import { EMPRESA, MENU } from "@/lib/empresa";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["/", ...MENU.map((m) => m.href), "/contacto"];
  const ahora = new Date();
  return rutas.map((ruta) => ({
    url: `${EMPRESA.sitio}${ruta === "/" ? "" : ruta}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: ruta === "/" ? 1 : 0.8,
  }));
}
