import Image from "next/image";
import Link from "next/link";
import { EMPRESA } from "@/lib/empresa";

const SERVICIOS = [
  { href: "/maquila", texto: "Maquila 360°" },
  { href: "/maquila#marca-privada", texto: "Marca privada" },
  { href: "/capacidades", texto: "Capacidades de planta" },
  { href: "/productos", texto: "Qué fabricamos" },
];

const EMPRESA_LINKS = [
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/marcas", texto: "Nuestras marcas" },
  { href: "/calidad", texto: "Calidad y cumplimiento" },
  { href: "/sostenibilidad", texto: "Sostenibilidad" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#0f2016] py-12 pb-7 text-sm text-[#96a394]">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/img/logo-negativo.png"
              alt="Qory Laboratorios"
              width={539}
              height={132}
              className="mb-4 h-12 w-auto"
            />
            <p>
              Laboratorio peruano de desarrollo, fabricación y acondicionado de
              productos cosméticos. Operando desde {EMPRESA.desde}.
            </p>
          </div>

          <div>
            <h2 className="mb-3.5 font-mono text-[10.5px] font-medium tracking-[0.14em] text-[#6d7d6b] uppercase">
              Servicios
            </h2>
            <ul className="grid gap-2.5">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link className="text-[#c3ccbe] hover:text-white hover:underline" href={s.href}>
                    {s.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3.5 font-mono text-[10.5px] font-medium tracking-[0.14em] text-[#6d7d6b] uppercase">
              Empresa
            </h2>
            <ul className="grid gap-2.5">
              {EMPRESA_LINKS.map((s) => (
                <li key={s.href}>
                  <Link className="text-[#c3ccbe] hover:text-white hover:underline" href={s.href}>
                    {s.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3.5 font-mono text-[10.5px] font-medium tracking-[0.14em] text-[#6d7d6b] uppercase">
              Contacto
            </h2>
            <ul className="grid gap-2.5">
              <li>
                {EMPRESA.direccion}
                <br />
                {EMPRESA.distrito}
              </li>
              <li>
                {EMPRESA.telefonos.map((t, i) => (
                  <span key={t}>
                    {i > 0 && " · "}
                    <a
                      className="text-[#c3ccbe] hover:text-white hover:underline"
                      href={`tel:+51${t.replace(/\s/g, "")}`}
                    >
                      {t}
                    </a>
                  </span>
                ))}
              </li>
              <li>
                <a
                  className="text-[#c3ccbe] hover:text-white hover:underline"
                  href={`mailto:${EMPRESA.correo}`}
                >
                  {EMPRESA.correo}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-2">
                <a className="text-[#c3ccbe] hover:text-white hover:underline" href={EMPRESA.redes.linkedin} rel="noopener">
                  LinkedIn
                </a>
                <span>·</span>
                <a className="text-[#c3ccbe] hover:text-white hover:underline" href={EMPRESA.redes.facebook} rel="noopener">
                  Facebook
                </a>
                <span>·</span>
                <a className="text-[#c3ccbe] hover:text-white hover:underline" href={EMPRESA.redes.instagram} rel="noopener">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-[#1c3324] pt-5 text-[12.5px] text-[#6d7d6b]">
          <span className="font-mono tracking-[0.06em]">
            {EMPRESA.razon} · RUC {EMPRESA.ruc}
          </span>
          <span className="flex flex-wrap gap-x-2">
            <Link className="text-[#c3ccbe] hover:text-white hover:underline" href="/legal/privacidad">
              Política de privacidad
            </Link>
            <span>·</span>
            <Link className="text-[#c3ccbe] hover:text-white hover:underline" href="/legal/reclamaciones">
              Libro de Reclamaciones
            </Link>
          </span>
          <span>
            © {new Date().getFullYear()} {EMPRESA.razon}
          </span>
        </div>
      </div>
    </footer>
  );
}
