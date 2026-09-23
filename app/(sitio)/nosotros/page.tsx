import type { Metadata } from "next";
import {
  Cierre,
  Clausula,
  Declaracion,
  Indice,
  PlacaAncha,
  Portadilla,
  Seccion,
  Specs,
} from "@/components/hoja";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Qory Laboratorios: empresa peruana fundada en 2017, dedicada al desarrollo, fabricación y comercialización de productos cosméticos. Misión, visión, valores y organización.",
  alternates: { canonical: "/nosotros" },
};

const VALORES = [
  { titulo: "Calidad", detalle: "Cumplimos estándares técnicos y normativos en cada proceso y cada producto." },
  { titulo: "Innovación", detalle: "Impulsamos el desarrollo continuo de fórmulas, procesos y soluciones." },
  { titulo: "Compromiso", detalle: "Cumplimos los acuerdos asumidos con clientes, colaboradores y aliados." },
  { titulo: "Transparencia", detalle: "Actuamos con honestidad y responsabilidad en nuestras operaciones." },
  { titulo: "Trabajo colaborativo", detalle: "Construimos relaciones sólidas con nuestros grupos de interés." },
];

const AREAS: [string, string][] = [
  ["Gerencia General", "Dirección estratégica y relación con socios comerciales."],
  ["Dirección Técnica", "Buenas prácticas, liberación de lotes y asuntos regulatorios."],
  ["Producción", "Fabricación, envasado y acondicionado según programa."],
  ["Control de Calidad", "Análisis físico-químico y microbiológico de insumos, proceso y producto terminado."],
  ["Investigación y Desarrollo", "Formulación, muestras, escalamiento y mejora de fórmulas."],
  ["Asuntos Regulatorios", "Expedientes técnicos y notificaciones sanitarias ante Digemid."],
  ["Ventas", "Atención comercial a empresas, distribuidores y canal farmacia."],
  ["Administración y Finanzas", "Compras, almacenes, contabilidad y soporte a la operación."],
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 01 · Perfil de la empresa"
        titulo={
          <>
            Un laboratorio que creció haciendo el trabajo de otros
          </>
        }
        lede="Qory Laboratorios empezó en 2017 haciendo maquila y desarrollo de fórmulas para terceros. Hoy fabrica para empresas de todo el país y tiene marcas propias en farmacias, importadoras y salones."
        ficha={[
          ["Razón social", EMPRESA.razon],
          ["Inicio de actividades", "26 de enero de 2017"],
          ["Actividad", "Desarrollo, fabricación, envasado y acondicionado de productos cosméticos"],
          ["Domicilio", `${EMPRESA.direccion}, ${EMPRESA.distrito}`],
        ]}
      />

      <PlacaAncha clave="fabricacion1" />

      <Seccion>
        <Clausula n="01" titulo="Historia" />
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[13ch] text-verde">De la maquila a la marca propia</h2>
          <div className="max-w-[54ch] space-y-5 text-[15.5px] leading-relaxed text-acero">
            <p>
              Qory Laboratorios S.A.C. es una empresa peruana fundada en 2017, dedicada
              al desarrollo, fabricación y comercialización de productos cosméticos.
              Inició sus operaciones brindando servicios de maquila y desarrollo de
              fórmulas para terceros, incorporando progresivamente líneas propias y
              ampliando su portafolio hacia productos faciales, capilares y corporales.
            </p>
            <p>
              Durante su crecimiento, la empresa fortaleció sus capacidades técnicas,
              regulatorias y operativas, consolidando relaciones comerciales con
              clientes empresariales y expandiendo su presencia en diversas regiones
              del país, con un enfoque constante en calidad, innovación y atención
              personalizada.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion tono="nube">
        <Clausula n="02" titulo="Misión y visión" />
        <Specs
          filas={[
            [
              "Misión",
              "Desarrollar, fabricar y comercializar productos cosméticos de alta calidad, brindando soluciones integrales a nuestros clientes desde la formulación hasta la comercialización, cumpliendo estándares técnicos, regulatorios y de calidad, y contribuyendo al bienestar de los consumidores.",
            ],
            [
              "Visión",
              "Ser una empresa peruana referente en el desarrollo y fabricación de productos cosméticos, reconocida por su innovación, confiabilidad y compromiso con la calidad, consolidando nuestra presencia a nivel nacional y expandiendo progresivamente nuestras operaciones.",
            ],
          ]}
        />
      </Seccion>

      <Seccion>
        <Clausula n="03" titulo="Valores" />
        <h2 className="aparece titular-medio mb-10 max-w-[15ch] text-verde">
          Cinco cosas que no negociamos
        </h2>
        <Indice entradas={VALORES} />
      </Seccion>

      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="Presencia comercial">
            Una planta, siete destinos.
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Lima, Arequipa, Cusco, La Libertad, Chiclayo, Trujillo y La Merced. Atendemos
            cadenas de farmacias, importadoras, salones de belleza profesionales y
            venta directa.
          </p>
        </div>
      </Seccion>

      <Seccion>
        <Clausula n="04" titulo="Organización" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[14ch] text-verde">
            Quién responde por cada etapa
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            La empresa está dirigida por un equipo con experiencia en el sector
            cosmético, en gestión operativa, administrativa, comercial y técnica.
          </p>
        </div>
        <Specs filas={AREAS} />
      </Seccion>

      <Cierre
        titulo="Trabajemos juntos"
        texto="Si buscas un laboratorio que responda por todo el proceso, empecemos por una conversación técnica."
      />
    </>
  );
}
