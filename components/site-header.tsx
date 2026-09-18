"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MENU } from "@/lib/empresa";

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  // Cerrar el menú al cambiar de página.
  useEffect(() => setAbierto(false), [pathname]);

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-linea bg-hueso/93 backdrop-blur-[10px] backdrop-saturate-150">
      <div className="wrap">
        <div className="flex min-h-[70px] items-center gap-6">
          <Link href="/" aria-label="Qory Lab, inicio" className="shrink-0">
            <Image
              src="/img/logo.png"
              alt="Qory Laboratorios"
              width={603}
              height={150}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="nav-menu"
            onClick={() => setAbierto((v) => !v)}
            className="ml-auto cursor-pointer rounded-[2px] border border-linea px-3 py-2.5 text-[13px] font-semibold text-verde lg:hidden"
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
                      className={`block border-b border-linea px-1 py-3.5 text-sm font-medium lg:rounded-[2px] lg:border-0 lg:px-2.5 lg:py-2 lg:hover:bg-nube ${
                        activo
                          ? "text-hoja-txt lg:shadow-[inset_0_-2px_0_var(--color-hoja)]"
                          : "text-verde"
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
                  className="block rounded-[2px] bg-verde px-4.5 py-2.5 text-center text-sm font-semibold text-hueso hover:bg-verde-alto"
                >
                  Cotiza tu proyecto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
