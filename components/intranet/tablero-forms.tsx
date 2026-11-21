"use client";

import { useActionState } from "react";
import { fijarCorte, guardarAccion, guardarCajaSemana, guardarCaptura, type Estado } from "@/app/intranet/actions";
import { metaParaCampo, soles, type Accion, type FilaCaja, type Indicador } from "@/lib/intranet/tablero";

function Mensaje({ estado }: { estado: Estado }) {
  if (estado?.error) return <span role="alert" className="text-[12px] text-[#8c382b]">{estado.error}</span>;
  if (estado?.ok) return <span role="status" className="text-[12px] text-hoja-txt">{estado.ok}</span>;
  return null;
}

/** Celdas ámbar: son las únicas que se editan, igual que en el libro de Excel. */
const campo =
  "w-full min-w-0 rounded-[2px] border border-linea bg-[#fffbea] px-2 py-1.5 text-[13px] tabular-nums focus:border-hoja focus:outline-none";

/* ------------------------------------------------------------- captura */

export function FilaCaptura({ ind, periodo, puedeMeta }: { ind: Indicador; periodo: string; puedeMeta: boolean }) {
  const [estado, accion, pendiente] = useActionState(guardarCaptura, undefined);
  const deCaja = ind.codigo === "F03";
  const id = `c-${ind.codigo}`;
  return (
    <form
      action={accion}
      className="grid gap-2 rounded-[3px] border border-linea bg-white p-3.5 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_1.2fr_auto] lg:items-end"
    >
      <input type="hidden" name="periodo" value={periodo} />
      <input type="hidden" name="codigo" value={ind.codigo} />
      <div className="min-w-0">
        <div className="font-mono text-[10px] tracking-[0.1em] text-acero-claro uppercase">
          {ind.codigo} · {ind.frente}
        </div>
        <div className="text-[14px] font-semibold text-verde">{ind.nombre}</div>
        <div className="mt-0.5 text-[11.5px] text-acero-claro">{ind.fuente}</div>
      </div>

      {deCaja ? (
        <p className="text-[12.5px] text-acero lg:col-span-5">
          Se calcula solo con la hoja <strong>Caja a 13 semanas</strong>: el saldo final semanal más bajo.
        </p>
      ) : (
        <>
          <div className="campo">
            <label htmlFor={`${id}-v`}>{ind.numDesc ?? "Valor"}</label>
            <input id={`${id}-v`} name="valor" inputMode="decimal" defaultValue={ind.valor ?? ""} className={campo} />
          </div>
          {ind.tipo === "razon" ? (
            <div className="campo">
              <label htmlFor={`${id}-d`}>{ind.denDesc}</label>
              <input
                id={`${id}-d`}
                name="denominador"
                inputMode="decimal"
                defaultValue={ind.denominador ?? ""}
                className={campo}
              />
            </div>
          ) : (
            <div className="hidden lg:block" />
          )}
          <div className="campo">
            <label htmlFor={`${id}-m`}>Meta{ind.formato === "pct" ? " (%)" : ""}</label>
            <input
              id={`${id}-m`}
              name="meta"
              inputMode="decimal"
              defaultValue={metaParaCampo(ind.meta, ind.formato)}
              readOnly={!puedeMeta}
              className={`${campo} ${puedeMeta ? "" : "bg-nube"}`}
            />
          </div>
          <div className="campo">
            <label htmlFor={`${id}-r`}>Referencia del corte / evidencia</label>
            <input id={`${id}-r`} name="referencia" defaultValue={ind.referencia ?? ""} className={campo} />
          </div>
          <div className="flex items-center gap-2.5 lg:flex-col lg:items-start">
            <button type="submit" className="btn btn-verde" disabled={pendiente}>
              {pendiente ? "…" : "Guardar"}
            </button>
            <Mensaje estado={estado} />
          </div>
        </>
      )}
    </form>
  );
}

/* ---------------------------------------------------------------- caja */

