"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { NAV, NIVEL, ROLES, type RolDemo, type Tono } from "@/lib/intranet-demo";

/* --------------------------------------------------------------- piezas */

const TONO: Record<Tono, string> = {
  ok: "bg-[#e0ede4] text-[#1f5c3b]",
  curso: "bg-nube text-acero",
  alerta: "bg-[#f7edd5] text-[#7a5a0e]",
  malo: "bg-[#f4e2de] text-[#8c382b]",
  neutro: "bg-nube text-acero-claro",
};

export function Chip({ tono, children }: { tono: Tono; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-[2px] px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${TONO[tono]}`}
    >
      {children}
    </span>
  );
}

export function Tile({
  etiqueta,
  valor,
  pie,
  tono = "normal",
}: {
  etiqueta: string;
  valor: string;
  pie: string;
  tono?: "normal" | "alerta";
}) {
  return (
    <div className="rounded-[3px] border border-linea bg-white p-4">
      <div className="font-mono text-[9.5px] leading-tight tracking-[0.12em] text-acero-claro uppercase">
        {etiqueta}
      </div>
      <div
        className={`mt-1.5 text-[27px] font-bold tracking-[-0.02em] tabular-nums ${
          tono === "alerta" ? "text-[#8c5a0e]" : "text-verde"
        }`}
      >
        {valor}
      </div>
      <div className="mt-1 text-[11.5px] text-acero-claro">{pie}</div>
    </div>
  );
}

export function Caja({
  titulo,
  children,
  className = "",
}: {
  titulo: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[3px] border border-linea bg-white p-4 ${className}`}>
      <h2 className="mb-3 font-mono text-[9.5px] tracking-[0.1em] text-acero-claro uppercase">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

/** Formulario de maqueta: se ve completo pero no envía nada. */
export function FormularioMaqueta({
  children,
  boton,
}: {
  children: ReactNode;
  boton: string;
}) {
  const [aviso, setAviso] = useState(false);
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setAviso(true);
      }}
    >
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-verde">
          {boton}
        </button>
        {aviso && (
          <p role="status" className="text-sm text-acero">
            Maqueta: este formulario todavía no guarda datos.
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- marco */

export function Marco({
  titulo,
  bajada,
  children,
}: {
  titulo: string;
  bajada?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [rol, setRol] = useState<RolDemo>("encargado");
  const [abierto, setAbierto] = useState(false);

  const visibles = NAV.filter((n) => NIVEL[rol] >= NIVEL[n.desde]);
  const grupos = ["Captura", "Gestión", "Dirección"] as const;
  const perfil = ROLES.find((r) => r.id === rol)!;

  return (
    <div className="min-h-screen bg-nube/60">
      {/* barra superior */}
      <div className="sticky top-0 z-40 border-b border-linea-honda bg-verde-hondo">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-4 py-2.5">
          <Link href="/intranet/panel" className="flex items-center gap-2.5">
            <Image
              src="/img/isotipo.png"
              alt="Qory Lab"
              width={192}
              height={192}
              className="h-7 w-7 object-contain"
            />
            <span className="text-sm font-semibold text-[#e7ebe3]">Intranet Qory</span>
          </Link>

          <span className="rounded-[2px] border border-[#8cc63f]/40 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-[#c7e68a] uppercase">
            Maqueta
          </span>

          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="rol-demo" className="hidden text-[11.5px] text-[#93a390] sm:block">
              Ver como
            </label>
            <select
              id="rol-demo"
              value={rol}
              onChange={(e) => setRol(e.target.value as RolDemo)}
              className="rounded-[2px] border border-[#3a5340] bg-[#16281b] px-2 py-1.5 text-[12.5px] text-[#e7ebe3]"
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
            <Link
              href="/intranet"
              className="rounded-[2px] border border-[#3a5340] px-2.5 py-1.5 text-[12.5px] text-[#c3ccbe] hover:bg-white/5"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-0 px-4 lg:flex-row lg:gap-6">
        {/* navegación lateral */}
        <div className="lg:w-[186px] lg:shrink-0 lg:pt-6">
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="nav-intranet"
            className="my-3 w-full rounded-[2px] border border-linea bg-white px-3 py-2.5 text-left text-[13px] font-semibold text-verde lg:hidden"
          >
            {abierto ? "Cerrar secciones" : "Secciones"}
          </button>
          <nav
            id="nav-intranet"
            aria-label="Secciones de la intranet"
            className={`${abierto ? "block" : "hidden"} pb-3 lg:block`}
          >
            {grupos.map((g) => {
              const items = visibles.filter((n) => n.grupo === g);
              if (!items.length) return null;
              return (
                <div key={g} className="mb-4">
                  <div className="mb-1.5 px-2 font-mono text-[9.5px] tracking-[0.13em] text-acero-claro uppercase">
                    {g}
                  </div>
                  <ul className="grid gap-0.5">
                    {items.map((n) => {
                      const activo = pathname === n.href;
                      return (
                        <li key={n.href}>
                          <Link
                            href={n.href}
                            aria-current={activo ? "page" : undefined}
                            className={`block rounded-[2px] px-2.5 py-2 text-[13.5px] transition-colors ${
                              activo
                                ? "bg-white font-semibold text-verde shadow-[inset_3px_0_0_var(--color-hoja)]"
                                : "text-acero hover:bg-white/70 hover:text-verde"
                            }`}
                          >
                            {n.texto}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <p className="mt-5 rounded-[3px] border border-linea bg-white/70 px-3 py-2.5 text-[11.5px] leading-snug text-acero-claro">
              Estás viendo la intranet como <b className="text-verde">{perfil.nombre}</b>.{" "}
              {perfil.quien}. Cambia el selector de arriba para ver qué alcanza cada rol.
            </p>
          </nav>
        </div>

        {/* contenido */}
        <main className="min-w-0 flex-1 py-5 lg:py-6">
          <header className="mb-5">
            <h1 className="text-[clamp(20px,3vw,27px)] text-verde">{titulo}</h1>
            {bajada && <p className="mt-1.5 max-w-[70ch] text-[14.5px] text-acero">{bajada}</p>}
          </header>
          {children}
          <p className="mt-8 border-t border-linea pt-4 font-mono text-[10.5px] tracking-[0.06em] text-acero-claro uppercase">
            Maqueta visual · datos de ejemplo · sin base de datos ni sesión real
          </p>
        </main>
      </div>
    </div>
  );
}
