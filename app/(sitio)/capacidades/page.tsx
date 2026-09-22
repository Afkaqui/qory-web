import type { Metadata } from "next";
import Image from "next/image";
import { Cierre, Clausula, Indice, PlacaAncha, Portadilla, Seccion, Specs } from "@/components/hoja";
import { FOTOS } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Capacidades y planta",
  description:
    "Áreas de producción, I+D, control de calidad físico-químico y microbiológico, asuntos regulatorios, tratamiento de agua y almacenes en San Juan de Lurigancho, Lima.",
  alternates: { canonical: "/capacidades" },
};

const AREAS = [
  { titulo: "Investigación y desarrollo", detalle: "Formulación de nuevos productos, muestras, escalamiento a lote industrial y mejora continua de fórmulas.", meta: "I+D" },
  { titulo: "Fabricación", detalle: "Mezcla y elaboración por lote, con control en proceso y registro de parámetros en cada etapa.", meta: "Producción" },
  { titulo: "Envasado y acondicionado", detalle: "Llenado, sellado, etiquetado y armado de packs, con áreas separadas y esclusas entre zonas.", meta: "Producción" },
  { titulo: "Control físico-químico", detalle: "Verificación de pH, viscosidad, densidad y características organolépticas de insumos y producto terminado.", meta: "Calidad" },
  { titulo: "Control microbiológico", detalle: "Siembra, incubación y repique de cepas para verificar que cada lote cumple los límites establecidos.", meta: "Calidad" },
  { titulo: "Asuntos regulatorios", detalle: "Expedientes técnicos y gestión de notificaciones sanitarias ante Digemid.", meta: "Calidad" },
  { titulo: "Tratamiento de agua", detalle: "Sistema propio de purificación: el agua es el principal insumo de un cosmético y su calidad se controla en planta.", meta: "Servicios" },
  { titulo: "Almacenes", detalle: "Materia prima, material de empaque y producto terminado en zonas diferenciadas, con control de rotación y vencimientos.", meta: "Logística" },
];

const RECORRIDO: (keyof typeof FOTOS)[] = [
  "fabricacion1",
  "envasado",
  "acondicionado2",
  "fisicoQuimico",
  "siembra",
  "incubadoras",
  "agua",
  "materiaPrima",
  "dispensacion",
];

export default function Page() {
  return (
    <>
      <Portadilla
        codigo="Ficha 03 · Capacidades"
        titulo="La planta"
        lede="Producción, investigación y desarrollo, control de calidad, asuntos regulatorios y almacenes operan en una misma instalación en San Juan de Lurigancho. Esto es lo que hay adentro."
        ficha={[
          ["Ubicación", "San Juan de Lurigancho, Lima"],
          ["Áreas", "I+D · Fabricación · Envasado · Acondicionado · Control de calidad · Regulatorios · Almacenes"],
          ["Separación", "Esclusas entre zonas de distinto nivel de limpieza"],
          ["Modelos de producción", "Por pedido (MTO) y por stock planificado (MTS)"],
        ]}
      />

      <Seccion>
        <Clausula n="01" titulo="Áreas" />
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="aparece titular-medio max-w-[14ch] text-verde">
            Qué controlamos directamente
          </h2>
          <p className="max-w-[48ch] self-end text-[15.5px] text-acero">
            No coordinamos proveedores para las etapas críticas: las ejecutamos. Eso es
            lo que permite responder por el producto de principio a fin.
          </p>
        </div>
        <Indice entradas={AREAS} />
      </Seccion>

      <PlacaAncha clave="esclusa" />

      <Seccion tono="nube">
        <Clausula n="02" titulo="Recorrido" />
        <h2 className="aparece titular-medio mb-10 max-w-[12ch] text-verde">Por dentro</h2>
        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {RECORRIDO.map((k) => {
            const f = FOTOS[k];
            return (
              <figure key={k} className="m-0">
                <Image
                  src={`/img/planta/${f.archivo}.jpg`}
                  alt={f.pie}
                  width={1400}
                  height={1050}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-4/3 w-full object-cover saturate-90"
                />
                <figcaption className="regla mt-3 pt-2.5">
                  <span className="rotulo">{f.pie}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Seccion>

      <Seccion>
        <Clausula n="03" titulo="Modelos de producción" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="rotulo rotulo-verde">Make to order</span>
            <h3 className="aparece titular-chico mt-3 mb-6 text-verde">Producción por pedido</h3>
            <p className="mb-7 max-w-[46ch] text-[15.5px] text-acero">
              Para maquila y marca privada. Se programa contra una orden de venta
              aprobada: se compran los insumos del proyecto, se fabrica el lote y se
              despacha.
            </p>
            <Specs
              filas={[
                ["Abastecimiento", "Específico por proyecto"],
                ["Fabricación", "Bajo pedido"],
                ["Salida", "Liberación de lote y despacho al cliente"],
              ]}
            />
          </div>
          <div>
            <span className="rotulo rotulo-verde">Make to stock</span>
            <h3 className="aparece titular-chico mt-3 mb-6 text-verde">Producción por stock</h3>
            <p className="mb-7 max-w-[46ch] text-[15.5px] text-acero">
              Para nuestras marcas propias y clientes con demanda continua. Se planifica
              contra pronóstico de ventas y stock mínimo, con reposición según rotación.
            </p>
            <Specs
              filas={[
                ["Planificación", "Plan maestro de producción"],
                ["Compras", "Por volumen"],
                ["Salida", "Despacho inmediato desde stock"],
              ]}
            />
          </div>
        </div>
      </Seccion>

      <Cierre
        titulo="¿Tu producto entra en nuestras líneas?"
        texto="Envíanos la categoría y el formato. Te confirmamos viabilidad técnica antes de cotizar."
      />
    </>
  );
}
