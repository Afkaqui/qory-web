import { Caja, Chip, FormularioMaqueta, Marco } from "@/components/intranet/marco";
import { PERSONAS, TAREAS } from "@/lib/intranet-demo";

const ABIERTAS = TAREAS.filter((t) => t.estado === "abierta");
const CERRADAS = TAREAS.filter((t) => t.estado === "cerrada");

export default function Page() {
  return (
    <Marco
      titulo="Tareas"
      bajada="Una desviación, un plazo regulatorio, un mantenimiento y un pendiente del programa son la misma cosa: una tarea con responsable y fecha. Aquí viven todas."
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-3.5">
          <Caja titulo={`Abiertas · ${ABIERTAS.length}`}>
            <ul className="grid gap-2.5">
              {ABIERTAS.map((t) => (
                <li
                  key={t.titulo}
                  className={`rounded-[3px] border p-3.5 ${
                    t.vencida ? "border-[#e0c3bd] bg-[#fdf6f4]" : "border-linea bg-hueso/60"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="text-[14.5px] font-semibold text-verde">{t.titulo}</span>
                    <Chip tono={t.vencida ? "malo" : "neutro"}>
                      {t.vencida ? `Vencida · ${t.vence}` : `Vence ${t.vence}`}
                    </Chip>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-acero-claro">
                    <span>Origen: {t.origen}</span>
                    <span>Responsable: {t.asignado}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Caja>

          <Caja titulo={`Cerradas esta semana · ${CERRADAS.length}`}>
            <ul className="grid gap-2">
              {CERRADAS.map((t) => (
                <li key={t.titulo} className="flex flex-wrap items-center gap-2.5 text-[13.5px] text-acero">
                  <Chip tono="ok">Cerrada</Chip>
                  <span className="line-through decoration-acero-claro">{t.titulo}</span>
                  <span className="text-[12px] text-acero-claro">· {t.asignado}</span>
                </li>
              ))}
            </ul>
          </Caja>
        </div>

        <Caja titulo="Nueva tarea">
          <FormularioMaqueta boton="Crear tarea">
            <div className="campo">
              <label htmlFor="titulo">Qué hay que hacer</label>
              <input id="titulo" name="titulo" type="text" placeholder="Cerrar desviación DES-2026-015" />
            </div>
            <div className="campo">
              <label htmlFor="origen">Origen</label>
              <select id="origen" name="origen" defaultValue="Desviación">
                <option>Desviación</option>
                <option>Regulatorio</option>
                <option>Capacitación</option>
                <option>Mantenimiento</option>
                <option>Almacén</option>
                <option>Programa de producción</option>
                <option>Auditoría</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="asignado">Responsable</label>
              <select id="asignado" name="asignado" defaultValue={PERSONAS[3].nombre}>
                {PERSONAS.map((p) => (
                  <option key={p.nombre}>
                    {p.nombre} · {p.area}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo">
              <label htmlFor="vence">Fecha comprometida</label>
              <input id="vence" name="vence" type="date" />
            </div>
            <div className="campo">
              <label htmlFor="detalle">Detalle</label>
              <textarea id="detalle" name="detalle" placeholder="Qué se espera como evidencia de cierre" />
            </div>
          </FormularioMaqueta>
        </Caja>
      </div>
    </Marco>
  );
}
