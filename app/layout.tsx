import type { Metadata } from "next";
import { Archivo, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { EMPRESA } from "@/lib/empresa";
import "./globals.css";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(EMPRESA.sitio),
  title: {
    default: "Qory Lab — Laboratorio cosmético peruano | Maquila y marca privada",
    template: "%s — Qory Lab",
  },
  description:
    "Laboratorio peruano de cosméticos. Maquila 360°, desarrollo de marca privada y marcas propias. Formulación, registro sanitario y producción bajo un mismo techo desde 2017.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Qory Lab",
    // Sin `url` fija: si se declara aquí, todas las páginas comparten la de
    // portada y al compartir una interior se anuncia la URL equivocada.
    // El canónico de cada página ya cumple esa función.
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#1e3327",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={cn(
        "h-full font-sans antialiased",
        archivo.variable,
        fraunces.variable,
        plexMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-verde focus:px-4 focus:py-2.5 focus:text-hueso"
        >
          Ir al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
