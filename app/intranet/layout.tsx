import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intranet",
  description: "Acceso interno de Qory Laboratorios.",
  robots: { index: false, follow: false },
};

/**
 * La intranet vive dentro del mismo proyecto pero no comparte la cabecera ni el
 * pie del sitio público: es otra audiencia y otro contexto. El layout raíz ya
 * aporta html, body y tipografías.
 */
export default function IntranetLayout({ children }: LayoutProps<"/intranet">) {
  return <div className="min-h-[60vh] bg-nube/50">{children}</div>;
}
