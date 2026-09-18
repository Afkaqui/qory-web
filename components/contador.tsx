"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contador que sube al entrar en pantalla.
 *
 * El servidor ya renderiza el valor final: si el visitante no tiene JS, o
 * reduce el movimiento, ve la cifra correcta igual. La animación solo la
 * sustituye cuando puede completarse.
 */
export function Contador({
  hasta,
  prefijo = "",
  sufijo = "",
  duracion = 1400,
}: {
  hasta: number;
  prefijo?: string;
  sufijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(hasta);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min((ahora - inicio) / duracion, 1);
          const suave = 1 - Math.pow(1 - t, 3);
          setValor(Math.round(hasta * suave));
          if (t < 1) cuadro = requestAnimationFrame(paso);
        };
        setValor(0);
        cuadro = requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );

    observador.observe(nodo);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [hasta, duracion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {valor}
      {sufijo}
    </span>
  );
}
