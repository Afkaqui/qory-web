import type { MetadataRoute } from "next";
import { EMPRESA } from "@/lib/empresa";

export default function robots(): MetadataRoute.Robots {
  return {
    // Se permite rastrear todo a propósito. Las páginas legales y la intranet
    // llevan `noindex` en su metadata, y para que Google lo respete primero
    // tiene que poder leerlo: una URL bloqueada por robots.txt puede acabar
    // indexada igual si hay enlaces hacia ella, que es justo nuestro caso.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${EMPRESA.sitio}/sitemap.xml`,
  };
}
