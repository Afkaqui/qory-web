import { Caja, Chip, FormularioMaqueta, Marco } from "@/components/intranet/marco";
import { ESTADO, LOTES, PARTES } from "@/lib/intranet-demo";

const ABIERTOS = LOTES.filter((l) => !["liberado", "rechazado"].includes(l.estado));

export default function Page() {
  return (
    <Marco
      titulo="Parte de producción"
      bajada="Lo que el operario registra al cerrar cada etapa. Menos de dos minutos: el lote se escanea y solo se teclea lo que nadie más sabe."
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1fr_1.4fr]">
        <Caja titulo="Registrar etapa">
          <FormularioMaqueta boton="Registrar parte">
            <div className="campo">
              <label htmlFor="lote">Lote</label>
              <select id="lote" name="lote" defaultValue={ABIERTOS[1]?.codigo}>
                {ABIERTOS.map((l) => (
                  <option key={l.codigo} value={l.codigo}>
                    {l.codigo} · {l.producto}
                  </option>
                ))}
              </select>
              <span className="ayuda">En planta se escanea el código del lote.</span>
            </div>
            <div className="campo">
              <label htmlFor="etapa">Etapa</label>
              <select id="etapa" name="etapa" defaultValue="Fabricación">
                <option>Fabricación</option>
                <option>Envasado</option>
                <option>Acondicionado</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="campo">
                <label htmlFor="obtenida">Cantidad obtenida</label>
                <input id="obtenida" name="obtenida" type="number" inputMode="numeric" placeholder="872" />
              </div>
              <div className="campo">
                <label htmlFor="merma">Merma</label>
                <input id="merma" name="merma" type="number" inputMode="numeric" placeholder="12" />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="minutos">Minutos de proceso</label>
              <input id="minutos" name="minutos" type="number" inputMode="numeric" placeholder="185" />
            </div>
            <div className="campo">
              <label htmlFor="obs">Observaciones</label>
              <textarea id="obs" name="obs" placeholder="Solo si hubo algo fuera de lo normal" />
            </div>
          </FormularioMaqueta>
        </Caja>

        <div className="grid gap-3.5">
          <Caja titulo="Lotes abiertos">
            <div className="tabla border-0">
              <table className="min-w-[460px] text-[13px]">
                <thead>
                  <tr>
                    <th scope="col">Lote</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Etapa actual</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ABIERTOS.map((l) => (
                    <tr key={l.codigo}>
                      <td className="font-mono whitespace-nowrap">{l.codigo}</td>
                      <td>{l.producto}</td>
                      <td>{l.etapa}</td>
                      <td>
                        <Chip tono={ESTADO[l.estado].tono}>{ESTADO[l.estado].texto}</Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Caja>

          <Caja titulo="Últimos partes registrados">
            <div className="tabla border-0">
              <table className="min-w-[560px] text-[13px]">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Lote</th>
                    <th scope="col">Etapa</th>
                    <th scope="col">Obtenida</th>
                    <th scope="col">Merma</th>
                    <th scope="col">Operario</th>
                  </tr>
                </thead>
                <tbody>
                  {PARTES.map((p) => (
                    <tr key={`${p.lote}-${p.fecha}`}>
                      <td className="font-mono whitespace-nowrap text-acero-claro">{p.fecha}</td>
                      <td className="font-mono whitespace-nowrap">{p.lote}</td>
                      <td>{p.etapa}</td>
                      <td className="font-mono tabular-nums">{p.obtenida.toLocaleString("es-PE")}</td>
                      <td className="font-mono tabular-nums">{p.merma}</td>
                      <td>{p.operario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Caja>
        </div>
      </div>
    </Marco>
  );
}
