/**
 * Cinta de formatos que fabricamos. Es el equivalente al listado de
 * "productos elaborados" que usan las webs de maquila: sirve para que el
 * visitante reconozca su producto en dos segundos.
 *
 * La lista se duplica para que el desplazamiento sea continuo; la copia va
 * oculta a lectores de pantalla. Con movimiento reducido, la cinta se
 * detiene y el listado simplemente se acomoda en varias líneas.
 */

const FORMATOS = [
  "Cremas faciales",
  "Geles crema",
  "Sérums",
  "Leches limpiadoras",
  "Tónicos y brumas",
  "Exfoliantes",
  "Mascarillas",
  "Shampoos",
  "Acondicionadores",
  "Tratamientos capilares",
  "Cremas corporales",
  "Cremas de masaje",
  "Geles de baño",
  "Splash perfumados",
  "Jabones en gel",
  "Limpiadores del hogar",
  "Lavavajillas",
];

function Fila({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {FORMATOS.map((f) => (
        <li key={f} className="flex items-center gap-6 px-6">
          <span className="text-[clamp(15px,1.7vw,19px)] font-medium whitespace-nowrap text-[#dfe5da]">
            {f}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-amarillo"
          />
        </li>
      ))}
    </ul>
  );
}

export function Cinta() {
  return (
    <div className="cinta-marco overflow-hidden border-y border-linea-honda bg-verde-hondo py-5">
      <div className="cinta">
        <Fila />
        <Fila oculta />
      </div>
    </div>
  );
}
