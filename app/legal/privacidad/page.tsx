import type { Metadata } from "next";
import { Band, PageHead } from "@/components/ui";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Qory Laboratorios trata los datos personales recogidos a través de su sitio web, conforme a la Ley 29733.",
  alternates: { canonical: "/legal/privacidad" },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Legal"
        titulo="Política de privacidad"
        texto="Cómo tratamos los datos personales que nos entregas, conforme a la Ley 29733 de Protección de Datos Personales y su reglamento."
      />

      <Band tono="blanco">
        <div className="doc">
          <div className="aviso">
            <span className="aviso-tag">Borrador para revisión legal</span>
            Este texto es una base de trabajo.{" "}
            <strong>Debe ser revisado y aprobado por Asesoría Legal</strong> antes de
            publicar el sitio, e inscrito el banco de datos personales ante la Autoridad
            Nacional de Protección de Datos Personales cuando corresponda.
          </div>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            {EMPRESA.razon}, con RUC {EMPRESA.ruc} y domicilio en {EMPRESA.direccion},{" "}
            {EMPRESA.distrito}, es responsable del tratamiento de los datos personales
            recogidos a través de este sitio web.
          </p>

          <h2>2. Datos que recogemos</h2>
          <p>
            A través del formulario de cotización recogemos: nombre de la empresa, nombre
            de la persona de contacto, correo electrónico, número de teléfono y la
            información del proyecto que decidas compartir.
          </p>

          <h2>3. Para qué los usamos</h2>
          <ul>
            <li>Responder a tu consulta comercial y elaborar una cotización.</li>
            <li>
              Mantener la comunicación relativa al proyecto durante su desarrollo.
            </li>
            <li>
              Cumplir obligaciones legales, contables y tributarias derivadas de una
              eventual relación comercial.
            </li>
          </ul>
          <p>
            No usamos tus datos para fines distintos ni los cedemos a terceros con fines
            comerciales.
          </p>

          <h2>4. Por cuánto tiempo</h2>
          <p>
            Conservamos los datos mientras dure la relación comercial y, después,
            durante el plazo exigido por la normativa aplicable para atender posibles
            responsabilidades.
          </p>

          <h2>5. Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición
            escribiendo a <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>,
            adjuntando copia de tu documento de identidad. Responderemos dentro de los
            plazos previstos por la Ley 29733.
          </p>

          <h2>6. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas para proteger tus datos frente a
            accesos no autorizados, pérdida o alteración.
          </p>

          <h2>7. Cambios</h2>
          <p>
            Cualquier modificación de esta política se publicará en esta misma página,
            indicando la fecha de actualización.
          </p>
        </div>
      </Band>
    </>
  );
}
