import Image from "next/image";
import { api } from "@/lib/api";
import { BarrasH, BarrasV, COLOR, Cifra, Dona, Linea, Tarjeta } from "@/components/intranet/graficos";
import { Caja, Chip, Marco } from "@/components/intranet/marco";
import { FormCorte } from "@/components/intranet/tablero-forms";
import { NIVEL_ROL } from "@/lib/auth/roles";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import type { Tono } from "@/lib/intranet-demo";
import {
  enMiles,
  etiquetaMes,
  fechaCorta,
  formatear,
  nombrePeriodo,
  pctCorto,
  periodoValido,
  soles,
  type Indicador,
} from "@/lib/intranet/tablero";

const TONO: Record<Indicador["estado"], Tono> = {
  "En meta": "ok",
  "Fuera de meta": "malo",
  "Sin dato": "neutro",
  "Sin meta": "neutro",
};

type Datos = {
  corte: string | null;
  indicadores: Indicador[];
  series: Record<string, { periodo: string; valor: number }[]>;
  caja: { semana: number; inicio: string | null; cajaFinal: number | null }[];
  accionesPorEstado: Record<string, number>;
  resumen: { fueraDeMeta: number; sinDatoOMeta: number; enMeta: number; accionesVencidas: number | null };
};

const un = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function Page({ searchParams }: PageProps<"/intranet/panel">) {
  const u = await exigir("jefe");
  const sp = await searchParams;
  const periodo = periodoValido(un(sp.periodo));
  const fFrente = un(sp.frente);
  const fEstado = un(sp.estado);
  const fResp = un(sp.responsable);

  const r = await api<Datos>(`/api/tablero?periodo=${periodo}`, { token: await tokenActual() });
  if (!r.ok) {
    return (
      <Marco titulo="Tablero">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const { indicadores: todos, resumen, corte, series, caja, accionesPorEstado } = r.datos;

  const frentes = [...new Set(todos.map((i) => i.frente))];
  const responsables = [...new Set(todos.map((i) => i.responsable).filter((x): x is string => !!x))].sort();
  const vista = todos.filter(
    (i) => (!fFrente || i.frente === fFrente) && (!fEstado || i.estado === fEstado) && (!fResp || i.responsable === fResp),
  );

  const cuenta = (e: Indicador["estado"][]) => vista.filter((i) => e.includes(i.estado)).length;
  const porIndicador = (c: string) => todos.find((i) => i.codigo === c);
  const serie = (c: string) => (series[c] ?? []).map((p) => ({ etiqueta: etiquetaMes(p.periodo), valor: p.valor }));
  const metaDe = (c: string, fmt: (n: number) => string) => {
    const m = porIndicador(c)?.meta;
    return m === null || m === undefined ? null : { valor: m, texto: `meta ${fmt(m)}` };
  };
  const cajaPuntos = caja.filter((f) => f.cajaFinal !== null).map((f) => ({ etiqueta: `S${f.semana}`, valor: f.cajaFinal as number }));
  const cajaMinima = cajaPuntos.length === 13 ? Math.min(...cajaPuntos.map((p) => p.valor)) : null;
  const metaCaja = porIndicador("F03")?.meta;
  const esAdmin = NIVEL_ROL[u.rol] >= NIVEL_ROL.administrador;

  const SEGUIMIENTO_COLOR: Record<string, string> = {
    Cerrada: COLOR.ok,
    "En seguimiento": COLOR.serie,
    Vencida: COLOR.malo,
    "Falta evidencia": COLOR.luz,
    Incompleta: COLOR.neutro,
  };

  const select = "w-full rounded-[3px] border border-linea bg-white px-2 py-1.5 text-[13px] text-acero";

  return (
    <Marco titulo="Control gerencial" bajada={`Cierre de ${nombrePeriodo(periodo)} · corte ${fechaCorta(corte)}`}>
      {/* ---------------------------------------------------- banda de título */}
      <div className="mb-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[10px] bg-verde-hondo px-5 py-3.5">
        <Image src="/img/logo-negativo.png" alt="Qory Laboratorios" width={1400} height={350} className="h-9 w-auto" />
        <p className="text-[clamp(17px,2.4vw,24px)] font-bold tracking-[-0.01em] text-[#f1f5ee]">
          Tablero de control gerencial
        </p>
        <p className="ml-auto font-mono text-[10.5px] tracking-[0.1em] text-[#aebba9] uppercase">
          Uso interno · cierre mensual y revisión semanal
        </p>
      </div>

      {/* ------------------------------------------------------------ filtros */}
      <form method="get" className="mb-3.5 grid grid-cols-2 gap-2.5 rounded-[10px] border border-linea bg-white p-3.5 sm:grid-cols-3 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr_auto]">
        <div className="campo">
          <label htmlFor="f-mes">Mes de cierre</label>
          <input id="f-mes" name="periodo" type="month" defaultValue={periodo} className={select} />
        </div>
        <div className="campo">
          <label htmlFor="f-frente">Frente</label>
          <select id="f-frente" name="frente" defaultValue={fFrente} className={select}>
            <option value="">Todos</option>
            {frentes.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="f-estado">Estado</label>
          <select id="f-estado" name="estado" defaultValue={fEstado} className={select}>
            <option value="">Todos</option>
            {(["En meta", "Fuera de meta", "Sin dato", "Sin meta"] as const).map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="f-resp">Responsable</label>
          <select id="f-resp" name="responsable" defaultValue={fResp} className={select}>
            <option value="">Todos</option>
            {responsables.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex items-end sm:col-span-3 lg:col-span-1">
          <button type="submit" className="btn btn-verde w-full">Aplicar</button>
        </div>
      </form>

      {/* ------------------------------------------------------ cifras clave */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Cifra etiqueta="Indicadores" valor={String(vista.length)} pie={fFrente || fEstado || fResp ? "según filtros" : "en el tablero"} />
        <Cifra etiqueta="En meta" valor={String(cuenta(["En meta"]))} tono="ok" pie="cumplen su meta" />
        <Cifra etiqueta="Fuera de meta" valor={String(cuenta(["Fuera de meta"]))} tono={cuenta(["Fuera de meta"]) ? "alerta" : "normal"} pie="requieren decisión" />
        <Cifra etiqueta="Sin dato o meta" valor={String(cuenta(["Sin dato", "Sin meta"]))} pie="por completar" />
        <Cifra
          etiqueta="Acciones vencidas"
          valor={resumen.accionesVencidas === null ? "—" : String(resumen.accionesVencidas)}
          tono={resumen.accionesVencidas ? "alerta" : "normal"}
          pie={resumen.accionesVencidas === null ? "falta fijar el corte" : "al corte"}
        />
      </div>

      {/* ----------------------------------------------------------- gráficos */}
      <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Tarjeta titulo="Indicadores por estado">
          <Dona
            descripcion={`Indicadores por estado: ${cuenta(["En meta"])} en meta, ${cuenta(["Fuera de meta"])} fuera de meta, ${cuenta(["Sin dato", "Sin meta"])} sin dato o meta.`}
            centro={{ valor: String(vista.length), texto: "indicadores" }}
            partes={[
              { etiqueta: "En meta", valor: cuenta(["En meta"]), color: COLOR.ok },
              { etiqueta: "Fuera de meta", valor: cuenta(["Fuera de meta"]), color: COLOR.malo },
              { etiqueta: "Sin dato o meta", valor: cuenta(["Sin dato", "Sin meta"]), color: COLOR.neutro },
            ]}
          />
        </Tarjeta>

        <Tarjeta titulo="Cumplimiento por frente">
          <BarrasH
            filas={frentes
              .filter((f) => !fFrente || f === fFrente)
              .map((f) => {
                const del = vista.filter((i) => i.frente === f);
                const ok = del.filter((i) => i.estado === "En meta").length;
                return { etiqueta: f, valor: del.length ? ok / del.length : 0, texto: `${ok} de ${del.length}`, color: COLOR.ok };
              })
              .filter((f) => f.texto !== "0 de 0")}
          />
        </Tarjeta>

        <Tarjeta titulo="Ventas netas por mes">
          <BarrasV
            datos={serie("C01")}
            formato={enMiles}
            descripcion={`Ventas netas facturadas por mes, en miles de soles: ${serie("C01").map((d) => `${d.etiqueta} ${enMiles(d.valor)}`).join(", ")}.`}
          />
        </Tarjeta>

        <Tarjeta titulo="Caja a 13 semanas">
          <Linea
            datos={cajaPuntos}
            formato={enMiles}
            umbral={typeof metaCaja === "number" ? { valor: metaCaja, texto: `mínima ${enMiles(metaCaja)}` } : null}
            descripcion={`Saldo final de caja por semana durante 13 semanas. ${cajaMinima === null ? "Faltan semanas por completar." : `El punto más bajo es ${soles(cajaMinima)}.`}`}
          />
        </Tarjeta>
      </div>

      <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Tarjeta titulo="Entregas completas a tiempo">
          <BarrasV
            datos={serie("P01")}
            formato={pctCorto}
            meta={metaDe("P01", pctCorto)}
            descripcion={`Entregas completas a tiempo por mes: ${serie("P01").map((d) => `${d.etiqueta} ${pctCorto(d.valor)}`).join(", ")}.`}
          />
        </Tarjeta>
        <Tarjeta titulo="Margen de contribución">
          <BarrasV
            datos={serie("F01")}
            formato={pctCorto}
            meta={metaDe("F01", pctCorto)}
            descripcion={`Margen de contribución por mes: ${serie("F01").map((d) => `${d.etiqueta} ${pctCorto(d.valor)}`).join(", ")}.`}
          />
        </Tarjeta>
        <Tarjeta titulo="Cartera vencida">
          <BarrasV
            datos={serie("F02")}
            formato={pctCorto}
            meta={metaDe("F02", pctCorto)}
            descripcion={`Cartera vencida sobre el total por cobrar, por mes: ${serie("F02").map((d) => `${d.etiqueta} ${pctCorto(d.valor)}`).join(", ")}.`}
          />
        </Tarjeta>
        <Tarjeta titulo="Acciones por seguimiento">
          <Dona
            descripcion={`Acciones por seguimiento: ${Object.entries(accionesPorEstado).map(([k, v]) => `${k} ${v}`).join(", ") || "ninguna"}.`}
            centro={{ valor: String(Object.values(accionesPorEstado).reduce((a, b) => a + b, 0)), texto: "acciones" }}
            partes={Object.entries(accionesPorEstado).map(([k, v]) => ({ etiqueta: k, valor: v, color: SEGUIMIENTO_COLOR[k] ?? COLOR.neutro }))}
          />
        </Tarjeta>
      </div>

      {/* --------------------------------------------------------------- tabla */}
      <Caja titulo={`Detalle de indicadores · ${vista.length}`} className="mt-3.5">
        <div className="tabla border-0">
          <table className="min-w-[760px] text-[13px]">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Frente</th>
                <th scope="col">Indicador</th>
                <th scope="col" className="text-right">Resultado</th>
                <th scope="col" className="text-right">Meta</th>
                <th scope="col">Estado</th>
                <th scope="col">Decisión que informa</th>
                <th scope="col">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {vista.map((i) => (
                <tr key={i.codigo}>
                  <td className="font-mono whitespace-nowrap">{i.codigo}</td>
                  <td className="whitespace-nowrap text-acero">{i.frente}</td>
                  <td className="font-medium">{i.nombre}</td>
                  <td className="text-right font-mono whitespace-nowrap tabular-nums">{formatear(i.resultado, i.formato)}</td>
                  <td className="text-right font-mono whitespace-nowrap tabular-nums text-acero-claro">
                    {i.meta === null ? "—" : `${i.sentido === "menor" ? "≤ " : "≥ "}${formatear(i.meta, i.formato)}`}
                  </td>
                  <td>
                    <Chip tono={TONO[i.estado]}>{i.estado}</Chip>
                  </td>
                  <td className="text-acero">{i.decision}</td>
                  <td className="whitespace-nowrap text-acero">{i.responsable}</td>
                </tr>
              ))}
              {vista.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-acero-claro">Ningún indicador cumple los filtros.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Caja>

      {esAdmin && (
        <Caja titulo="Corte del mes" className="mt-3.5">
          <FormCorte periodo={periodo} corte={corte} />
          <p className="mt-2 text-[12px] text-acero-claro">
            El corte fija la fecha desde la que se evalúan los vencimientos y arranca la proyección de caja.
          </p>
        </Caja>
      )}
    </Marco>
  );
}
