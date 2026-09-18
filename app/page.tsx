import Image from "next/image";
import Link from "next/link";
import { Cinta } from "@/components/cinta";
import { Contador } from "@/components/contador";
import { Band, BandHead, Cta, Declara, Galeria, Grid, Pasos } from "@/components/ui";

const SERVICIOS = [
  {
    n: "01 — B2B",
    titulo: "Maquila profesional",
    texto:
      "Fabricamos tu producto bajo tu marca, con tu fórmula o con la nuestra. Control de calidad y trazabilidad de lote en cada etapa.",
    href: "/maquila",
    enlace: "Ver el proceso",
  },
  {
    n: "02 — Llave en mano",
    titulo: "Desarrollo de marca privada",
    texto:
      "Desde el concepto hasta el producto en góndola: fórmula, empaque, registro sanitario y producción. Tú te concentras en vender.",
    href: "/maquila#marca-privada",
    enlace: "Cómo funciona",
  },
  {
    n: "03 — B2C",
    titulo: "Nuestras marcas",
    texto:
      "Daya y Activen: líneas propias de tratamiento facial, capilar y corporal, disponibles para farmacias, importadoras y salones.",
    href: "/marcas",
    enlace: "Conocer las marcas",
  },
];

const CATEGORIAS = [
  {
    titulo: "Tratamiento facial",
    texto:
      "Limpiadores, tónicos, sérums, geles crema, cremas hidratantes y antiedad, exfoliantes y mascarillas.",
  },
  {
    titulo: "Cuidado capilar",
    texto: "Shampoos, acondicionadores, tratamientos y líneas para salón profesional.",
  },
  {
    titulo: "Cuidado corporal",
    texto:
      "Cremas hidratantes y de masaje, geles de baño, splash perfumados y jabones en gel.",
  },
  {
    titulo: "Higiene doméstica",
    texto:
      "Limpiadores, lavavajillas y productos de cuidado del hogar de origen natural.",
  },
];

