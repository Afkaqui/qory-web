"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EMPRESA, MENU } from "@/lib/empresa";

function Candado({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  const ventas = EMPRESA.telefonos[0];

  // Cerrar el menú al cambiar de página, ajustando el estado durante el render
  // (patrón recomendado por React, sin efecto ni renders en cascada).
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(false);
  }

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 bg-hueso/93 backdrop-blur-[10px] backdrop-saturate-150">
      {/* Barra de servicio: contacto comercial y acceso interno.
          Se separa del menú porque el menú es para clientes y esto no. */}
      <div className="hidden border-b border-linea lg:block">
        <div className="wrap">
          <div className="flex min-h-[38px] items-center justify-end gap-5 text-[12.5px]">
            <a
              className="text-acero transition-colors hover:text-hoja-txt"
              href={`tel:+51${ventas.numero.replace(/\s/g, "")}`}
            >
              Ventas {ventas.numero}
            </a>
            <span aria-hidden="true" className="h-3.5 w-px bg-linea" />
            <Link
              href="/intranet"
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-linea px-2.5 py-1 font-medium text-verde transition-colors hover:border-lima hover:bg-lima/15 hover:text-hoja-txt"
            >
              <Candado />
              Intranet
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap border-b border-linea lg:border-b-0">
        <div className="flex min-h-[70px] items-center gap-6 border-b-0 lg:border-b lg:border-linea">
          <Link
            href="/"
            aria-label="Qory Lab, inicio"
            className="shrink-0 transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/img/logo.png"
              alt="Qory Laboratorios"
              width={539}
              height={132}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="nav-menu"
            onClick={() => setAbierto((v) => !v)}
            className="ml-auto cursor-pointer rounded-[2px] border border-linea px-3 py-2.5 text-[13px] font-semibold text-verde transition-colors hover:border-lima hover:bg-lima/15 lg:hidden"
          >
            {abierto ? "Cerrar" : "Menú"}
          </button>

          <nav aria-label="Principal" className="contents">
            <ul
              id="nav-menu"
              className={`${
                abierto ? "flex" : "hidden"
              } absolute inset-x-0 top-full flex-col items-stretch gap-0 border-b border-linea bg-hueso px-5 pt-2 pb-4.5 lg:ml-auto lg:flex lg:static lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0`}
            >
              {MENU.map((m) => {
                const activo = pathname === m.href;
                return (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      aria-current={activo ? "page" : undefined}
                      className={`enlace-nav block border-b border-linea px-1 py-3.5 text-sm font-medium lg:border-0 lg:px-2.5 lg:py-2 ${
                        activo ? "esta-aqui text-hoja-txt" : "text-verde"
                      }`}
                    >
                      {m.texto}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-3 lg:mt-0 lg:ml-2">
                <Link
                  href="/contacto"
                  className="btn-brillo block rounded-[2px] bg-verde px-4.5 py-2.5 text-center text-sm font-semibold text-hueso"
                >
                  Cotiza tu proyecto
                </Link>
              </li>
              {/* En móvil el acceso interno vive al final del menú */}
              <li className="mt-3 lg:hidden">
                <Link
                  href="/intranet"
                  aria-current={pathname === "/intranet" ? "page" : undefined}
                  className="flex items-center justify-center gap-2 rounded-[2px] border border-linea px-4.5 py-2.5 text-sm font-semibold text-verde"
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
