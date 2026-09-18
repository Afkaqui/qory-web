import { Caja, Chip, FormularioMaqueta, Marco } from "@/components/intranet/marco";
import { ANALISIS, LOTES, type Tono } from "@/lib/intranet-demo";

const RESULTADO: Record<string, { texto: string; tono: Tono }> = {
  conforme: { texto: "Conforme", tono: "ok" },
  reanalisis: { texto: "Reanálisis", tono: "alerta" },
  rechazado: { texto: "Rechazado", tono: "malo" },
};

const PARA_ANALIZAR = LOTES.filter((l) =>
  ["analisis", "acondicionado", "envasado"].includes(l.estado),
);

export default function Page() {
  return (
    <Marco
      titulo="Control de calidad"
      bajada="Resultados físico-químicos y microbiológicos por lote. La liberación es un acto regulado: la firma Dirección Técnica y queda con su autor y su hora."
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1fr_1.3fr]">
        <Caja titulo="Registrar análisis">
          <FormularioMaqueta boton="Registrar análisis">
            <div className="campo">
              <label htmlFor="lote">Lote</label>
              <select id="lote" name="lote" defaultValue={PARA_ANALIZAR[0]?.codigo}>
                {PARA_ANALIZAR.map((l) => (
                  <option key={l.codigo} value={l.codigo}>
                    {l.codigo} · {l.producto}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="campo">
                <label htmlFor="ph">pH</label>
                <input id="ph" name="ph" type="number" step="0.1" placeholder="5.4" />
              </div>
              <div className="campo">
                <label htmlFor="visc">Viscosidad (cP)</label>
                <input id="visc" name="visc" type="number" placeholder="18200" />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="micro">Microbiología</label>
              <select id="micro" name="micro" defaultValue="En incubación">
                <option>En incubación</option>
                <option>Conforme</option>
                <option>Fuera de límite</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="resultado">Resultado</label>
              <select id="resultado" name="resultado" defaultValue="conforme">
                <option value="conforme">Conforme · libera el lote</option>
                <option value="reanalisis">Reanálisis</option>
                <option value="rechazado">Rechazado</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="obs">Observaciones</label>
              <textarea id="obs" name="obs" placeholder="Desviaciones respecto a la especificación" />
            </div>
          </FormularioMaqueta>
          <div className="aviso mt-4">
            <span className="aviso-tag">Buenas prácticas</span>
            Un análisis registrado <strong>no se borra</strong>. Si hay que corregirlo se crea
            una versión nueva indicando el motivo, y la anterior queda visible en la bitácora
            de auditoría.
          </div>
        </Caja>

        <Caja titulo="Análisis recientes">
          <div className="tabla border-0">
            <table className="min-w-[600px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Lote</th>
                  <th scope="col">pH</th>
                  <th scope="col">Viscosidad</th>
                  <th scope="col">Microbiología</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Analista</th>
                </tr>
              </thead>
              <tbody>
                {ANALISIS.map((a) => (
                  <tr key={`${a.lote}-${a.fecha}`}>
                    <td className="font-mono whitespace-nowrap text-acero-claro">{a.fecha}</td>
                    <td className="font-mono whitespace-nowrap">{a.lote}</td>
                    <td className="font-mono tabular-nums">{a.ph}</td>
                    <td className="font-mono tabular-nums">{a.viscosidad.toLocaleString("es-PE")}</td>
                    <td>{a.micro}</td>
                    <td>
                      <Chip tono={RESULTADO[a.resultado].tono}>{RESULTADO[a.resultado].texto}</Chip>
                    </td>
                    <td>{a.analista}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Caja>
      </div>
    </Marco>
  );
}
