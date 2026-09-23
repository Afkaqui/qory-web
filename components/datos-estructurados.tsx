import { EMPRESA } from "@/lib/empresa";

/**
 * Datos estructurados (JSON-LD) para buscadores.
 *
 * Le dicen a Google qué es esta empresa en lugar de dejar que lo deduzca del
 * texto: razón social, logotipo, dirección, teléfonos y perfiles oficiales.
 * Es lo que habilita el panel de conocimiento y que el logotipo aparezca
 * junto al resultado.
 *
 * Solo se declara lo que es verificable. Nada de certificaciones ni premios
 * que la empresa no tenga vigentes.
 */
export function DatosEstructurados() {
  const datos = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${EMPRESA.sitio}/#organizacion`,
    name: EMPRESA.razon,
    alternateName: EMPRESA.firma,
    url: EMPRESA.sitio,
    logo: `${EMPRESA.sitio}/img/logo.png`,
    // `image` es lo que Google asocia a la ficha de la empresa. Se declara como
    // ImageObject con dimensiones: una imagen sin tamaño declarado se descarta
    // con más facilidad al elegir la miniatura del resultado.
    image: {
      "@type": "ImageObject",
      url: `${EMPRESA.sitio}/opengraph-image.png`,
      width: 1200,
      height: 630,
    },
    description:
      "Laboratorio peruano de desarrollo, fabricación y acondicionado de productos cosméticos. Maquila bajo marca del cliente, desarrollo de marca privada y marcas propias.",
    foundingDate: String(EMPRESA.desde),
    email: EMPRESA.correo,
    telephone: `+51${EMPRESA.telefonos[0].numero.replace(/\s/g, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: EMPRESA.direccion,
      addressLocality: "San Juan de Lurigancho",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    contactPoint: EMPRESA.telefonos.map((t) => ({
      "@type": "ContactPoint",
      telephone: `+51${t.numero.replace(/\s/g, "")}`,
      contactType: "sales",
      areaServed: "PE",
      availableLanguage: "Spanish",
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
    sameAs: [EMPRESA.redes.linkedin, EMPRESA.redes.facebook, EMPRESA.redes.instagram],
    knowsAbout: [
      "Maquila de productos cosméticos",
      "Desarrollo de marca privada",
      "Tratamiento facial",
      "Cuidado capilar",
      "Cuidado corporal",
      "Asuntos regulatorios Digemid",
    ],
    brand: [
      { "@type": "Brand", name: "Daya" },
      { "@type": "Brand", name: "Activen" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y se serializa desde un objeto, no de entrada
      // de usuario. Se escapa `<` para que no pueda cerrar la etiqueta.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\\u003c"),
      }}
    />
  );
}
