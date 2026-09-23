import Link from "next/link";
import {
  Cierre,
  Clausula,
  Declaracion,
  Indice,
  PlacaAncha,
  Seccion,
  Specs,
} from "@/components/hoja";
import { EMPRESA, PASOS } from "@/lib/empresa";

const SERVICIOS = [
  {
    titulo: "Maquila profesional",
    detalle:
      "Fabricamos tu producto bajo tu marca, con tu fórmula o con la nuestra. Control en proceso y trazabilidad por lote en cada etapa.",
    meta: "B2B",
    href: "/maquila",
  },
  {
    titulo: "Desarrollo de marca privada",
    detalle:
      "Del concepto a la góndola: fórmula, empaque, notificación sanitaria y producción. Tú te concentras en vender.",
    meta: "Llave en mano",
    href: "/maquila#marca-privada",
  },
  {
    titulo: "Marcas propias",
    detalle:
      "Daya, de cuidado facial, capilar y corporal. Activen, para el mercado profesional de la belleza.",
    meta: "B2C",
    href: "/marcas",
  },
];

const CATEGORIAS = [
  {
    titulo: "Tratamiento facial",
    detalle: "Leches y geles limpiadores, tónicos, brumas, sérums, geles crema, exfoliantes y mascarillas.",
    meta: "30 mL – 240 mL",
  },
  {
    titulo: "Cuidado capilar",
    detalle: "Shampoos, acondicionadores y tratamientos, en formatos de reventa y de salón profesional.",
    meta: "Línea salón",
  },
  {
    titulo: "Cuidado corporal",
    detalle: "Cremas hidratantes y de masaje, geles de baño, splash perfumados y jabones en gel.",
    meta: "150 g – 430 mL",
  },
];

const MARCAS = [
  { titulo: "Daya", detalle: "Tratamiento facial, corporal y capilar. Ocho fragancias en baño y splash.", meta: "Clase 03" },
  { titulo: "Activen", detalle: "Dermocosmética facial para canal farmacia y boticas.", meta: "Clase 03" },
    { titulo: "Kuyaway", detalle: "Cuidado personal e higiene.", meta: "Clase 03" },
  { titulo: "Kibo", detalle: "Marca registrada del portafolio.", meta: "Clase 03" },
];

export default function Page() {
  return (
    <>
      {/* ========================================================= portada */}
      <section className="bg-hueso pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="hoja">
          <div className="regla-firme alza flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-3">
            <span className="rotulo rotulo-verde">Laboratorio cosmético · Lima, Perú</span>
            <span className="dato">
              Maquila · Marca privada · Marcas propias · Desde {EMPRESA.desde}
            </span>
          </div>

          <h1 className="titular mt-10 max-w-[11ch] text-verde lg:mt-14">
            <span className="linea">
              <span>De la fórmula</span>
            </span>
            <span className="linea">
              <span>
                al anaquel<span className="text-hoja">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <p className="alza alza-2 max-w-[46ch] text-[clamp(17px,2vw,22px)] leading-[1.45] text-acero">
              Desarrollamos, registramos y fabricamos productos cosméticos bajo tu
              marca. Tú traes la idea y el mercado; nosotros ponemos la química, el
              expediente sanitario y la línea de producción.
            </p>

            <div>
              <Specs
                filas={[
                  ["Actividad", "Desarrollo, fabricación, envasado y acondicionado de productos cosméticos"],
                  ["Buenas prácticas", "Manufactura y almacenamiento bajo lineamientos BPM. Certificación en gestión ante Digemid"],
                  ["Planta", "San Juan de Lurigancho, Lima. Producción, I+D, control de calidad, asuntos regulatorios y almacenes"],
                  ["Alcance", "Lima · Arequipa · La Libertad · Chiclayo · Trujillo · La Merced"],
                  ["Marcas propias", "Seis, registradas en la clase 03"],
                ]}
              />
              <div className="alza alza-4 mt-8 flex flex-wrap gap-3">
                <Link className="accion accion-llena" href="/contacto">
                  Cotiza tu proyecto
                </Link>
                <Link className="accion" href="/maquila">
                  Cómo trabajamos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlacaAncha clave="microbiologia" prioridad />

      {/* ======================================================= servicios */}
      <Seccion>
        <Clausula n="01" titulo="Servicios" />
        <h2 className="aparece titular-medio mb-10 max-w-[18ch] text-verde">
          Un laboratorio, tres maneras de llegar al mercado
        </h2>
        <Indice entradas={SERVICIOS} />
      </Seccion>

      {/* ========================================================= proceso */}
      <Seccion tono="nube">
        <Clausula n="02" titulo="Proceso · Maquila 360°" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[16ch] text-verde">
            Cinco etapas, ninguna tercerizada
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            No coordinamos proveedores: hacemos el trabajo. Formulación, asuntos
            regulatorios, producción y control de calidad son áreas propias dentro de
            la misma planta.
          </p>
        </div>
        <ol className="indice">
          {PASOS.map((p, i) => (
            <li key={p.titulo}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{p.titulo}</span>
              <span className="d">{p.texto}</span>
              <span className="meta">Etapa {i + 1} de 5</span>
            </li>
          ))}
        </ol>
      </Seccion>

      {/* ===================================================== qué fabricamos */}
      <Seccion>
        <Clausula n="03" titulo="Qué fabricamos" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[16ch] text-verde">
            Tres categorías, decenas de formatos
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            Si tu producto entra en alguna de estas categorías, podemos fabricarlo. Si
            no estás seguro, escríbenos con el concepto y lo evaluamos.
          </p>
        </div>
        <Indice entradas={CATEGORIAS} />
        <p className="mt-9">
          <Link className="vinculo" href="/productos">
            Ver formatos, presentaciones y activos
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Seccion>

      {/* ==================================================== declaración */}
      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="Promesa al consumidor">
            Calidad de laboratorio a precio de todos los días.
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Daya y Activen nacieron en este mismo laboratorio: la fórmula, el registro,
            el empaque y la salida al canal. Es la mejor prueba de lo que podemos hacer
            con tu marca.
          </p>
        </div>
      </Seccion>

      {/* ========================================================== marcas */}
      <Seccion>
        <Clausula n="04" titulo="Marcas propias" />
        <h2 className="aparece titular-medio mb-10 max-w-[18ch] text-verde">
          Sabemos crear marcas porque creamos las nuestras
        </h2>
        <Indice entradas={MARCAS} />
        <p className="mt-9">
          <Link className="vinculo" href="/marcas">
            Conocer el portafolio completo
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Seccion>

      {/* ========================================================= respaldo */}
      <Seccion tono="nube">
        <Clausula n="05" titulo="Respaldo" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[14ch] text-verde">
            Lo que no se puede tercerizar
          </h2>
          <Specs
            filas={[
              ["Regulatorio", "Área de Asuntos Regulatorios propia. El expediente técnico y la notificación sanitaria no salen de la casa."],
              ["Calidad", "Control físico-químico y microbiológico en planta, con liberación de lote documentada."],
              ["I+D", "Formulación con activos peruanos: sacha inchi, maca, hierba luisa, avena y bambú."],
              ["Escala", "Producción por pedido y por stock, para lotes de lanzamiento y para volumen."],
              ["Ambiental", "Huella de carbono e hídrica medida conforme a ISO 14064-1 e ISO 14046."],
            ]}
          />
        </div>
      </Seccion>

      <Cierre
        titulo="¿Tienes un producto en mente?"
        texto="Cuéntanos la categoría, el volumen estimado y el plazo. Te respondemos con una evaluación técnica y una cotización."
      />
    </>
  );
}
