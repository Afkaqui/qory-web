import type { Metadata } from "next";
import { Portadilla, Seccion } from "@/components/hoja";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones de Qory Laboratorios S.A.C., conforme al Código de Protección y Defensa del Consumidor, Ley 29571.",
  alternates: { canonical: "/legal/reclamaciones" },
  robots: { index: false },
};

export default function Page() {
  const tel = EMPRESA.telefonos[0].numero;
  return (
    <>
      <Portadilla
        codigo="Anexo B · Legal"
        titulo="Libro de Reclamaciones"
        lede="Conforme al Código de Protección y Defensa del Consumidor, Ley 29571, ponemos a tu disposición nuestro Libro de Reclamaciones virtual."
      />

      <Seccion>
        <div className="doc">
          <div className="aviso">
            <span className="aviso-tag">Pendiente de implementación</span>
            Falta conectar aquí el{" "}
            <strong>formulario del Libro de Reclamaciones virtual</strong>, con
            numeración correlativa, envío de copia al consumidor y respuesta en un plazo
            máximo de 15 días hábiles. Debe ser aprobado por Asesoría Legal antes de
            publicar el sitio.
          </div>

          <h2>Qué puedes registrar</h2>
          <ul>
            <li>
              <strong>Reclamo:</strong> disconformidad relacionada con los productos o
              servicios recibidos.
            </li>
            <li>
              <strong>Queja:</strong> malestar respecto a la atención al público, no
              vinculado al producto en sí.
            </li>
          </ul>

          <h2>Cómo hacerlo mientras tanto</h2>
          <p>
            Escríbenos a <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a> o
            llámanos al{" "}
            <a href={`tel:+51${tel.replace(/\s/g, "")}`}>{tel}</a>, indicando tus datos
            de contacto, el producto o servicio involucrado y el detalle de tu reclamo o
            queja.
          </p>

          <h2>Plazo de respuesta</h2>
          <p>
            Atenderemos tu solicitud en un plazo máximo de quince (15) días hábiles,
            conforme a lo establecido por la Ley 29571.
          </p>

          <h2>Datos de la empresa</h2>
          <p>
            {EMPRESA.razon} · RUC {EMPRESA.ruc}
            <br />
            {EMPRESA.direccion}, {EMPRESA.distrito}
          </p>
        </div>
      </Seccion>
    </>
  );
}
