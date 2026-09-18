import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EMPRESA, FOTOS, PASOS } from "@/lib/empresa";

/* ------------------------------------------------------------------ bandas */

type Tono = "hueso" | "blanco" | "nube" | "verde";

const FONDO: Record<Tono, string> = {
  hueso: "bg-hueso",
  blanco: "bg-white",
  nube: "bg-nube",
  verde: "bg-verde-hondo text-[#dfe5da]",
};

export function Band({
  tono = "hueso",
  id,
  children,
}: {
  tono?: Tono;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${FONDO[tono]} py-12 sm:py-16 lg:py-22`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function BandHead({
  eyebrow,
  titulo,
  texto,
  oscuro = false,
}: {
  eyebrow: string;
  titulo: string;
  texto?: string;
  oscuro?: boolean;
}) {
  return (
    <div className="revela mb-8 max-w-[70ch] lg:mb-11">
      <span className={`eyebrow filete ${oscuro ? "eyebrow-luz" : ""}`}>{eyebrow}</span>
      <h2
        className={`mt-3 text-[clamp(25px,3.6vw,38px)] ${oscuro ? "text-[#f1f5ee]" : ""}`}
      >
        {titulo}
      </h2>
      {texto && (
        <p
          className={`mt-3.5 text-[clamp(15px,1.6vw,17.5px)] ${
            oscuro ? "text-[#b8c2b4]" : "text-acero"
          }`}
        >
          {texto}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------- cabecera de página */

export function PageHead({
  eyebrow,
  titulo,
  texto,
}: {
  eyebrow: string;
  titulo: string;
  texto: string;
}) {
  return (
    <section className="bg-verde-hondo py-11 sm:py-14 lg:py-18">
      <div className="wrap">
        <span className="eyebrow eyebrow-luz filete entra">{eyebrow}</span>
        <h1 className="entra entra-1 mt-3.5 text-[clamp(30px,5vw,52px)] text-[#f1f5ee]">
          {titulo}
        </h1>
        <p className="entra entra-2 mt-4 max-w-[62ch] text-[clamp(15px,1.7vw,18px)] text-[#b8c2b4]">
          {texto}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ rejilla */

export function Grid({
  cols = 3,
  children,
  className = "",
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  const map = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;
  return (
    <div className={`revela grid grid-cols-1 gap-[18px] ${map[cols]} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- pasos */

export function Pasos({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <div className="revela grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
      {PASOS.map((p, i) => (
        <div
          key={p.titulo}
          className={`paso-vivo rounded-b-[3px] border p-5 ${
            oscuro ? "border-linea-honda bg-white/5" : "border-linea bg-white"
          }`}
        >
          <div
            className={`font-mono text-[10.5px] tracking-[0.14em] ${
              oscuro ? "text-hoja-luz" : "text-hoja-txt"
            }`}
          >
            PASO {i + 1}
          </div>
          <h3
            className={`mt-2 text-base ${oscuro ? "text-[#f1f5ee]" : ""}`}
          >
            {p.titulo}
          </h3>
          <p
            className={`mt-2 text-sm ${oscuro ? "text-[#b8c2b4]" : "text-acero"}`}
          >
            {p.texto}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- galería */

export function Galeria({
  claves,
  cols = 3,
  prioridad = false,
}: {
  claves: (keyof typeof FOTOS)[];
  cols?: 1 | 2 | 3;
  prioridad?: boolean;
}) {
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };
  return (
    <div className={`revela grid grid-cols-1 gap-3.5 ${map[cols]}`}>
      {claves.map((k, i) => {
        const f = FOTOS[k];
        return (
          <figure
            key={k}
            className="foto-viva overflow-hidden rounded-[3px] border border-linea bg-white transition-colors duration-300 hover:border-lima"
          >
            <Image
              src={`/img/planta/${f.archivo}.jpg`}
              alt={f.pie}
              width={1400}
              height={1050}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={prioridad && i === 0}
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="px-3.5 py-3 font-mono text-[10.5px] tracking-[0.1em] text-acero-claro uppercase">
              {f.pie}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- llamado */

export function Cta({
  titulo,
  texto,
  boton = "Cotiza tu proyecto",
}: {
  titulo: string;
  texto: string;
  boton?: string;
}) {
  return (
    <section className="bg-verde-hondo py-12 sm:py-16">
      <div className="wrap revela grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-[clamp(25px,3.6vw,38px)] text-[#f1f5ee]">
            {titulo}
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-[#b8c2b4]">{texto}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link className="btn btn-hoja btn-brillo" href="/contacto">
            {boton}
          </Link>
          <a className="btn btn-linea" href={`mailto:${EMPRESA.correo}`}>
            Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- declara */

export function Declara({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-[30ch] border-l-[3px] border-hoja py-1.5 pl-6.5">
      <p className="font-serif text-[clamp(22px,3.4vw,34px)] leading-[1.15] font-normal tracking-[-0.02em] text-verde">
        {children}
      </p>
    </blockquote>
  );
}