export function FilaCajaSemana({ fila, periodo }: { fila: FilaCaja; periodo: string }) {
  const [estado, accion, pendiente] = useActionState(guardarCajaSemana, undefined);
  const id = `s-${fila.semana}`;
  return (
    <form
      action={accion}
      className="grid gap-2 rounded-[3px] border border-linea bg-white p-3.5 sm:grid-cols-2 lg:grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1.4fr_auto] lg:items-end"
    >
      <input type="hidden" name="periodo" value={periodo} />
      <input type="hidden" name="semana" value={fila.semana} />
      <div>
        <div className="font-mono text-[10px] tracking-[0.1em] text-acero-claro uppercase">Semana {fila.semana}</div>
        <div className="text-[13px] text-acero">{fila.inicio ? fila.inicio.split("-").reverse().join("/") : "Sin corte"}</div>
      </div>
      <div className="campo">
        <label htmlFor={`${id}-i`}>Caja inicial</label>
        {fila.semana === 1 ? (
          <input id={`${id}-i`} name="cajaInicial" inputMode="decimal" defaultValue={fila.cajaInicial ?? ""} className={campo} />
        ) : (
          <output id={`${id}-i`} className="block py-1.5 text-[13px] text-acero tabular-nums">
            {soles(fila.cajaInicial)}
          </output>
        )}
      </div>
      <div className="campo">
        <label htmlFor={`${id}-c`}>Cobros previstos</label>
        <input id={`${id}-c`} name="cobros" inputMode="decimal" defaultValue={fila.cobros ?? ""} className={campo} />
      </div>
      <div className="campo">
        <label htmlFor={`${id}-p`}>Pagos previstos</label>
        <input id={`${id}-p`} name="pagos" inputMode="decimal" defaultValue={fila.pagos ?? ""} className={campo} />
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[0.1em] text-acero-claro uppercase">Caja final</div>
        <div
          className={`py-1.5 text-[13px] font-semibold tabular-nums ${
            fila.cajaFinal !== null && fila.cajaFinal < 0 ? "text-[#8c382b]" : "text-verde"
          }`}
        >
          {soles(fila.cajaFinal)}
        </div>
      </div>
      <div className="campo">
        <label htmlFor={`${id}-e`}>Evidencia / supuesto</label>
        <input id={`${id}-e`} name="evidencia" defaultValue={fila.evidencia ?? ""} className={campo} />
      </div>
      <div className="flex items-center gap-2.5 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-start">
        <button type="submit" className="btn btn-verde" disabled={pendiente}>
          {pendiente ? "…" : "Guardar"}
        </button>
        <Mensaje estado={estado} />
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- corte */

export function FormCorte({ periodo, corte }: { periodo: string; corte: string | null }) {
  const [estado, accion, pendiente] = useActionState(fijarCorte, undefined);
  return (
    <form action={accion} className="flex flex-wrap items-end gap-2.5">
      <input type="hidden" name="periodo" value={periodo} />
      <div className="campo">
        <label htmlFor="corte">Fecha de corte</label>
        <input id="corte" name="corte" type="date" defaultValue={corte ?? ""} required className={campo} />
      </div>
      <button type="submit" className="btn btn-verde" disabled={pendiente}>
        {pendiente ? "…" : "Fijar corte"}
      </button>
      <Mensaje estado={estado} />
    </form>
  );
}

/* ------------------------------------------------------------- acciones */

export function FormAccion({ accion: a }: { accion?: Accion }) {
  const [estado, enviar, pendiente] = useActionState(guardarAccion, undefined);
  const k = a ? `a${a.id}` : "nueva";
  return (
    <form action={enviar} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {a && <input type="hidden" name="id" value={a.id} />}
      <div className="campo">
        <label htmlFor={`${k}-cod`}>KPI / lote</label>
        <input id={`${k}-cod`} name="codigo" defaultValue={a?.codigo ?? ""} placeholder="F02" required className={campo} />
      </div>
      <div className="campo sm:col-span-2 lg:col-span-3">
        <label htmlFor={`${k}-bre`}>Brecha o decisión</label>
        <input id={`${k}-bre`} name="brecha" defaultValue={a?.brecha ?? ""} required className={campo} />
      </div>
      <div className="campo sm:col-span-2">
        <label htmlFor={`${k}-acc`}>Acción acordada</label>
        <input id={`${k}-acc`} name="accion" defaultValue={a?.accion ?? ""} className={campo} />
      </div>
      <div className="campo">
        <label htmlFor={`${k}-res`}>Responsable</label>
        <input id={`${k}-res`} name="responsable" defaultValue={a?.responsable ?? ""} className={campo} />
      </div>
      <div className="campo">
        <label htmlFor={`${k}-fec`}>Fecha límite</label>
        <input id={`${k}-fec`} name="fechaLimite" type="date" defaultValue={a?.fechaLimite ?? ""} className={campo} />
      </div>
      <div className="campo">
        <label htmlFor={`${k}-est`}>Estado declarado</label>
        <select id={`${k}-est`} name="estado" defaultValue={a?.estado ?? "Abierta"} className={campo}>
          <option>Abierta</option>
          <option>En curso</option>
          <option>Cerrada</option>
        </select>
      </div>
      <div className="campo sm:col-span-2">
        <label htmlFor={`${k}-evi`}>Evidencia de cierre</label>
        <input id={`${k}-evi`} name="evidencia" defaultValue={a?.evidencia ?? ""} className={campo} />
      </div>
      <div className="flex items-center gap-2.5">
        <button type="submit" className="btn btn-verde" disabled={pendiente}>
          {pendiente ? "…" : a ? "Guardar" : "Registrar"}
        </button>
        <Mensaje estado={estado} />
      </div>
    </form>
  );
}
