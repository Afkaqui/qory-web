import { Caja, Chip, Marco, Tile } from "@/components/intranet/marco";
import { PERSONAS, type Tono } from "@/lib/intranet-demo";

const CAPACITACION: Record<string, { texto: string; tono: Tono }> = {
  vigente: { texto: "Vigente", tono: "ok" },
  "por-vencer": { texto: "Por vencer", tono: "alerta" },
  vencida: { texto: "Vencida", tono: "malo" },
};

export default function Page() {
  const presentes = PERSONAS.filter((p) => p.presente).length;
  const porVencer = PERSONAS.filter((p) => p.capacitacion !== "vigente").length;
  const cobertura = Math.round((presentes / PERSONAS.length) * 100);

  return (
    <Marco
      titulo="Personas"
      bajada="Quién está en planta, en qué turno y con qué competencias vigentes. Responde primero la pregunta operativa: ¿tengo gente habilitada para este lote?"
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile etiqueta="Cobertura del turno" valor={`${cobertura} %`} pie={`${presentes} de ${PERSONAS.length} programados`} />
        <Tile etiqueta="En planta ahora" valor={String(presentes)} pie="según marcación del turno" />
        <Tile
          etiqueta="Capacitaciones por atender"
          valor={String(porVencer)}
          pie="requisito de buenas prácticas"
          tono="alerta"
        />
        <Tile etiqueta="Ausencias del día" valor={String(PERSONAS.length - presentes)} pie="con motivo registrado" />
      </div>

      <div className="mt-3.5 grid grid-cols-1 gap-3.5 lg:grid-cols-[1.6fr_1fr]">
        <Caja titulo="Turno de hoy">
          <div className="tabla border-0">
            <table className="min-w-[600px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Colaborador</th>
                  <th scope="col">Puesto</th>
                  <th scope="col">Área</th>
                  <th scope="col">Turno</th>
                  <th scope="col">Asistencia</th>
                  <th scope="col">Capacitación BPM</th>
                </tr>
              </thead>
              <tbody>
                {PERSONAS.map((p) => (
                  <tr key={p.nombre}>
                    <td className="font-medium whitespace-nowrap">{p.nombre}</td>
                    <td>{p.puesto}</td>
                    <td>{p.area}</td>
                    <td>{p.turno}</td>
                    <td>
                      <Chip tono={p.presente ? "ok" : "neutro"}>
                        {p.presente ? "Presente" : "Ausente"}
                      </Chip>
                    </td>
                    <td>
                      <Chip tono={CAPACITACION[p.capacitacion].tono}>
                        {CAPACITACION[p.capacitacion].texto}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Caja>

        <div className="grid gap-3.5">
          <Caja titulo="Productividad por área · unidades por hora-hombre">
            <ul className="grid gap-3">
              {[
                { area: "Fabricación", valor: 118, max: 140 },
                { area: "Envasado", valor: 96, max: 140 },
                { area: "Acondicionado", valor: 134, max: 140 },
              ].map((a) => (
                <li key={a.area}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="font-medium text-verde">{a.area}</span>
                    <span className="font-mono text-[12px] text-acero tabular-nums">{a.valor}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-nube">
                    <div
                      className="h-2 rounded-full bg-verde"
                      style={{ width: `${(a.valor / a.max) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Caja>

          <div className="aviso">
            <span className="aviso-tag">Datos personales · Ley 29733</span>
            La productividad se muestra <strong>por área y por turno, nunca por persona</strong>.
            La comparación individual queda entre el colaborador y su jefe directo, dentro del
            módulo de desempeño. Remuneraciones y planillas no entran a la intranet.
          </div>
        </div>
      </div>
    </Marco>
  );
}
