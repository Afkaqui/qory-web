import { api } from "@/lib/api";
import { Caja, Marco } from "@/components/intranet/marco";
import { exigir, tokenActual } from "@/lib/auth/sesion";

type Celda = string | null;

function Tabla({ columnas, filas }: { columnas: string[]; filas: Celda[][] }) {
  return (
    <div className="tabla border-0">
      <table className="min-w-[760px] text-[13px]">
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c} scope="col">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i}>
              {f.map((c, j) => (
                <td key={j} className={j === 0 ? "font-medium whitespace-nowrap" : "text-acero"}>
                  {c ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Page() {
  await exigir("administrador");
  const r = await api<{
    conectores: Celda[][];
    modelo: Celda[][];
    evidencia: Celda[][];
    notas: Record<string, string>;
  }>("/api/referencias", { token: await tokenActual() });

  if (!r.ok) {
    return (
      <Marco titulo="Fuentes y modelo de datos">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const { conectores, modelo, evidencia, notas } = r.datos;

  return (
    <Marco
      titulo="Fuentes y modelo de datos"
      bajada="De dónde sale cada dato, cómo se guarda y qué evidencia lo respalda. Es la base para automatizar la carga más adelante."
    >
      <div className="grid gap-3.5">
        <Caja titulo="Fuentes y conectores">
          {notas["Conectores"] && <p className="mb-3 text-[13px] text-acero">{notas["Conectores"]}</p>}
          <Tabla
            columnas={["ID", "Fuente de Qory", "Conector propuesto", "Clave de integración", "Frecuencia y dueño", "Control de calidad de la carga", "Estado inicial"]}
            filas={conectores}
          />
        </Caja>
        <Caja titulo="Modelo de datos">
          {notas["Modelo de datos"] && <p className="mb-3 text-[13px] text-acero">{notas["Modelo de datos"]}</p>}
          <Tabla columnas={["Entidad o etapa", "Grano y clave", "Campos mínimos", "Relación y regla operativa"]} filas={modelo} />
        </Caja>
        <Caja titulo="Línea base documental">
          {notas["Evidencia"] && <p className="mb-3 text-[13px] text-acero">{notas["Evidencia"]}</p>}
          <Tabla columnas={["Hecho o tema", "Dato documentado", "Corte y alcance", "Uso en el tablero", "Fuente"]} filas={evidencia} />
        </Caja>
      </div>
    </Marco>
  );
}
