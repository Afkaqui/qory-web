import type { Metadata } from "next";
import { Band, BandHead, Cta, Grid, PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué fabricamos",
  description:
    "Categorías y formatos que fabricamos: tratamiento facial, cuidado capilar, cuidado corporal e higiene doméstica, con activos de la biodiversidad peruana.",
  alternates: { canonical: "/productos" },
};

const FACIAL: [string, string, string][] = [
  [
    "Limpieza",
    "Leche limpiadora, gel limpiador facial, jabón exfoliante en gel",
    "150 g · 220 g · 240 mL",
  ],
  ["Tónicos y brumas", "Loción tonificante, bruma facial", "240 mL"],
  [
    "Cremas y geles crema",
    "Gel crema antiedad, crema con vitamina C, hidratantes",
    "50 g",
  ],
  [
    "Sérums",
    "Sérum de ácido hialurónico, sérum hidratante epidérmico",
    "30 mL",
  ],
  [
    "Exfoliantes y mascarillas",
    "Exfoliante con scrub de bambú, mascarilla peel-off",
    "150 g",
  ],
];

const OTRAS = [
  {
    eyebrow: "Capilar",
    titulo: "Cuidado del cabello",
    texto:
      "Shampoos, acondicionadores y tratamientos, incluyendo líneas para salón profesional y formatos de reventa.",
  },
  {
    eyebrow: "Corporal",
    titulo: "Cuidado corporal",
    texto:
      "Cremas hidratantes y de masaje, geles de baño, splash perfumados y jabones. Trabajamos familias completas de fragancias: manzanilla, frutos rojos, brisa marina, hierba luisa, maracuyá, lavanda, coco y cítrico.",
  },
  {
    eyebrow: "Hogar",
    titulo: "Higiene doméstica",
    texto:
      "Limpiadores, lavavajillas y productos de cuidado del hogar, en línea separada de la cosmética.",
  },
];

const ACTIVOS = [
  "Sacha inchi",
  "Maca",
  "Hierba luisa",
  "Avena",
  "Caléndula",
  "Scrub de bambú",
  "Ácido hialurónico",
  "Argireline",
  "Vitamina C",
  "Vitamina E",
  "Alantoína",
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Qué fabricamos"
        titulo="Categorías y formatos"
        texto="Fabricamos productos de tratamiento facial, cuidado capilar, cuidado corporal e higiene doméstica. Si tu producto entra aquí, podemos hacerlo bajo tu marca."
      />

      <Band tono="blanco">
        <BandHead
          eyebrow="Tratamiento facial"
          titulo="Facial"
          texto="La categoría con mayor desarrollo en nuestro portafolio, tanto en maquila como en marcas propias."
        />
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th scope="col">Formato</th>
                <th scope="col">Ejemplos de producto</th>
                <th scope="col">Presentaciones habituales</th>
              </tr>
            </thead>
            <tbody>
              {FACIAL.map(([formato, ejemplos, presentaciones]) => (
                <tr key={formato}>
                  <td>
                    <strong>{formato}</strong>
                  </td>
                  <td>{ejemplos}</td>
                  <td>{presentaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Band>

      <Band tono="nube">
        <Grid cols={3}>
          {OTRAS.map((o) => (
            <article key={o.titulo} className="card card-viva">
              <span className="eyebrow">{o.eyebrow}</span>
              <h3>{o.titulo}</h3>
              <p>{o.texto}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="blanco">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow">Formulación</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">Activos que trabajamos</h2>
            <p className="mt-4 text-acero">
              Combinamos activos de uso internacional —ácido hialurónico, argireline,
              vitaminas C y E, alantoína— con ingredientes de la biodiversidad peruana,
              que además reducen la exposición al tipo de cambio en la cadena de
              suministro.
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {ACTIVOS.map((a) => (
                <li
                  key={a}
                  className="rounded-[2px] border border-linea px-2.5 py-1 text-[12.5px] text-acero"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="aviso">
            <span className="aviso-tag">Nota técnica</span>
            Las presentaciones listadas son las de uso más frecuente en nuestras líneas;
            el formato y el envase se definen en el desarrollo de cada proyecto.{" "}
            <strong>
              Toda afirmación de eficacia cosmética se valida con la Dirección Técnica
            </strong>{" "}
            antes de imprimirse en etiqueta o publicidad.
          </div>
        </div>
      </Band>

      <Cta
        titulo="¿Buscas un formato que no está en la lista?"
        texto="Escríbenos con el concepto. Nuestra área de I+D evalúa si es fabricable en nuestras líneas."
      />
    </>
  );
}
