import { nombrePeriodo } from "@/lib/intranet/tablero";

/** Elegir el mes de trabajo. Es un formulario GET: la URL guarda el periodo y se puede compartir. */
export function SelectorPeriodo({ periodo, periodos }: { periodo: string; periodos: string[] }) {
  return (
    <form method="get" className="flex flex-wrap items-end gap-2.5">
      <div className="campo">
        <label htmlFor="periodo">Mes de cierre</label>
        <input
          id="periodo"
          name="periodo"
          type="month"
          defaultValue={periodo}
          className="rounded-[2px] border border-linea bg-white px-2 py-1.5 text-[13px]"
        />
      </div>
      <button type="submit" className="btn btn-verde">
        Ver
      </button>
      {periodos.length > 0 && (
        <p className="pb-2 text-[12px] text-acero-claro">
          Con datos: {periodos.map((p) => nombrePeriodo(p)).join(" · ")}
        </p>
      )}
    </form>
  );
}
