"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { EMPRESA } from "@/lib/empresa";

/**
 * Briefing de cotización.
 *
 * PENDIENTE: hoy compone un mailto con los datos. Antes de publicar hay que
 * conectarlo a un endpoint real (una Route Handler en app/api/cotizar/route.ts
 * con envío por SMTP, o un servicio tipo Formspree) para no depender del
 * cliente de correo del visitante y para registrar los leads.
 */

const CATEGORIAS = [
  "Tratamiento facial",
  "Cuidado capilar",
  "Cuidado corporal",
  "Aún no está definido",
];

const ETIQUETAS: Record<string, string> = {
  empresa: "Empresa",
  nombre: "Contacto",
  correo: "Correo",
  telefono: "Teléfono",
  categoria: "Categoría",
  formato: "Formato",
  volumen: "Volumen estimado",
  marca: "¿Tiene marca registrada?",
  envase: "¿Tiene envase definido?",
  plazo: "Plazo objetivo",
  detalle: "Detalle del proyecto",
};

export function QuoteForm() {
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);

    const cuerpo = Object.entries(ETIQUETAS)
      .map(([campo, etiqueta]) => [etiqueta, String(datos.get(campo) ?? "")])
      .filter(([, valor]) => valor.trim() !== "")
      .map(([etiqueta, valor]) => `${etiqueta}: ${valor}`)
      .join("\n");

    const asunto = `Solicitud de cotización — ${datos.get("empresa") || "sin empresa"}`;
    setEnviado(true);
    window.location.href = `mailto:${EMPRESA.correo}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(cuerpo)}`;
  }

  return (
    <form className="grid gap-4.5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="empresa">
            Empresa <span>*</span>
          </label>
          <input id="empresa" name="empresa" type="text" required autoComplete="organization" />
        </div>
        <div className="campo">
          <label htmlFor="nombre">
            Persona de contacto <span>*</span>
          </label>
          <input id="nombre" name="nombre" type="text" required autoComplete="name" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="correo">
            Correo <span>*</span>
          </label>
          <input id="correo" name="correo" type="email" required autoComplete="email" />
        </div>
        <div className="campo">
          <label htmlFor="telefono">Teléfono o WhatsApp</label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="categoria">
            Categoría del producto <span>*</span>
          </label>
          <select id="categoria" name="categoria" required defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            {CATEGORIAS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="formato">Formato</label>
          <input
            id="formato"
            name="formato"
            type="text"
            placeholder="Crema, gel, sérum, shampoo…"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="volumen">Volumen estimado</label>
          <input
            id="volumen"
            name="volumen"
            type="text"
            placeholder="Unidades por lote o por año"
          />
          <span className="ayuda">Un estimado aproximado nos basta para dimensionar.</span>
        </div>
        <div className="campo">
          <label htmlFor="plazo">Plazo objetivo</label>
          <input id="plazo" name="plazo" type="text" placeholder="Mes y año de lanzamiento" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="marca">¿Tienes marca registrada?</label>
          <select id="marca" name="marca" defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option>Sí, ya está registrada</option>
            <option>En trámite</option>
            <option>No, necesito orientación</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="envase">¿Tienes envase definido?</label>
          <select id="envase" name="envase" defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option>Sí, con proveedor propio</option>
            <option>No, necesito propuesta</option>
          </select>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="detalle">Cuéntanos tu proyecto</label>
        <textarea
          id="detalle"
          name="detalle"
          placeholder="Concepto, público objetivo, referencias de producto, activos que te interesan…"
        />
      </div>

      <div>
        <button className="accion accion-llena" type="submit">
          Enviar briefing
        </button>
        {enviado && (
          <p className="mt-3 max-w-[62ch] text-[13px] text-acero-claro" role="status">
            Estamos abriendo tu cliente de correo con el briefing completo. Si no se
            abre, escríbenos a{" "}
            <a className="text-hoja-txt" href={`mailto:${EMPRESA.correo}`}>
              {EMPRESA.correo}
            </a>
            .
          </p>
        )}
      </div>

      <p className="max-w-[62ch] text-[13px] text-acero-claro">
        Al enviar este formulario aceptas que tratemos tus datos para responder a tu
        consulta comercial, conforme a nuestra{" "}
        <Link className="text-hoja-txt" href="/legal/privacidad">
          política de privacidad
        </Link>
        . Firmamos acuerdo de confidencialidad antes de recibir información técnica.
      </p>
    </form>
  );
}
