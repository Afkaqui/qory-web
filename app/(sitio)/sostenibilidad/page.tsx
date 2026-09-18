import type { Metadata } from "next";
import { Band, BandHead, Cta, Galeria, Grid, PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sostenibilidad",
  description:
    "Línea base de huella de carbono e hídrica medida conforme a ISO 14064-1 e ISO 14046, y programa de bio-sourcing con activos de origen peruano.",
  alternates: { canonical: "/sostenibilidad" },
};

const BIOSOURCING = [
  {
    titulo: "Activos de origen peruano",
    texto:
      "Sacha inchi, maca, hierba luisa, avena, caléndula y scrub de bambú ya forman parte de fórmulas en producción.",
  },
  {
    titulo: "Sustitución progresiva",
    texto:
      "Reemplazo gradual de polímeros y activos sintéticos importados por alternativas de origen natural con desempeño equivalente.",
  },
  {
    titulo: "Gestión de mermas",
    texto:
      "Trabajo con proveedores de envase y material gráfico para reducir desperdicio en el acondicionado.",
  },
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Sostenibilidad"
        titulo="Medir primero, mejorar después"
        texto="En 2026 levantamos nuestra primera línea base ambiental: huella de carbono y huella hídrica de la operación. No publicamos metas que no podamos medir."
      />

      <Band tono="blanco">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow">Línea base ambiental</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">
              Huella de carbono e hídrica
            </h2>
            <p className="mt-4 text-acero">
              Cuantificamos las emisiones de gases de efecto invernadero asociadas a
              nuestro consumo energético, uso de combustibles y generación de residuos,
              siguiendo los lineamientos de la norma <strong>ISO 14064-1</strong> y del
              GHG Protocol. En paralelo calculamos la huella hídrica organizacional
              según los principios de la norma <strong>ISO 14046</strong>.
            </p>
            <p className="mt-3.5 text-acero">
              El resultado es una línea base: el punto de partida contra el cual
              mediremos cualquier mejora futura de proceso.
            </p>
            <div className="aviso mt-5.5">
              <span className="aviso-tag">Cómo lo decimos</span>
              Nuestras mediciones se realizan <strong>conforme a la metodología</strong>{" "}
              de las normas ISO 14064-1 e ISO 14046. Esto no equivale a una
              certificación de tercera parte, y no la presentamos como tal.
            </div>
          </div>
          <Galeria cols={1} claves={["agua"]} />
        </div>
      </Band>

      <Band tono="nube">
        <BandHead
          eyebrow="Abastecimiento"
          titulo="Bio-sourcing: cambiar lo importado por lo que hay aquí"
          texto="Buena parte de los insumos cosméticos que se usan en el Perú son sintéticos e importados. Sustituirlos por activos de origen local reduce a la vez el impacto ambiental y la exposición al tipo de cambio."
        />
        <Grid cols={3}>
          {BIOSOURCING.map((b) => (
            <article key={b.titulo} className="card card-viva">
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="blanco">
        <BandHead eyebrow="Personas" titulo="Impacto social" />
        <Grid cols={2}>
          <article className="card card-viva bg-hueso">
            <h3>Empleo formal y técnico</h3>
            <p>
              La planta emplea personal calificado en química, microbiología, producción
              y asuntos regulatorios, con contratos formales y reglamento interno de
              trabajo aprobado.
            </p>
          </article>
          <article className="card card-viva bg-hueso">
            <h3>Acceso a producto de calidad</h3>
            <p>
              Nuestro propósito comercial y social coinciden: llevar cuidado personal
              con estándar de laboratorio a segmentos que hoy solo acceden a producto
              importado de bajo costo.
            </p>
          </article>
        </Grid>
      </Band>

      <Cta
        titulo="Trabajemos con criterios ambientales"
        texto="Si tu marca necesita justificar origen de ingredientes o gestión ambiental, podemos documentarlo contigo."
      />
    </>
  );
}
