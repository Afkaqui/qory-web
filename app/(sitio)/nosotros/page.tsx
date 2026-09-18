import type { Metadata } from "next";
import { Band, BandHead, Cta, Galeria, Grid, PageHead } from "@/components/ui";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Qory Laboratorios: empresa peruana fundada en 2017, dedicada al desarrollo, fabricación y comercialización de productos cosméticos. Misión, visión, valores y organización.",
  alternates: { canonical: "/nosotros" },
};

const VALORES = [
  {
    n: "01",
    titulo: "Calidad",
    texto: "Cumplimos estándares técnicos y normativos en cada proceso y cada producto.",
  },
  {
    n: "02",
    titulo: "Innovación",
    texto: "Impulsamos el desarrollo continuo de fórmulas, procesos y soluciones.",
  },
  {
    n: "03",
    titulo: "Compromiso",
    texto: "Cumplimos los acuerdos asumidos con clientes, colaboradores y aliados.",
  },
  {
    n: "04",
    titulo: "Transparencia",
    texto: "Actuamos con honestidad y responsabilidad en nuestras operaciones.",
  },
  {
    n: "05",
    titulo: "Trabajo colaborativo",
    texto: "Construimos relaciones sólidas con nuestros grupos de interés.",
  },
];

const AREAS: [string, string][] = [
  ["Gerencia General", "Dirección estratégica y relación con socios comerciales."],
  [
    "Dirección Técnica y Aseguramiento de Calidad",
    "Cumplimiento de buenas prácticas, liberación de lotes y asuntos regulatorios.",
  ],
  ["Jefatura de Producción", "Fabricación, envasado y acondicionado según programa."],
  [
    "Control de Calidad",
    "Análisis físico-químico y microbiológico de insumos, proceso y producto terminado.",
  ],
  [
    "Investigación y Desarrollo",
    "Formulación, muestras, escalamiento y mejora de fórmulas.",
  ],
  [
    "Asuntos Regulatorios",
    "Expedientes técnicos y notificaciones sanitarias ante Digemid.",
  ],
  [
    "Jefatura de Ventas",
    "Atención comercial a empresas, distribuidores y canal farmacia.",
  ],
  [
    "Administración y Finanzas",
    "Compras, almacenes, contabilidad y soporte a la operación.",
  ],
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Nosotros"
        titulo="Un laboratorio peruano que creció haciendo el trabajo de otros"
        texto="Qory Laboratorios empezó en 2017 haciendo maquila y desarrollo de fórmulas para terceros. Hoy fabrica para empresas de todo el país y tiene marcas propias en farmacias, importadoras y salones."
      />

      <Band tono="blanco">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow">Historia</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">
              De la maquila a la marca propia
            </h2>
            <p className="mt-4 text-acero">
              Qory Laboratorios S.A.C. es una empresa peruana fundada en 2017, dedicada
              al desarrollo, fabricación y comercialización de productos cosméticos.
              Inició sus operaciones brindando servicios de maquila y desarrollo de
              fórmulas para terceros, incorporando progresivamente líneas propias y
              ampliando su portafolio hacia productos faciales, capilares y corporales.
            </p>
            <p className="mt-3.5 text-acero">
              Durante su crecimiento, la empresa fortaleció sus capacidades técnicas,
              regulatorias y operativas, consolidando relaciones comerciales con
              clientes empresariales y expandiendo su presencia en diversas regiones del
              país, con un enfoque constante en calidad, innovación y atención
              personalizada.
            </p>
          </div>
          <Galeria cols={1} claves={["fabricacion1"]} />
        </div>
      </Band>

      <Band tono="nube">
        <Grid cols={2}>
          <article className="card card-viva">
            <span className="eyebrow">Misión</span>
            <p className="text-base">
              Desarrollar, fabricar y comercializar productos cosméticos de alta
              calidad, brindando soluciones integrales a nuestros clientes desde la
              formulación hasta la comercialización, cumpliendo estándares técnicos,
              regulatorios y de calidad, y contribuyendo al bienestar de los
              consumidores.
            </p>
          </article>
          <article className="card card-viva">
            <span className="eyebrow">Visión</span>
            <p className="text-base">
              Ser una empresa peruana referente en el desarrollo y fabricación de
              productos cosméticos, reconocida por su innovación, confiabilidad y
              compromiso con la calidad, consolidando nuestra presencia a nivel nacional
              y expandiendo progresivamente nuestras operaciones.
            </p>
          </article>
        </Grid>
      </Band>

      <Band tono="blanco">
        <BandHead eyebrow="Valores" titulo="Cinco cosas que no negociamos" />
        <Grid cols={3}>
          {VALORES.map((v) => (
            <article key={v.n} className="card card-viva bg-hueso">
              <div className="card-n">{v.n}</div>
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="nube">
        <BandHead
          eyebrow="Organización"
          titulo="Quién responde por cada etapa"
          texto="La empresa está dirigida por un equipo con experiencia en el sector cosmético, en gestión operativa, administrativa, comercial y técnica."
        />
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th scope="col">Área</th>
                <th scope="col">De qué responde</th>
              </tr>
            </thead>
            <tbody>
              {AREAS.map(([area, responsabilidad]) => (
                <tr key={area}>
                  <td>
                    <strong>{area}</strong>
                  </td>
                  <td>{responsabilidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Band>

      <Band tono="blanco">
        <BandHead
          eyebrow="Alcance"
          titulo="Dónde estamos presentes"
          texto="Presencia comercial en Lima, Arequipa, La Libertad, Chiclayo, Trujillo y La Merced, atendiendo cadenas de farmacias, importadoras, salones de belleza profesionales y venta directa."
        />
        <div className="aviso">
          <span className="aviso-tag">Planta</span>
          <strong>
            {EMPRESA.direccion} — {EMPRESA.distrito}.
          </strong>{" "}
          Producción, investigación y desarrollo, control de calidad, asuntos
          regulatorios y almacenes operan en la misma instalación.
        </div>
      </Band>

      <Cta
        titulo="Trabajemos juntos"
        texto="Si buscas un laboratorio que responda por todo el proceso, empecemos por una conversación técnica."
      />
    </>
  );
}
