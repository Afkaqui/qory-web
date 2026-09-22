import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { EMPRESA, FOTOS } from "@/lib/empresa";

/**
 * Vocabulario de «ficha técnica».
 *
 * El sitio público se compone como la hoja de especificaciones que este
 * laboratorio produce a diario: filetes en lugar de tarjetas, datos en
 * monoespaciada, cláusulas numeradas. Nada va dentro de una caja con sombra.
 */

/* ------------------------------------------------------------- secciones */

export function Seccion({
  children,
  tono = "papel",
  id,
  compacta = false,
}: {
  children: ReactNode;
  tono?: "papel" | "tinta" | "nube";
  id?: string;
  compacta?: boolean;
}) {
  const fondo =
    tono === "tinta"
      ? "bg-verde-hondo text-[#dcdccf] tono-tinta"
      : tono === "nube"
        ? "bg-nube tono-nube"
        : "bg-hueso tono-papel";
  return (
    <section id={id} className={`${fondo} ${compacta ? "py-12 lg:py-16" : "py-16 lg:py-24"}`}>
      <div className="hoja">{children}</div>
    </section>
  );
}

/** Cabecera de cláusula: «03 ——————— QUÉ FABRICAMOS». */
export function Clausula({ n, titulo, oscuro = false }: { n: string; titulo: string; oscuro?: boolean }) {
  return (
    <div className={`clausula mb-8 lg:mb-11 ${oscuro ? "[&::after]:bg-[#43442c]" : ""}`}>
      <span className={oscuro ? "text-hoja-luz" : undefined}>
        {n} · {titulo}
      </span>
    </div>
  );
}

/* ------------------------------------------------- cabecera de página */

export function Portadilla({
  codigo,
  titulo,
  lede,
  ficha,
}: {
  codigo: string;
  titulo: ReactNode;
  lede: string;
  ficha?: [string, string][];
}) {
  return (
    <section className="bg-hueso pt-10 pb-14 lg:pt-14 lg:pb-20">
      <div className="hoja">
        <div className="regla-firme alza flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-3">
          <span className="rotulo rotulo-verde">{codigo}</span>
          <span className="dato">
            {EMPRESA.razon} · RUC {EMPRESA.ruc}
          </span>
        </div>

        <h1 className="titular alza alza-1 mt-8 max-w-[15ch] text-verde">{titulo}</h1>
        <p className="alza alza-2 mt-7 max-w-[56ch] text-[clamp(16px,1.9vw,20px)] leading-[1.5] text-acero">
          {lede}
        </p>

        {ficha && (
          <dl className="spec alza alza-3 mt-11 max-w-[720px]">
            {ficha.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- índices */

export type Entrada = {
  titulo: string;
  detalle: string;
  meta?: string;
  href?: string;
};

export function Indice({ entradas, desde = 1 }: { entradas: Entrada[]; desde?: number }) {
  return (
    <ol className="indice">
      {entradas.map((e, i) => (
        <li key={e.titulo}>
          <span className="n">{String(i + desde).padStart(2, "0")}</span>
          <span className="t">
            {e.href ? (
              <Link href={e.href} className="transition-colors hover:text-hoja-txt">
                {e.titulo}
              </Link>
            ) : (
              e.titulo
            )}
          </span>
          <span className="d">{e.detalle}</span>
          {e.meta && <span className="meta">{e.meta}</span>}
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------- lista de especificación */

export function Specs({ filas, compacto = false }: { filas: [string, ReactNode][]; compacto?: boolean }) {
  return (
    <dl className={`spec aparece ${compacto ? "max-w-[640px]" : ""}`}>
      {filas.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------- declaración */

export function Declaracion({
  children,
  pie,
  oscuro = false,
}: {
  children: ReactNode;
  pie?: string;
  oscuro?: boolean;
}) {
  return (
    <figure className="m-0">
      <blockquote className={`declaracion max-w-[19ch] ${oscuro ? "text-[#f2f2e9]" : "text-verde"}`}>
        {children}
      </blockquote>
      {pie && (
        <figcaption className={`rotulo mt-7 ${oscuro ? "rotulo-luz" : ""}`}>{pie}</figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------- foto */

export function Placa({
  clave,
  alto = "h-[46vw] max-h-[560px] min-h-[240px]",
  prioridad = false,
}: {
  clave: keyof typeof FOTOS;
  alto?: string;
  prioridad?: boolean;
}) {
  const f = FOTOS[clave];
  return (
    <figure className={`placa m-0 ${alto}`}>
      <Image
        src={`/img/planta/${f.archivo}.jpg`}
        alt={f.pie}
        width={1400}
        height={1050}
        priority={prioridad}
        sizes="100vw"
        className="saturate-90"
      />
      <figcaption>{f.pie}</figcaption>
    </figure>
  );
}

/** Banda de imagen a todo el ancho de la ventana, sin contenedor. */
export function PlacaAncha({
  clave,
  prioridad = false,
}: {
  clave: keyof typeof FOTOS;
  prioridad?: boolean;
}) {
  const f = FOTOS[clave];
  return (
    <figure className="placa m-0 h-[38vw] max-h-[520px] min-h-[220px]">
      <Image
        src={`/img/planta/${f.archivo}.jpg`}
        alt={f.pie}
        width={1400}
        height={1050}
        priority={prioridad}
        sizes="100vw"
        className="saturate-90"
      />
      <figcaption>{f.pie}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- cierre */

export function Cierre({
  titulo,
  texto,
  boton = "Cotiza tu proyecto",
}: {
  titulo: string;
  texto: string;
  boton?: string;
}) {
  return (
    <Seccion tono="tinta">
      <div className="aparece grid gap-9 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <div>
          <span className="rotulo rotulo-luz">Siguiente paso</span>
          <h2 className="titular-medio mt-5 max-w-[16ch] text-[#f2f2e9]">{titulo}</h2>
          <p className="mt-5 max-w-[52ch] text-[15.5px] text-[#b0b09c]">{texto}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link className="accion accion-luz" href="/contacto">
            {boton}
          </Link>
          <a className="accion accion-luz" href={`mailto:${EMPRESA.correo}`}>
            Escríbenos
          </a>
        </div>
      </div>
    </Seccion>
  );
}
