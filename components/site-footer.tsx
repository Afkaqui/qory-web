import Image from "next/image";
import Link from "next/link";
import { EMPRESA } from "@/lib/empresa";

const COLUMNAS: { titulo: string; enlaces: { href: string; texto: string }[] }[] = [
  {
    titulo: "Servicios",
    enlaces: [
      { href: "/maquila", texto: "Maquila 360°" },
      { href: "/maquila#marca-privada", texto: "Marca privada" },
      { href: "/capacidades", texto: "Capacidades de planta" },
      { href: "/productos", texto: "Qué fabricamos" },
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { href: "/nosotros", texto: "Nosotros" },
      { href: "/marcas", texto: "Nuestras marcas" },
      { href: "/calidad", texto: "Calidad y cumplimiento" },
      { href: "/sostenibilidad", texto: "Sostenibilidad" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-verde-hondo pt-14 pb-8 text-[#9c9d86]">
      <div className="hoja">
        <div className="grid gap-10 border-t border-[#43442c] pt-9 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-14">
          <div>
            <Image
              src="/img/logo-negativo.png"
              alt="Qory Laboratorios"
              width={1400}
              height={350}
              className="mb-5 h-11 w-auto"
            />
            <p className="max-w-[34ch] text-[14px] leading-relaxed">
              Laboratorio peruano de desarrollo, fabricación y acondicionado de
              productos cosméticos. Operando desde {EMPRESA.desde}.
            </p>
          </div>

          {COLUMNAS.map((c) => (
            <div key={c.titulo}>
              <h2 className="rotulo rotulo-luz mb-4">{c.titulo}</h2>
              <ul className="grid gap-2.5 text-[14px]">
                {c.enlaces.map((e) => (
                  <li key={e.href}>
                    <Link className="text-[#c9cab8] transition-colors hover:text-white" href={e.href}>
                      {e.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="rotulo rotulo-luz mb-4">Contacto</h2>
            <ul className="grid gap-2.5 text-[14px]">
              <li className="leading-relaxed">
                {EMPRESA.direccion}
                <br />
                {EMPRESA.distrito}
              </li>
              {EMPRESA.telefonos.map((t) => (
                <li key={t.numero}>
                  <a
                    className="text-[#c9cab8] transition-colors hover:text-white"
                    href={`tel:+51${t.numero.replace(/\s/g, "")}`}
                  >
                    {t.numero}
                  </a>{" "}
                  <span className="text-[#75765f]">{t.rol}</span>
                </li>
              ))}
              <li>
                <a
                  className="text-[#c9cab8] transition-colors hover:text-white"
                  href={`mailto:${EMPRESA.correo}`}
                >
                  {EMPRESA.correo}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-2.5">
                <a className="text-[#c9cab8] hover:text-white" href={EMPRESA.redes.linkedin} rel="noopener">
                  LinkedIn
                </a>
                <span aria-hidden="true">·</span>
                <a className="text-[#c9cab8] hover:text-white" href={EMPRESA.redes.facebook} rel="noopener">
                  Facebook
                </a>
                <span aria-hidden="true">·</span>
                <a className="text-[#c9cab8] hover:text-white" href={EMPRESA.redes.instagram} rel="noopener">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-[#43442c] pt-6">
          <span className="dato text-[#75765f]">{EMPRESA.razon}</span>
          <span className="flex flex-wrap gap-x-2.5 text-[13px]">
            <Link className="text-[#c9cab8] hover:text-white" href="/legal/privacidad">
              Política de privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link className="text-[#c9cab8] hover:text-white" href="/legal/reclamaciones">
              Libro de Reclamaciones
            </Link>
          </span>
          <span className="dato text-[#75765f]">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
