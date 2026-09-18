import type { Metadata } from "next";
import Link from "next/link";
import { Band, BandHead, Cta, Galeria, Grid, PageHead, Pasos } from "@/components/ui";

export const metadata: Metadata = {
  title: "Maquila 360° y marca privada",
  description:
    "Fabricamos productos cosméticos bajo tu marca: formulación, expediente técnico y notificación sanitaria ante Digemid, producción, envasado y acondicionado.",
  alternates: { canonical: "/maquila" },
};

const FAQ = [
  {
    p: "¿Cuál es el volumen mínimo?",
    r: "Depende de la categoría y del formato de envase. Trabajamos tanto por pedido —lotes pequeños de lanzamiento— como por stock planificado para volúmenes altos. Indícanos tu estimado en el briefing y te damos el mínimo exacto.",
  },
  {
    p: "¿Puedo traer mi propia fórmula?",
    r: "Sí. La evaluamos técnicamente, verificamos que sea fabricable en nuestras líneas y que cumpla la normativa vigente, y la ajustamos contigo si hace falta.",
  },
  {
    p: "¿Quién queda como titular del registro sanitario?",
    r: "Depende del acuerdo comercial y se define por escrito antes de iniciar. Gestionamos el trámite desde nuestra área de Asuntos Regulatorios.",
  },
  {
    p: "¿Cuánto demora un lanzamiento?",
    r: "El plazo lo marcan la complejidad de la fórmula, la disponibilidad de envases y el trámite sanitario. Al cotizar te entregamos un cronograma por etapas, no una fecha suelta.",
  },
  {
    p: "¿Se protege mi fórmula?",
    r: "Firmamos acuerdo de confidencialidad antes de recibir cualquier información técnica. Es práctica estándar en todos nuestros proyectos.",
  },
  {
    p: "¿Fabrican para mi competencia?",
    r: "Trabajamos con varias marcas del mismo sector, pero cada fórmula desarrollada para un cliente es de uso exclusivo de ese cliente.",
  },
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Servicios"
        titulo="Maquila 360°: tú vendes, nosotros hacemos el resto"
        texto="Recibimos tu concepto y ejecutamos el ciclo completo de creación: formulación química, diseño de marca y empaque, gestión regulatoria y entrega del producto terminado, listo para la venta."
      />

      <Band tono="blanco">
        <BandHead
          eyebrow="El proceso"
          titulo="Cinco etapas, ninguna tercerizada"
          texto="Este es el flujo real de un pedido de maquila en nuestra planta. Cada etapa tiene un responsable interno y deja registro documentado."
        />
        <Pasos />
      </Band>

      <Band tono="nube">
        <BandHead eyebrow="Reparto de tareas" titulo="Qué pones tú, qué ponemos nosotros" />
        <Grid cols={2}>
          <article className="card card-viva">
            <h3>Tú aportas</h3>
            <ul className="check mt-1.5">
              <li>El concepto de producto y el público al que va dirigido.</li>
              <li>Tu marca, si ya la tienes registrada. Si no, te acompañamos en el proceso.</li>
              <li>Preferencias de textura, fragancia y posicionamiento de precio.</li>
              <li>El volumen estimado y el plazo objetivo de lanzamiento.</li>
            </ul>
          </article>
          <article className="card card-viva border-t-2 border-t-hoja">
            <h3>Nosotros aportamos</h3>
            <ul className="check mt-1.5">
              <li>Desarrollo de la fórmula y muestras hasta tu aprobación.</li>
              <li>Expediente técnico y notificación sanitaria ante Digemid.</li>
              <li>Gestión de materias primas, envases y material de empaque.</li>
              <li>Fabricación, envasado, acondicionado y control de calidad por lote.</li>
              <li>Producto terminado, liberado y listo para despacho.</li>
            </ul>
          </article>
        </Grid>
      </Band>

      <Band tono="blanco" id="marca-privada">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow">Llave en mano</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">
              Desarrollo de marca privada
            </h2>
            <p className="mt-4 text-acero">
              Para quien quiere lanzar una marca de cosméticos sin montar una fábrica.
              Tomamos el proyecto desde la idea: definimos el portafolio, formulamos,
              diseñamos el empaque, registramos el producto y lo fabricamos.
            </p>
            <p className="mt-3.5 text-acero">
              El resultado es un producto terminado con tu marca, tu registro sanitario y
              tu fórmula, desarrollada específicamente para ti.
            </p>
            <p className="mt-5">
              <Link className="btn btn-verde" href="/contacto">
                Empezar un proyecto
              </Link>
            </p>
          </div>
          <Galeria cols={2} claves={["acondicionado1", "dispensacion"]} />
        </div>
      </Band>

      <Band tono="nube">
        <BandHead
          eyebrow="Preguntas frecuentes"
          titulo="Lo que nos preguntan antes de empezar"
        />
        <Grid cols={2}>
          {FAQ.map((f) => (
            <article key={f.p} className="card card-viva">
              <h3>{f.p}</h3>
              <p>{f.r}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Cta
        titulo="Pide tu cotización"
        texto="Completa el briefing en dos minutos. Cuanto más concreto, más precisa será nuestra respuesta."
      />
    </>
  );
}
