import type { Metadata } from "next";
import { Band, BandHead, Cta, Grid, PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Nuestras marcas",
  description:
    "Daya, Activen, Kibo, Kuyaway, Eco Forest y Frotasol: marcas registradas ante INDECOPI en la clase 03, desarrolladas y fabricadas en nuestro laboratorio.",
  alternates: { canonical: "/marcas" },
};

const DESTACADAS = [
  {
    nombre: "Daya",
    meta: "Facial · Corporal · Capilar",
    texto:
      "Nuestra línea de mayor recorrido. Tratamiento facial completo —limpieza, tónicos, sérums, cremas antiedad, exfoliantes y mascarillas— junto a cuidado corporal: cremas de masaje, geles de baño y splash perfumados en ocho fragancias.",
    chips: ["Ácido hialurónico", "Vitamina C", "Argireline", "Hierba luisa"],
    canal: "Canal: importadoras, tiendas y venta directa.",
  },
  {
    nombre: "Activen",
    meta: "Tratamiento facial · Dermocosmética",
    texto:
      "Línea enfocada en tratamiento facial para canal farmacia y boticas: jabón exfoliante con scrub de bambú, gel crema antiedad con péptidos de argireline y ácido hialurónico, fórmulas no grasas y no comedogénicas.",
    chips: ["Scrub de bambú", "Efecto tensor", "No comedogénico"],
    canal: "Canal: cadenas de farmacias y boticas.",
  },
];

const PORTAFOLIO: [string, string, string][] = [
  ["Daya", "", "Tratamiento facial, corporal y capilar"],
  ["Activen", "", "Tratamiento facial y dermocosmética"],
  ["Kibo", "Cuidado y limpieza natural", "Higiene y cuidado del hogar"],
  ["Kuyaway", "", "Cuidado personal e higiene"],
  ["Eco Forest", "", "Cosméticos y preparaciones de tocador"],
  ["Frotasol", "", "Cosméticos y preparaciones de tocador"],
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Nuestras marcas"
        titulo="Marcas que nacieron en este laboratorio"
        texto="Seis marcas registradas ante INDECOPI en la clase 03. Son la prueba de que sabemos llevar un producto desde la fórmula hasta el punto de venta."
      />

      <Band tono="blanco">
        <Grid cols={2}>
          {DESTACADAS.map((m) => (
            <article
              key={m.nombre}
              className="grid content-start gap-3.5 rounded-[3px] border border-linea bg-hueso p-6.5"
            >
              <h2 className="font-serif text-[clamp(26px,3.6vw,36px)] leading-none font-medium tracking-[-0.02em] text-verde">
                {m.nombre}
              </h2>
              <p className="font-mono text-[10.5px] tracking-[0.13em] text-acero-claro uppercase">
                {m.meta}
              </p>
              <p className="text-[15px] text-acero">{m.texto}</p>
              <ul className="flex flex-wrap gap-1.5">
                {m.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-[2px] border border-linea px-2.5 py-1 text-[12.5px] text-acero"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px] text-acero-claro">{m.canal}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="nube">
        <BandHead
          eyebrow="Portafolio de marcas"
          titulo="Registradas ante INDECOPI"
          texto="Todas en la clase 03 de la Clasificación Internacional: productos cosméticos, preparaciones de tocador, perfumería y preparados de limpieza."
        />
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th scope="col">Marca</th>
                <th scope="col">Territorio</th>
                <th scope="col">Clase</th>
              </tr>
            </thead>
            <tbody>
              {PORTAFOLIO.map(([marca, sub, territorio]) => (
                <tr key={marca}>
                  <td>
                    <strong>{marca}</strong>
                    {sub && <span className="sub">{sub}</span>}
                  </td>
                  <td>{territorio}</td>
                  <td>03</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="aviso mt-5">
          <span className="aviso-tag">Distribuidores</span>
          <strong>¿Te interesa distribuir nuestras marcas?</strong> Trabajamos con
          cadenas de farmacias, importadoras, tiendas y salones de belleza
          profesionales. Escríbenos y te enviamos lista de precios y condiciones por
          canal.
        </div>
      </Band>

      <Cta
        titulo="Distribuye nuestras marcas"
        texto="Cuéntanos tu canal y tu cobertura, y armamos una propuesta comercial a tu medida."
        boton="Contactar a Ventas"
      />
    </>
  );
}
