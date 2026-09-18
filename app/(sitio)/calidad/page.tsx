import type { Metadata } from "next";
import { Band, BandHead, Cta, Galeria, Grid, PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calidad y cumplimiento",
  description:
    "Certificación en Buenas Prácticas de Manufactura y Almacenamiento otorgada por Digemid, área propia de Asuntos Regulatorios y control de calidad en planta.",
  alternates: { canonical: "/calidad" },
};

const REGULATORIO = [
  {
    n: "01",
    titulo: "Expediente técnico",
    texto:
      "Preparamos la documentación técnica del producto: fórmula cualitativa y cuantitativa, especificaciones y proyecto de arte.",
  },
  {
    n: "02",
    titulo: "Notificación sanitaria",
    texto:
      "Presentamos y damos seguimiento al trámite ante Digemid hasta la obtención del código de notificación.",
  },
  {
    n: "03",
    titulo: "Vigilancia posterior",
    texto:
      "Acompañamos modificaciones, renovaciones y requerimientos de la autoridad durante la vida del producto.",
  },
];

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Calidad y cumplimiento"
        titulo="Lo que respalda cada lote"
        texto="Contamos con certificación en Buenas Prácticas de Manufactura y Almacenamiento otorgada por Digemid, y con un área propia de Asuntos Regulatorios. El cumplimiento no lo tercerizamos."
      />

      <Band tono="blanco">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow">Buenas prácticas</span>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">
              BPM certificadas por Digemid
            </h2>
            <p className="mt-4 text-acero">
              Nuestra planta cuenta con certificación en Buenas Prácticas de Manufactura
              y Almacenamiento otorgada por la Dirección General de Medicamentos,
              Insumos y Drogas. Es el requisito que habilita a un laboratorio a fabricar
              productos cosméticos en el Perú, y es también lo que permite a nuestros
              clientes registrar sus productos con nuestro respaldo.
            </p>
            <ul className="check mt-5">
              <li>
                Áreas diferenciadas con esclusas entre zonas de distinto nivel de
                limpieza.
              </li>
              <li>Trazabilidad por lote desde la materia prima hasta el despacho.</li>
              <li>
                Liberación de lote firmada por Control de Calidad antes de cada salida.
              </li>
              <li>
                Control de rotación y vencimientos en almacén de producto terminado.
              </li>
            </ul>
          </div>
          <Galeria cols={1} claves={["esclusa"]} />
        </div>
      </Band>

      <Band tono="nube">
        <BandHead
          eyebrow="Asuntos regulatorios"
          titulo="Tu registro sanitario, gestionado adentro"
          texto="Muchos laboratorios derivan el trámite sanitario a un consultor externo. Nosotros tenemos el área dentro de la planta, junto a quienes formulan y a quienes fabrican."
        />
        <Grid cols={3}>
          {REGULATORIO.map((r) => (
            <article key={r.n} className="card card-viva">
              <div className="card-n">{r.n}</div>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </article>
          ))}
        </Grid>
      </Band>

      <Band tono="blanco">
        <BandHead
          eyebrow="Control de calidad"
          titulo="Dos laboratorios dentro del laboratorio"
        />
        <Grid cols={2}>
          <article className="card card-viva bg-hueso">
            <h3>Físico-químico</h3>
            <p>
              Verificación de pH, viscosidad, densidad, peso y características
              organolépticas en materia prima, producto en proceso y producto terminado.
            </p>
          </article>
          <article className="card card-viva bg-hueso">
            <h3>Microbiológico</h3>
            <p>
              Área de siembra, incubadoras, repique de cepas y lavado de materiales,
              para verificar que cada lote cumple los límites microbiológicos
              establecidos.
            </p>
          </article>
        </Grid>
        <div className="aviso mt-5.5">
          <span className="aviso-tag">Ética y conducta</span>
          Operamos bajo un Código de Conducta interno que rige la relación con clientes,
          proveedores y colaboradores. Está disponible para clientes y socios
          comerciales que lo soliciten.
        </div>
      </Band>

      <Cta
        titulo="Fabrica con respaldo sanitario"
        texto="Si tu proyecto necesita registro ante Digemid, lo resolvemos dentro del mismo contrato."
      />
    </>
  );
}
