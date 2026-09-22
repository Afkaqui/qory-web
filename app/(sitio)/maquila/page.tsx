import type { Metadata } from "next";
import Link from "next/link";
import {
  Cierre,
  Clausula,
  PlacaAncha,
  Portadilla,
  Seccion,
  Specs,
} from "@/components/hoja";
import { PASOS } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Maquila 360° y marca privada",
  description:
    "Fabricamos productos cosméticos bajo tu marca: formulación, expediente técnico y notificación sanitaria ante Digemid, producción, envasado y acondicionado.",
  alternates: { canonical: "/maquila" },
};

const FAQ: [string, string][] = [
  [
    "¿Cuál es el volumen mínimo?",
    "Depende de la categoría y del formato de envase. Trabajamos por pedido —lotes pequeños de lanzamiento— y por stock planificado para volúmenes altos. Indícanos tu estimado en el briefing y te damos el mínimo exacto.",
  ],
  [
    "¿Puedo traer mi propia fórmula?",
    "Sí. La evaluamos técnicamente, verificamos que sea fabricable en nuestras líneas y que cumpla la normativa vigente, y la ajustamos contigo si hace falta.",
  ],
  [
    "¿Quién queda como titular del registro?",
    "Depende del acuerdo comercial y se define por escrito antes de iniciar. Gestionamos el trámite desde nuestra área de Asuntos Regulatorios.",
  ],
  [
    "¿Cuánto demora un lanzamiento?",
    "El plazo lo marcan la complejidad de la fórmula, la disponibilidad de envases y el trámite sanitario. Al cotizar entregamos un cronograma por etapas, no una fecha suelta.",
  ],
  [
    "¿Se protege mi fórmula?",
    "Firmamos acuerdo de confidencialidad antes de recibir cualquier información técnica. Es práctica estándar en todos nuestros proyectos.",
  ],
  [
    "¿Fabrican para mi competencia?",
    "Trabajamos con varias marcas del mismo sector, pero cada fórmula desarrollada para un cliente es de uso exclusivo de ese cliente.",
  ],
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 02 · Servicios"
        titulo="Tú vendes, nosotros hacemos el resto"
        lede="Recibimos tu concepto y ejecutamos el ciclo completo: formulación química, diseño de marca y empaque, gestión regulatoria y entrega del producto terminado, listo para la venta."
        ficha={[
          ["Modalidades", "Maquila bajo marca del cliente · Desarrollo de marca privada llave en mano"],
          ["Incluye", "Fórmula, muestras, expediente técnico, notificación sanitaria, producción, envasado y acondicionado"],
          ["Modelos", "Por pedido (MTO) y por stock planificado (MTS)"],
          ["Confidencialidad", "Acuerdo firmado antes de recibir información técnica"],
        ]}
      />

      <Seccion>
        <Clausula n="01" titulo="El proceso" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[15ch] text-verde">
            Cinco etapas, ninguna tercerizada
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            Este es el flujo real de un pedido de maquila en nuestra planta. Cada etapa
            tiene un responsable interno y deja registro documentado.
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

      <Seccion tono="nube">
        <Clausula n="02" titulo="Reparto de tareas" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="aparece titular-chico mb-6 text-verde">Tú aportas</h3>
            <Specs
              filas={[
                ["Concepto", "El producto que quieres y el público al que va dirigido"],
                ["Marca", "Si ya la tienes registrada. Si no, te acompañamos en el proceso"],
                ["Preferencias", "Textura, fragancia y posicionamiento de precio"],
                ["Volumen y plazo", "El estimado y la fecha objetivo de lanzamiento"],
              ]}
            />
          </div>
          <div>
            <h3 className="aparece titular-chico mb-6 text-verde">Nosotros aportamos</h3>
            <Specs
              filas={[
                ["Formulación", "Desarrollo de la fórmula y muestras hasta tu aprobación"],
                ["Regulatorio", "Expediente técnico y notificación sanitaria ante Digemid"],
                ["Abastecimiento", "Materias primas, envases y material de empaque"],
                ["Producción", "Fabricación, envasado, acondicionado y control de calidad por lote"],
                ["Entrega", "Producto terminado, liberado y listo para despacho"],
              ]}
            />
          </div>
        </div>
      </Seccion>

      <PlacaAncha clave="acondicionado1" />

      <Seccion id="marca-privada">
        <Clausula n="03" titulo="Llave en mano" />
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[13ch] text-verde">
            Desarrollo de marca privada
          </h2>
          <div className="max-w-[52ch] space-y-5 text-[15.5px] leading-relaxed text-acero">
            <p>
              Para quien quiere lanzar una marca de cosméticos sin montar una fábrica.
              Tomamos el proyecto desde la idea: definimos el portafolio, formulamos,
              diseñamos el empaque, registramos el producto y lo fabricamos.
            </p>
            <p>
              El resultado es un producto terminado con tu marca, tu registro sanitario
              y tu fórmula, desarrollada específicamente para ti.
            </p>
            <p className="pt-3">
              <Link className="vinculo" href="/contacto">
                Empezar un proyecto
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion tono="nube">
        <Clausula n="04" titulo="Preguntas frecuentes" />
        <h2 className="aparece titular-medio mb-10 max-w-[16ch] text-verde">
          Lo que nos preguntan antes de empezar
        </h2>
        <Specs filas={FAQ} />
      </Seccion>

      <Cierre
        titulo="Pide tu cotización"
        texto="Completa el briefing en dos minutos. Cuanto más concreto, más precisa será nuestra respuesta."
      />
    </>
  );
}
