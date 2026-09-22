import type { Metadata } from "next";
import { Cierre, Clausula, Declaracion, Portadilla, Seccion, Specs } from "@/components/hoja";

export const metadata: Metadata = {
  title: "Nuestras marcas",
  description:
    "Daya, Activen, Kibo, Kuyaway, Eco Forest y Frotasol: marcas registradas ante INDECOPI en la clase 03, desarrolladas y fabricadas en nuestro laboratorio.",
  alternates: { canonical: "/marcas" },
};

const DESTACADAS = [
  {
    nombre: "Daya",
    territorio: "Facial · Corporal · Capilar",
    texto:
      "Nuestra línea de mayor recorrido. Tratamiento facial completo —limpieza, tónicos, sérums, cremas antiedad, exfoliantes y mascarillas— junto a cuidado corporal: cremas de masaje, geles de baño y splash perfumados en ocho fragancias.",
    ficha: [
      ["Categorías", "Facial, corporal y capilar"],
      ["Activos", "Ácido hialurónico · argirelina · vitamina C · hierba luisa"],
      ["Formatos", "30 mL – 430 mL · 50 g – 220 g"],
      ["Canal", "Importadoras, tiendas y venta directa"],
    ] as [string, string][],
  },
  {
    nombre: "Activen",
    territorio: "Tratamiento facial · Uso profesional",
    texto:
      "Línea orientada al mercado profesional de la belleza: jabón exfoliante con scrub de bambú, gel crema antiedad con péptidos de argirelina y ácido hialurónico, fórmulas no grasas y no comedogénicas.",
    ficha: [
      ["Categorías", "Tratamiento facial y dermocosmética"],
      ["Activos", "Scrub de bambú · ácido hialurónico · argirelina"],
      ["Claims", "No graso · no comedogénico · efecto tensor"],
      ["Canal", "Cosmiatras, estudiantes, spas y salones de belleza"],
    ] as [string, string][],
  },
];

const PORTAFOLIO: [string, string][] = [
  ["Daya", "Tratamiento facial, corporal y capilar"],
  ["Activen", "Tratamiento facial y dermocosmética"],
  ["Kuyaway", "Cuidado personal e higiene"],
  ["Kibo", "Marca registrada del portafolio"],
  ["Eco Forest", "Cosméticos y preparaciones de tocador"],
  ["Frotasol", "Cosméticos y preparaciones de tocador"],
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 05 · Marcas propias"
        titulo="Marcas que nacieron en este laboratorio"
        lede="Seis marcas registradas ante INDECOPI en la clase 03. Son la prueba de que sabemos llevar un producto desde la fórmula hasta el punto de venta."
        ficha={[
          ["Registro", "INDECOPI · Dirección de Signos Distintivos"],
          ["Clase", "03 de la Clasificación Internacional"],
          ["Marcas", "Daya · Activen · Kibo · Kuyaway · Eco Forest · Frotasol"],
          ["Desarrollo", "Fórmula, empaque, registro sanitario y producción, todo interno"],
        ]}
      />

      {DESTACADAS.map((m, i) => (
        <Seccion key={m.nombre} tono={i % 2 === 0 ? "papel" : "nube"}>
          <Clausula n={`0${i + 1}`} titulo={m.territorio} />
          <div className="grid gap-9 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <h2 className="declaracion text-verde">{m.nombre}</h2>
              <p className="mt-7 max-w-[44ch] text-[15.5px] leading-relaxed text-acero">
                {m.texto}
              </p>
            </div>
            <Specs filas={m.ficha} />
          </div>
        </Seccion>
      ))}

      <Seccion>
        <Clausula n="03" titulo="Portafolio registrado" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[13ch] text-verde">
            Las seis, en la clase 03
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            Productos cosméticos, preparaciones de tocador y perfumería.
          </p>
        </div>
        <Specs filas={PORTAFOLIO} />
      </Seccion>

      <Seccion tono="tinta" compacta>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <Declaracion oscuro pie="Distribuidores">
            ¿Te interesa comercializar nuestras marcas?
          </Declaracion>
          <p className="max-w-[44ch] text-[15.5px] text-[#b0b09c]">
            Trabajamos con importadoras, tiendas, spas y salones de belleza
            profesionales. Escríbenos y te enviamos lista de precios y condiciones por
            canal.
          </p>
        </div>
      </Seccion>

      <Cierre
        titulo="Distribuye nuestras marcas"
        texto="Cuéntanos tu canal y tu cobertura, y armamos una propuesta comercial a tu medida."
        boton="Contactar a Ventas"
      />
    </>
  );
}
