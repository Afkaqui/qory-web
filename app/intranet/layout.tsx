import type { Metadata } from "next";
import { SesionProvider } from "@/components/intranet/marco";
import { usuarioActual } from "@/lib/auth/sesion";

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
export default async function IntranetLayout({ children }: LayoutProps<"/intranet">) {
  const u = await usuarioActual();
  return (
    <SesionProvider sesion={u && { nombre: u.nombre, email: u.email, rol: u.rol }}>
      <div className="min-h-[60vh] bg-nube/50">{children}</div>
    </SesionProvider>
  );
}
