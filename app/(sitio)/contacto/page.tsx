import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { Band, PageHead } from "@/components/ui";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Cotiza tu proyecto",
  description:
    "Cuéntanos qué quieres fabricar y te respondemos con una evaluación técnica y una cotización. Planta en San Juan de Lurigancho, Lima.",
  alternates: { canonical: "/contacto" },
};

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Contacto"
        titulo="Cotiza tu proyecto"
        texto="Cuéntanos qué quieres fabricar. Cuanto más concreto sea el briefing, más precisa será nuestra evaluación técnica y nuestra cotización."
      />

      <Band tono="blanco">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-15">
          <div>
            <span className="eyebrow">Briefing</span>
            <h2 className="mt-3 text-[clamp(22px,3vw,30px)]">Diez datos y empezamos</h2>
            <p className="mt-3.5 mb-6.5 text-acero">
              Los campos marcados con <span className="text-hoja-txt">*</span> son
              necesarios para poder responderte con algo útil.
            </p>
            <QuoteForm />
          </div>

          <aside className="grid gap-4.5">
            <div className="card bg-hueso">
              <span className="eyebrow">Planta y oficinas</span>
              <p className="text-base text-verde">
                <strong>{EMPRESA.razon}</strong>
                <br />
                {EMPRESA.direccion}
                <br />
                {EMPRESA.distrito}
              </p>
              <p className="text-sm text-acero-claro">
                Referencia: {EMPRESA.referencia}
              </p>
              <div className="card-pie border-t border-solid border-linea">
                <p className="text-[15px] text-acero">
                  {EMPRESA.telefonos.map((t) => (
                    <span key={t.numero}>
                      <a
                        className="font-medium text-hoja-txt"
                        href={`tel:+51${t.numero.replace(/\s/g, "")}`}
                      >
                        {t.numero}
                      </a>{" "}
                      <span className="text-acero-claro">{t.rol}</span>
                      <br />
                    </span>
                  ))}
                  <a className="text-hoja-txt" href={`mailto:${EMPRESA.correo}`}>
                    {EMPRESA.correo}
                  </a>
                </p>
              </div>
            </div>

            <div className="card bg-hueso">
              <span className="eyebrow">Horario de atención</span>
              <p className="text-[15px] text-acero">
                {EMPRESA.horario.map((h) => (
                  <span key={h}>
                    {h}.
                    <br />
                  </span>
                ))}
              </p>
            </div>

            <div className="aviso">
              <span className="aviso-tag">¿Eres distribuidor?</span>
              Si te interesa comercializar <strong>Daya</strong> o{" "}
              <strong>Activen</strong>, indícalo en el briefing y te enviamos lista de
              precios y condiciones por canal.
            </div>
          </aside>
        </div>
      </Band>
    </>
  );
}
