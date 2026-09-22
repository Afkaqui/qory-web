import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { Clausula, Portadilla, Seccion, Specs } from "@/components/hoja";
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
      <Portadilla
        codigo="Ficha 08 · Contacto"
        titulo="Cotiza tu proyecto"
        lede="Cuéntanos qué quieres fabricar. Cuanto más concreto sea el briefing, más precisa será nuestra evaluación técnica y nuestra cotización."
      />

      <Seccion compacta>
        <div className="grid gap-14 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
          <div>
            <Clausula n="01" titulo="Briefing" />
            <h2 className="aparece titular-medio mb-4 max-w-[14ch] text-verde">
              Diez datos y empezamos
            </h2>
            <p className="mb-10 max-w-[48ch] text-[15.5px] text-acero">
              Los campos marcados con <span className="text-hoja-txt">*</span> son
              necesarios para poder responderte con algo útil.
            </p>
            <QuoteForm />
          </div>

          <aside>
            <Clausula n="02" titulo="Datos de planta" />
            <Specs
              filas={[
                [
                  "Dirección",
                  <div key="dir">
                    {EMPRESA.direccion}
                    <br />
                    {EMPRESA.distrito}
                    <br />
                    <span className="text-acero-claro">Referencia: {EMPRESA.referencia}</span>
                  </div>,
                ],
                [
                  "Teléfonos",
                  <div key="tel">
                    {EMPRESA.telefonos.map((t) => (
                      <span key={t.numero} className="block">
                        <a
                          className="font-medium text-hoja-txt"
                          href={`tel:+51${t.numero.replace(/\s/g, "")}`}
                        >
                          {t.numero}
                        </a>{" "}
                        <span className="text-acero-claro">{t.rol}</span>
                      </span>
                    ))}
                  </div>,
                ],
                [
                  "Correo",
                  <a key="mail" className="text-hoja-txt" href={`mailto:${EMPRESA.correo}`}>
                    {EMPRESA.correo}
                  </a>,
                ],
                [
                  "Horario",
                  <div key="hor">
                    {EMPRESA.horario.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </div>,
                ],
                [
                  "Distribuidores",
                  "Si te interesa comercializar Daya o Activen, indícalo en el briefing y te enviamos lista de precios y condiciones por canal.",
                ],
              ]}
            />
          </aside>
        </div>
      </Seccion>
    </>
  );
}
