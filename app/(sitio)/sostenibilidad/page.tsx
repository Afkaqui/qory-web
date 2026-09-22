import type { Metadata } from "next";
import { Cierre, Clausula, Declaracion, Indice, PlacaAncha, Portadilla, Seccion, Specs } from "@/components/hoja";

export const metadata: Metadata = {
  title: "Sostenibilidad",
  description:
    "Línea base de huella de carbono e hídrica medida conforme a ISO 14064-1 e ISO 14046, y programa de bio-sourcing con activos de origen peruano.",
  alternates: { canonical: "/sostenibilidad" },
};

const BIOSOURCING = [
  {
    titulo: "Activos de origen peruano",
    detalle:
      "Sacha inchi, maca, hierba luisa, avena, caléndula y scrub de bambú ya forman parte de fórmulas en producción.",
    meta: "En curso",
  },
  {
    titulo: "Sustitución progresiva",
    detalle:
      "Reemplazo gradual de polímeros y activos sintéticos importados por alternativas de origen natural con desempeño equivalente.",
    meta: "En curso",
  },
  {
    titulo: "Gestión de mermas",
    detalle:
      "Trabajo con proveedores de envase y material gráfico para reducir desperdicio en el acondicionado.",
    meta: "En curso",
  },
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 07 · Sostenibilidad"
        titulo="Medir primero, mejorar después"
        lede="En 2026 levantamos nuestra primera línea base ambiental: huella de carbono y huella hídrica de la operación. No publicamos metas que no podamos medir."
        ficha={[
          ["Huella de carbono", "Metodología ISO 14064-1 y GHG Protocol"],
          ["Huella hídrica", "Principios de la norma ISO 14046"],
          ["Alcance", "Consumo energético, combustibles, residuos y agua de la operación"],
          ["Estado", "Línea base 2026 · punto de partida para medir mejoras"],
        ]}
      />

      <Seccion>
        <Clausula n="01" titulo="Línea base ambiental" />
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[12ch] text-verde">
            Huella de carbono e hídrica
          </h2>
          <div className="max-w-[52ch] space-y-5 text-[15.5px] leading-relaxed text-acero">
            <p>
              Cuantificamos las emisiones de gases de efecto invernadero asociadas a
              nuestro consumo energético, uso de combustibles y generación de residuos,
              siguiendo los lineamientos de la norma ISO 14064-1 y del GHG Protocol. En
              paralelo calculamos la huella hídrica organizacional según los principios
              de la norma ISO 14046.
            </p>
            <p>
              El resultado es una línea base: el punto de partida contra el cual
              mediremos cualquier mejora futura de proceso.
            </p>
            <p className="regla mt-8 pt-5 text-[14.5px] text-acero-claro">
              Nuestras mediciones se realizan <strong className="text-verde">conforme a la
              metodología</strong> de esas normas. Esto no equivale a una certificación
              de tercera parte, y no la presentamos como tal.
            </p>
          </div>
        </div>
      </Seccion>

      <PlacaAncha clave="agua" />

      <Seccion tono="nube">
        <Clausula n="02" titulo="Abastecimiento" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[15ch] text-verde">
            Cambiar lo importado por lo que hay aquí
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            Buena parte de los insumos cosméticos que se usan en el Perú son sintéticos
            e importados. Sustituirlos por activos locales reduce a la vez el impacto
            ambiental y la exposición al tipo de cambio.
          </p>
        </div>
        <Indice entradas={BIOSOURCING} />
      </Seccion>

      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="Criterio">
            No publicamos metas que no podamos medir.
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Por eso esta página es corta. Cuando haya una segunda medición, habrá una
            comparación; hasta entonces, hay una línea base.
          </p>
        </div>
      </Seccion>

      <Seccion>
        <Clausula n="03" titulo="Impacto social" />
        <Specs
          filas={[
            [
              "Empleo formal y técnico",
              "La planta emplea personal calificado en química, microbiología, producción y asuntos regulatorios, con contratos formales y reglamento interno de trabajo aprobado.",
            ],
            [
              "Acceso a producto de calidad",
              "Nuestro propósito comercial y social coinciden: llevar cuidado personal con estándar de laboratorio a segmentos que hoy solo acceden a producto importado de bajo costo.",
            ],
          ]}
        />
      </Seccion>

      <Cierre
        titulo="Trabajemos con criterios ambientales"
        texto="Si tu marca necesita justificar origen de ingredientes o gestión ambiental, podemos documentarlo contigo."
      />
    </>
  );
}
