import type { Metadata } from "next";
import { Cierre, Clausula, Declaracion, Portadilla, Seccion, Specs } from "@/components/hoja";

export const metadata: Metadata = {
  title: "Qué fabricamos",
  description:
    "Categorías y formatos que fabricamos: tratamiento facial, cuidado capilar y cuidado corporal, con activos de la biodiversidad peruana.",
  alternates: { canonical: "/productos" },
};

type Linea = { formato: string; ejemplos: string; presentacion: string };

const FACIAL: Linea[] = [
  { formato: "Limpieza", ejemplos: "Leche limpiadora, gel limpiador facial, jabón exfoliante en gel", presentacion: "150 g · 220 g · 240 mL" },
  { formato: "Tónicos y brumas", ejemplos: "Loción tonificante, bruma facial", presentacion: "240 mL" },
  { formato: "Cremas y geles crema", ejemplos: "Gel crema antiedad, crema con vitamina C, hidratantes", presentacion: "50 g" },
  { formato: "Sérums", ejemplos: "Sérum de ácido hialurónico, sérum hidratante epidérmico", presentacion: "30 mL" },
  { formato: "Exfoliantes y mascarillas", ejemplos: "Exfoliante con scrub de bambú, mascarilla peel-off", presentacion: "150 g" },
];

const CORPORAL: Linea[] = [
  { formato: "Cremas", ejemplos: "Crema hidratante natural, crema para masajes con hierba luisa", presentacion: "150 g" },
  { formato: "Baño", ejemplos: "Gel de baño con pH equilibrado", presentacion: "430 mL" },
  { formato: "Splash", ejemplos: "Splash gel perfumado, humectante y no comedogénico", presentacion: "240 mL" },
];

const OTRAS: [string, string][] = [
  ["Cuidado capilar", "Shampoos, acondicionadores y tratamientos, en formatos de reventa y de salón profesional."],
];

const FRAGANCIAS = [
  "Flor de manzanilla",
  "Frutos rojos",
  "Brisa marina",
  "Hierba luisa",
  "Maracuyá",
  "Lavanda",
  "Violeta",
  "Coco",
];

const ACTIVOS: [string, string][] = [
  ["De origen peruano", "Sacha inchi · maca · hierba luisa · avena · caléndula · scrub de bambú"],
  ["De uso internacional", "Ácido hialurónico · argirelina · vitamina C · vitamina E · alantoína"],
];

function TablaLinea({ filas }: { filas: Linea[] }) {
  return (
    <dl className="spec">
      {filas.map((f) => (
        <div key={f.formato} className="sm:!grid-cols-[148px_minmax(0,1fr)_auto]">
          <dt>{f.formato}</dt>
          <dd>{f.ejemplos}</dd>
          <dd className="dato whitespace-nowrap sm:text-right">{f.presentacion}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 04 · Portafolio"
        titulo="Categorías y formatos"
        lede="Fabricamos tratamiento facial, cuidado capilar y cuidado corporal. Si tu producto entra aquí, podemos hacerlo bajo tu marca."
        ficha={[
          ["Categorías", "Tratamiento facial · Cuidado capilar · Cuidado corporal"],
          ["Rango de formatos", "30 mL – 430 mL · 50 g – 220 g"],
          ["Clase", "03 de la Clasificación Internacional"],
          ["Validación", "Toda afirmación de eficacia la revisa Dirección Técnica antes de imprimirse"],
        ]}
      />

      <Seccion>
        <Clausula n="01" titulo="Tratamiento facial" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[10ch] text-verde">Facial</h2>
          <p className="max-w-[46ch] self-end text-[15.5px] text-acero">
            La categoría con mayor desarrollo en nuestro portafolio, tanto en maquila
            como en marcas propias.
          </p>
        </div>
        <TablaLinea filas={FACIAL} />
      </Seccion>

      <Seccion tono="nube">
        <Clausula n="02" titulo="Cuidado corporal" />
        <h2 className="aparece titular-medio mb-10 max-w-[10ch] text-verde">Corporal</h2>
        <TablaLinea filas={CORPORAL} />

        <div className="mt-12">
          <span className="rotulo rotulo-verde">Familia de fragancias</span>
          <ul className="regla mt-4 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {FRAGANCIAS.map((f, i) => (
              <li key={f} className="regla-fina flex items-baseline gap-3 py-3 text-[14.5px] text-acero">
                <span className="dato text-acero-claro">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Seccion>

      <Seccion>
        <Clausula n="03" titulo="Otras líneas" />
        <Specs filas={OTRAS} />
      </Seccion>

      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="Formulación">
            La biodiversidad peruana como decisión técnica, no como etiqueta.
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Incorporar activos locales reduce a la vez el impacto ambiental y la
            exposición al tipo de cambio en la cadena de suministro.
          </p>
        </div>
      </Seccion>

      <Seccion>
        <Clausula n="04" titulo="Activos que trabajamos" />
        <Specs filas={ACTIVOS} />
        <p className="regla mt-10 max-w-[64ch] pt-5 text-[14.5px] text-acero-claro">
          Las presentaciones listadas son las de uso más frecuente en nuestras líneas;
          el formato y el envase se definen en el desarrollo de cada proyecto. Nombramos
          el activo, nunca su concentración.
        </p>
      </Seccion>

      <Cierre
        titulo="¿Buscas un formato que no está en la lista?"
        texto="Escríbenos con el concepto. Nuestra área de I+D evalúa si es fabricable en nuestras líneas."
      />
    </>
  );
}