export default function Page() {
  return (
    <>
      {/* ------------------------------------------------------- portada */}
      <section className="relative overflow-hidden bg-verde-hondo py-14 sm:py-18 lg:py-24">
        {/* Halo de marca, muy tenue, detrás del titular */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-25 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, #8cc63f 0%, #4fa62f 45%, transparent 70%)",
          }}
        />
        <div className="wrap relative">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <span className="eyebrow eyebrow-luz filete entra">
                Laboratorio cosmético peruano · Desde 2017
              </span>
              <h1 className="entra entra-1 mt-4 text-[clamp(34px,6.2vw,66px)] tracking-[-0.03em] text-[#f1f5ee]">
                De la fórmula
                <br />
                al{" "}
                <em className="texto-marca font-serif font-normal not-italic">
                  anaquel
                </em>
                <span className="text-amarillo">.</span>
              </h1>
              <p className="entra entra-2 mt-5 max-w-[52ch] text-[clamp(16px,1.8vw,19px)] text-[#b8c2b4]">
                Desarrollamos, registramos y fabricamos productos cosméticos bajo tu
                marca. Tú traes la idea y el mercado; nosotros ponemos la química, el
                expediente sanitario y la línea de producción.
              </p>
              <div className="entra entra-3 mt-7 flex flex-wrap gap-3">
                <Link className="btn btn-hoja btn-brillo" href="/contacto">
                  Cotiza tu proyecto
                </Link>
                <Link className="btn btn-linea" href="/maquila">
                  Cómo trabajamos
                </Link>
              </div>
            </div>

            <div className="foto-viva entra entra-2 overflow-hidden rounded-[3px] border border-white/12">
              <Image
                src="/img/planta/control-de-calidad-microbiologia.jpg"
                alt="Laboratorio de control de calidad microbiológico de Qory Laboratorios"
                width={1400}
                height={1050}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-4/3 w-full object-cover contrast-105 saturate-85"
              />
            </div>
          </div>

          {/* Cifras: el servidor ya imprime el valor final; la cuenta solo lo anima */}
          <dl className="entra entra-4 mt-10 grid grid-cols-2 gap-5 border-t border-white/14 pt-5.5 lg:grid-cols-4">
            <div>
              <dt className="sr-only">Año de fundación</dt>
              <dd>
                <strong className="cifra block text-[clamp(24px,3.2vw,34px)] tracking-[-0.02em] text-hoja-luz">
                  2017
                </strong>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[0.12em] text-[#7e8d7c] uppercase">
                  Año de fundación
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Años fabricando</dt>
              <dd>
                <strong className="cifra block text-[clamp(24px,3.2vw,34px)] tracking-[-0.02em] text-hoja-luz">
                  <Contador hasta={9} sufijo=" años" />
                </strong>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[0.12em] text-[#7e8d7c] uppercase">
                  Fabricando en planta propia
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Marcas registradas</dt>
              <dd>
                <strong className="cifra block text-[clamp(24px,3.2vw,34px)] tracking-[-0.02em] text-hoja-luz">
                  <Contador hasta={6} />
                </strong>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[0.12em] text-[#7e8d7c] uppercase">
                  Marcas registradas
                </span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Certificación</dt>
              <dd>
                <strong className="cifra block text-[clamp(24px,3.2vw,34px)] tracking-[-0.02em] text-hoja-luz">
                  BPM
                </strong>
                <span className="mt-1 block font-mono text-[10.5px] tracking-[0.12em] text-[#7e8d7c] uppercase">
                  Certificación Digemid
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------------------------------------- cinta de lo que fabricamos */}
      <Cinta />

      {/* ------------------------------------------------------ servicios */}
      <Band tono="blanco">
        <BandHead
          eyebrow="Tres formas de trabajar con nosotros"
          titulo="Un laboratorio, tres maneras de llegar al mercado"
          texto="Atendemos a empresas que quieren fabricar, a emprendedores que quieren crear una marca, y a distribuidores que quieren vender las nuestras."
        />
        <Grid cols={3}>
          {SERVICIOS.map((s) => (
            <article
              key={s.titulo}
              className="card card-viva relative overflow-hidden bg-hueso pt-6.5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(100deg,#4fa62f 0%,#8cc63f 42%,#ebda01 100%)",
                }}
              />
              <div className="card-n">{s.n}</div>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              <div className="card-pie">
                <Link href={s.href}>{s.enlace}</Link>
              </div>
            </article>
          ))}
        </Grid>
      </Band>

      {/* --------------------------------------------------------- proceso */}
      <Band tono="verde">
        <BandHead
          oscuro
          eyebrow="Maquila 360°"
          titulo="Cinco etapas, un solo interlocutor"
          texto="No coordinamos proveedores: hacemos el trabajo. Formulación, asuntos regulatorios, producción y control de calidad son áreas propias dentro de la misma planta."
        />
        <Pasos oscuro />
      </Band>

      {/* ------------------------------------------------------- por qué */}
      <Band tono="blanco">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="revela">
            <span className="eyebrow filete">Por qué Qory</span>
            <h2 className="mt-3 text-[clamp(25px,3.6vw,36px)]">
              Lo que no se puede tercerizar
            </h2>
            <p className="mt-4 text-acero">
              En un sector donde muchos laboratorios subcontratan tramos del proceso,
              nuestra ventaja es simple: lo hacemos adentro. Eso acorta plazos, protege
              tu fórmula y nos hace responsables de principio a fin.
            </p>
            <ul className="check mt-5.5">
              <li>
                <strong>Área de Asuntos Regulatorios propia.</strong> Tu notificación
                sanitaria no depende de un tercero.
              </li>
              <li>
                <strong>Control de calidad físico-químico y microbiológico</strong> en
                planta, con liberación de lote documentada.
              </li>
              <li>
                <strong>I+D con activos peruanos</strong>: sacha inchi, maca, hierba
                luisa, avena y bambú.
              </li>
              <li>
                <strong>Escala flexible</strong>: producción por pedido y por stock,
                para lotes pequeños y grandes.
              </li>
            </ul>
          </div>
          <Galeria
            cols={2}
            claves={["fisicoQuimico", "siembra", "envasado", "agua"]}
          />
        </div>
      </Band>

      {/* ----------------------------------------------------- categorías */}
      <Band tono="nube">
        <BandHead
          eyebrow="Qué fabricamos"
          titulo="Cuatro categorías, decenas de formatos"
          texto="Si tu producto entra en alguna de estas categorías, podemos fabricarlo. Si no estás seguro, escríbenos con el concepto y lo evaluamos."
        />
        <Grid cols={4}>
          {CATEGORIAS.map((c) => (
            <article key={c.titulo} className="card card-viva">
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </article>
          ))}
        </Grid>
        <p className="mt-5.5">
          <Link
            className="group inline-flex items-center gap-2 font-semibold text-hoja-txt"
            href="/productos"
          >
            Ver el detalle de formatos y presentaciones
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </p>
      </Band>

      {/* --------------------------------------------------------- marcas */}
      <Band tono="blanco">
        <div className="revela grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Declara>Calidad de laboratorio a precio de todos los días.</Declara>
          <div>
            <span className="eyebrow filete">Marcas propias</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">
              Sabemos crear marcas porque creamos las nuestras
            </h2>
            <p className="mt-3.5 text-acero">
              Daya y Activen nacieron en este mismo laboratorio: la fórmula, el
              registro, el empaque y la salida al canal. Es la mejor prueba de lo que
              podemos hacer con la tuya.
            </p>
            <p className="mt-4.5">
              <Link
                className="group inline-flex items-center gap-2 font-semibold text-hoja-txt"
                href="/marcas"
              >
                Conocer nuestras marcas
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </Band>

      <Cta
        titulo="¿Tienes un producto en mente?"
        texto="Cuéntanos la categoría, el volumen estimado y el plazo. Te respondemos con una evaluación técnica y una cotización."
      />
    </>
  );
}
