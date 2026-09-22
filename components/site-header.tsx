"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EMPRESA, MENU } from "@/lib/empresa";

function Candado() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="7" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  const ventas = EMPRESA.telefonos[0];

  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(false);
  }

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-linea bg-hueso">
      {/* Renglón de servicio: teléfono comercial y acceso interno. */}
      <div className="hidden border-b border-linea lg:block">
        <div className="hoja flex min-h-[34px] items-center gap-6">
          <span className="rotulo">
            {EMPRESA.razon} · RUC {EMPRESA.ruc}
          </span>
          <div className="ml-auto flex items-center gap-6">
            <a
              className="dato transition-colors hover:text-hoja-txt"
              href={`tel:+51${ventas.numero.replace(/\s/g, "")}`}
            >
              Ventas {ventas.numero}
            </a>
            <Link
              href="/intranet"
              className="dato inline-flex items-center gap-1.5 transition-colors hover:text-hoja-txt"
            >
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
              <li className="mt-3 lg:hidden">
                <Link
                  href="/intranet"
                  className="accion flex items-center justify-center gap-2"
                >
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
