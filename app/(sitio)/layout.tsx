import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/** Sitio público: cabecera y pie comerciales. La intranet no los hereda. */
export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* Progreso de lectura: puro CSS, guiado por el scroll de la página. */}
      <div className="progreso" aria-hidden="true" />
      <SiteHeader />
      <main id="principal">{children}</main>
      <SiteFooter />
    </>
  );
}
