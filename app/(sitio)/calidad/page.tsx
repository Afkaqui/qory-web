import type { Metadata } from "next";
import { Cierre, Clausula, Declaracion, Indice, PlacaAncha, Portadilla, Seccion, Specs } from "@/components/hoja";

export const metadata: Metadata = {
  title: "Calidad y cumplimiento",
  description:
    "Área propia de Asuntos Regulatorios, control de calidad físico-químico y microbiológico en planta, y trazabilidad por lote.",
  alternates: { canonical: "/calidad" },
};

const REGULATORIO = [
  {
    titulo: "Expediente técnico",
    detalle:
      "Preparamos la documentación del producto: fórmula cualitativa y cuantitativa, especificaciones y proyecto de arte.",
    meta: "Paso 1",
  },
  {
    titulo: "Notificación sanitaria",
    detalle:
      "Presentamos y damos seguimiento al trámite ante Digemid hasta la obtención del código de notificación.",
    meta: "Paso 2",
  },
  {
    titulo: "Vigilancia posterior",
    detalle:
      "Acompañamos modificaciones, renovaciones y requerimientos de la autoridad durante la vida del producto.",
    meta: "Paso 3",
  },
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 06 · Calidad y cumplimiento"
        titulo="Lo que respalda cada lote"
        lede="Un área propia de Asuntos Regulatorios, control de calidad físico-químico y microbiológico en planta, y trazabilidad de cada lote desde la materia prima hasta el despacho. El cumplimiento no lo tercerizamos."
        ficha={[
          ["Buenas prácticas", "Operamos bajo lineamientos de manufactura y almacenamiento. La certificación ante Digemid está en gestión"],
          ["Asuntos regulatorios", "Área propia, dentro de la misma instalación"],
          ["Control de calidad", "Físico-químico y microbiológico, en planta"],
          ["Trazabilidad", "Por lote, desde la materia prima hasta el despacho"],
          ["Liberación", "Firmada por Control de Calidad antes de cada salida"],
        ]}
      />

      <Seccion>
        <Clausula n="01" titulo="Buenas prácticas" />
        <div className="grid gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[13ch] text-verde">
            Cómo trabajamos en planta
          </h2>
          <div>
            <p className="mb-8 max-w-[52ch] text-[15.5px] leading-relaxed text-acero">
              La planta opera bajo lineamientos de buenas prácticas de manufactura y
              almacenamiento: áreas diferenciadas, control en proceso y registro de cada
              etapa. La certificación correspondiente ante Digemid se encuentra
              actualmente en gestión.
            </p>
            <Specs
              filas={[
                ["Áreas", "Diferenciadas, con esclusas entre zonas de distinto nivel de limpieza"],
                ["Trazabilidad", "Por lote, desde la materia prima hasta el despacho"],
                ["Liberación", "Firmada por Control de Calidad antes de cada salida"],
                ["Almacén", "Control de rotación y vencimientos de producto terminado"],
              ]}
            />
          </div>
        </div>
      </Seccion>

      <PlacaAncha clave="incubadoras" />

      <Seccion tono="nube">
        <Clausula n="02" titulo="Asuntos regulatorios" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[14ch] text-verde">
            Tu registro sanitario, gestionado adentro
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            Muchos laboratorios derivan el trámite a un consultor externo. Nosotros
            tenemos el área dentro de la planta, junto a quienes formulan y a quienes
            fabrican.
          </p>
        </div>
        <Indice entradas={REGULATORIO} />
      </Seccion>

      <Seccion>
        <Clausula n="03" titulo="Control de calidad" />
        <h2 className="aparece titular-medio mb-10 max-w-[16ch] text-verde">
          Dos laboratorios dentro del laboratorio
        </h2>
        <Specs
          filas={[
            [
              "Físico-químico",
              "Verificación de pH, viscosidad, densidad, peso y características organolépticas en materia prima, producto en proceso y producto terminado.",
            ],
            [
              "Microbiológico",
              "Área de siembra, incubadoras, repique de cepas y lavado de materiales, para verificar que cada lote cumple los límites microbiológicos establecidos.",
            ],
            [
              "Ética y conducta",
              "Operamos bajo un Código de Conducta interno que rige la relación con clientes, proveedores y colaboradores. Disponible a solicitud de socios comerciales.",
            ],
          ]}
        />
      </Seccion>

      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="El diferencial difícil de imitar">
            El cumplimiento no se subcontrata.
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Tener el área regulatoria en la misma planta que la formulación acorta el
            tiempo al mercado y hace que una sola empresa responda por el producto.
          </p>
        </div>
      </Seccion>

      <Cierre
        titulo="Fabrica con respaldo técnico"
        texto="Si tu proyecto necesita registro ante Digemid, lo resolvemos dentro del mismo contrato."
      />
    </>
  );
}
