import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/** Sitio público: cabecera y pie comerciales. La intranet no los hereda. */
export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="principal">{children}</main>
      <SiteFooter />
    </>
  );
}
