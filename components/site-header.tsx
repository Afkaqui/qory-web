"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Candado,
  Correo,
  Facebook,
  Instagram,
  LinkedIn,
  Reloj,
  Telefono,
  Ubicacion,
  Whatsapp,
} from "@/components/iconos";
import { EMPRESA, MENU } from "@/lib/empresa";

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  const ventas = EMPRESA.telefonos[0];
  const tel = ventas.numero.replace(/\s/g, "");

  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(false);
  }

  const enlaceServicio =
    "inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-hoja-txt";

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-linea bg-hueso">
      {/* Renglón de servicio: lo que alguien busca sin tener que entrar a Contacto. */}
      <div className="hidden border-b border-linea lg:block">
        <div className="hoja flex min-h-[36px] items-center gap-5 text-[12px] text-acero">
          <span className={`${enlaceServicio} text-acero-claro`}>
            <Ubicacion />
            San Juan de Lurigancho, Lima
          </span>
          <span className={`${enlaceServicio} hidden text-acero-claro xl:inline-flex`}>
            <Reloj />
            Lun a vie · 8:00 – 17:30
          </span>

          <div className="ml-auto flex items-center gap-5">
            <a className={enlaceServicio} href={`tel:+51${tel}`}>
              <Telefono />
              Ventas {ventas.numero}
            </a>
            <a
              className={`${enlaceServicio} hidden xl:inline-flex`}
              href={`https://wa.me/51${tel}`}
              rel="noopener"
              target="_blank"
            >
              <Whatsapp />
              WhatsApp
            </a>
            <a className={`${enlaceServicio} hidden xl:inline-flex`} href={`mailto:${EMPRESA.correo}`}>
              <Correo />
              {EMPRESA.correo}
            </a>

            <span aria-hidden="true" className="h-3.5 w-px bg-linea" />

            <nav aria-label="Redes sociales" className="flex items-center gap-3">
              <a
                className="text-acero-claro transition-colors hover:text-hoja-txt"
                href={EMPRESA.redes.linkedin}
                rel="noopener"
                target="_blank"
              >
                <LinkedIn size={15} />
                <span className="sr-only">LinkedIn de Qory Laboratorios</span>
              </a>
              <a
                className="text-acero-claro transition-colors hover:text-hoja-txt"
                href={EMPRESA.redes.facebook}
                rel="noopener"
                target="_blank"
              >
                <Facebook size={15} />
                <span className="sr-only">Facebook de Qory Laboratorios</span>
              </a>
              <a
                className="text-acero-claro transition-colors hover:text-hoja-txt"
                href={EMPRESA.redes.instagram}
                rel="noopener"
                target="_blank"
              >
                <Instagram size={15} />
                <span className="sr-only">Instagram de Qory Laboratorios</span>
              </a>
            </nav>

            <span aria-hidden="true" className="h-3.5 w-px bg-linea" />

            <Link href="/intranet" className={enlaceServicio}>
              <Candado />
              Intranet
            </Link>
          </div>
        </div>
      </div>

      <div className="hoja">
        <div className="flex min-h-[74px] items-center gap-8">
          <Link href="/" aria-label="Qory Lab, inicio" className="shrink-0">
            <Image
              src="/img/logo.png"
              alt="Qory Laboratorios"
              width={1400}
              height={350}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="nav-menu"
            onClick={() => setAbierto((v) => !v)}
            className="rotulo ml-auto cursor-pointer border border-linea px-3 py-2.5 text-verde transition-colors hover:border-verde lg:hidden"
          >
            {abierto ? "Cerrar" : "Índice"}
          </button>

          <nav aria-label="Principal" className="contents">
            <ul
              id="nav-menu"
              className={`${
                abierto ? "flex" : "hidden"
              } absolute inset-x-0 top-full flex-col items-stretch border-b border-linea bg-hueso px-5 pb-5 lg:ml-auto lg:flex lg:static lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:p-0`}
            >
              {MENU.map((m) => {
                const activo = pathname === m.href;
                return (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      aria-current={activo ? "page" : undefined}
                      className={`block border-b border-linea py-3.5 text-[14.5px] transition-colors lg:border-0 lg:py-2 lg:text-[13.5px] ${
                        activo
                          ? "font-semibold text-verde lg:border-b-[1.5px] lg:border-hoja lg:pb-1.5"
                          : "text-acero hover:text-verde"
                      }`}
                    >
                      {m.texto}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-5 lg:mt-0 lg:ml-2">
                <Link href="/contacto" className="accion accion-llena block text-center lg:py-2.5">
                  Cotizar
                </Link>
              </li>

              {/* En móvil el renglón de servicio se despliega dentro del menú */}
              <li className="mt-5 grid gap-3 border-t border-linea pt-5 text-[14px] text-acero lg:hidden">
                <a className="inline-flex items-center gap-2.5" href={`tel:+51${tel}`}>
                  <Telefono size={15} />
                  Ventas {ventas.numero}
                </a>
                <a
                  className="inline-flex items-center gap-2.5"
                  href={`https://wa.me/51${tel}`}
                  rel="noopener"
                  target="_blank"
                >
                  <Whatsapp size={15} />
                  WhatsApp
                </a>
                <a className="inline-flex items-center gap-2.5" href={`mailto:${EMPRESA.correo}`}>
                  <Correo size={15} />
                  {EMPRESA.correo}
                </a>
                <span className="inline-flex items-center gap-2.5 text-acero-claro">
                  <Reloj size={15} />
                  Lun a vie · 8:00 – 17:30
                </span>
                <div className="flex items-center gap-4 pt-1">
                  <a className="text-acero-claro" href={EMPRESA.redes.linkedin} rel="noopener" target="_blank">
                    <LinkedIn size={17} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a className="text-acero-claro" href={EMPRESA.redes.facebook} rel="noopener" target="_blank">
                    <Facebook size={17} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a className="text-acero-claro" href={EMPRESA.redes.instagram} rel="noopener" target="_blank">
                    <Instagram size={17} />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </li>

              <li className="mt-4 lg:hidden">
                <Link href="/intranet" className="accion flex items-center justify-center gap-2">
                  <Candado />
                  Intranet
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
