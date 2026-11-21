import type { ReactNode } from "react";
import type { Estado } from "@/lib/intranet-gerencia";
import { Chip } from "@/components/intranet/marco";

/**
 * Tarjeta de un indicador de gerencia.
 *
 * Lleva el valor, un estado escrito (nunca solo color: se tiene que entender
 * impreso en blanco y negro o por alguien con daltonismo) y, plegada, la
 * definición que entregó la empresa: cómo se mide y por qué importa. Así quien
 * mira el número no tiene que adivinar qué cuenta.
 */
export function KpiGerencia({
  etiqueta,
  valor,
  estado,
  pie,
  comoSeMide,
  porQue,
}: {
  etiqueta: string;
  valor: string;
  estado: Estado;
  pie: ReactNode;
  comoSeMide: string;
  porQue: string;
}) {
  return (
    <article className="flex flex-col rounded-[3px] border border-linea bg-white p-4">
      <h2 className="font-mono text-[10px] leading-snug tracking-[0.12em] text-acero-claro uppercase">
        {etiqueta}
      </h2>

      <div className="mt-1.5 text-[26px] leading-none font-bold tracking-[-0.02em] text-verde tabular-nums">
        {valor}
      </div>

      <div className="mt-2.5">
        <Chip tono={estado.tono}>{estado.texto}</Chip>
      </div>

      <p className="mt-2 text-[11.5px] leading-snug text-acero-claro">{pie}</p>

      <dl className="mt-3 grid gap-2.5 border-t border-linea pt-3 text-[12.5px] leading-snug text-acero">
        <div>
          <dt className="font-semibold text-verde">Cómo se mide</dt>
          <dd>{comoSeMide}</dd>
        </div>
        <div>
          <dt className="font-semibold text-verde">Por qué importa</dt>
          <dd>{porQue}</dd>
        </div>
      </dl>
    </article>
  );
}
