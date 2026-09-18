import type { Metadata } from "next";
import { Band, BandHead, Cta, Galeria, Grid, PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Capacidades y planta",
  description:
    "Áreas de producción, I+D, control de calidad físico-químico y microbiológico, asuntos regulatorios, tratamiento de agua y almacenes en San Juan de Lurigancho, Lima.",
  alternates: { canonical: "/capacidades" },
};

const AREAS = [
  {
    titulo: "Investigación y desarrollo",
    texto:
      "Formulación de nuevos productos, muestras, escalamiento a lote industrial y mejora continua de fórmulas existentes.",
  },
  {
    titulo: "Fabricación",
    texto:
      "Mezcla y elaboración por lote, con control en proceso y registro de parámetros en cada etapa.",
  },
  {
    titulo: "Envasado y acondicionado",
    texto:
      "Llenado, sellado, etiquetado y armado de packs, con áreas separadas y esclusas entre zonas.",
  },
  {
    titulo: "Control de calidad físico-químico",
    texto:
      "Verificación de pH, viscosidad, densidad y características organolépticas de insumos y producto terminado.",
  },
  {
    titulo: "Control de calidad microbiológico",
    texto:
      "Siembra, incubación y repique de cepas para asegurar que cada lote cumple los límites establecidos.",
  },
  {
    titulo: "Asuntos regulatorios",
    texto:
      "Elaboración de expedientes técnicos y gestión de notificaciones sanitarias ante Digemid.",
  },
  {
    titulo: "Tratamiento de agua",
    texto:
      "Sistema propio de purificación: el agua es el principal insumo de un cosmético y su calidad se controla en planta.",
  },
  {
    titulo: "Almacenes",
    texto:
      "Materia prima, material de empaque y producto terminado en zonas diferenciadas, con control de rotación y vencimientos.",
  },
  {
    titulo: "Higiene doméstica",
    texto:
      "Línea dedicada a productos de limpieza y cuidado del hogar, separada de la línea cosmética.",
  },
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Capacidades"
        titulo="La planta"
        texto="Producción, investigación y desarrollo, control de calidad, asuntos regulatorios y almacenes operan en una misma instalación en San Juan de Lurigancho. Esto es lo que hay adentro."
      />

      <Band tono="blanco">
        <BandHead
          eyebrow="Áreas"
          titulo="Qué controlamos directamente"
          texto="No coordinamos proveedores para las etapas críticas: las ejecutamos. Eso es lo que permite responder por el producto de principio a fin."
        />
        <Grid cols={3}>
          {AREAS.map((a) => (
            <article key={a.titulo} className="card card-viva bg-hueso">
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="nube">
        <BandHead eyebrow="Recorrido" titulo="Por dentro" texto="Fotografías de nuestras instalaciones." />
        <Galeria
          cols={3}
          claves={[
            "fabricacion1",
            "envasado",
            "acondicionado2",
            "fisicoQuimico",
            "microbiologia",
            "siembra",
            "incubadoras",
            "agua",
            "materiaPrima",
            "dispensacion",
            "esclusa",
            "higiene",
          ]}
        />
      </Band>

      <Band tono="blanco">
        <BandHead
          eyebrow="Modelos de producción"
          titulo="Por pedido o por stock"
          texto="Operamos dos flujos distintos según el tipo de cliente, y eso define plazos, mínimos y costos."
        />
        <Grid cols={2}>
          <article className="card card-viva bg-hueso">
            <div className="card-n">MAKE TO ORDER</div>
            <h3>Producción por pedido</h3>
            <p>
              Para maquila y marca privada. Se programa contra una orden de venta
              aprobada: se compran los insumos específicos del proyecto, se fabrica el
              lote y se despacha.
            </p>
            <ul className="check mt-1.5">
              <li>Abastecimiento específico por proyecto</li>
              <li>Fabricación bajo pedido</li>
              <li>Liberación de lote y despacho al cliente</li>
            </ul>
          </article>
          <article className="card card-viva bg-hueso">
            <div className="card-n">MAKE TO STOCK</div>
            <h3>Producción por stock</h3>
            <p>
              Para nuestras marcas propias y clientes con demanda continua. Se planifica
              contra pronóstico de ventas y stock mínimo, con reposición según rotación.
            </p>
            <ul className="check mt-1.5">
              <li>Plan maestro de producción</li>
              <li>Compras por volumen</li>
              <li>Despacho inmediato desde stock</li>
            </ul>
          </article>
        </Grid>
      </Band>

      <Cta
        titulo="¿Tu producto entra en nuestras líneas?"
        texto="Envíanos la categoría y el formato. Te confirmamos viabilidad técnica antes de cotizar."
      />
    </>
  );
}
