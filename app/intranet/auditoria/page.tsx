import { exigir, tokenActual } from "@/lib/auth/sesion";
import { Caja, Marco } from "@/components/intranet/marco";
import { api } from "@/lib/api";

export default async function Page() {
  await exigir("administrador");
  const r = await api<{
    registros: { id: number; cuando: string; actor: string; accion: string; objetivo: string | null; detalle: string | null }[];
  }>("/api/auditoria", { token: await tokenActual() });
  const rows = r.ok ? r.datos.registros : [];
  return (
    <Marco
      titulo="Auditoría"
      bajada="Quién hizo qué y cuándo. Es el registro que una inspección pide y el que hace que un sistema digital sirva como evidencia en lugar de convertirse en un problema."
    >
      <div className="grid gap-3.5">
        <Caja titulo="Últimos movimientos">
          <div className="tabla border-0">
            <table className="min-w-[640px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Fecha y hora</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Acción</th>
                  <th scope="col">Sobre</th>
                  <th scope="col">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id}>
                    <td className="font-mono whitespace-nowrap text-acero-claro">
                      {new Date(a.cuando).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short", timeZone: "America/Lima" })}
                    </td>
                    <td className="whitespace-nowrap">{a.actor}</td>
                    <td className="font-medium">{a.accion.replaceAll("_", " ")}</td>
                    <td className="whitespace-nowrap">{a.objetivo ?? "—"}</td>
                    <td className="text-acero">{a.detalle ?? "—"}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-acero-claro">Aún no hay movimientos.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Caja>

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
          <div className="aviso">
            <span className="aviso-tag">Nada se borra</span>
            Los registros no se eliminan ni se sobrescriben. Una corrección crea una versión
            nueva que conserva la anterior, con autor, fecha, hora y motivo.
          </div>
          <div className="aviso">
            <span className="aviso-tag">La hora es del servidor</span>
            No la del equipo desde el que se registra. Nadie puede antedatar un parte ni
            registrar en nombre de otra persona.
          </div>
          <div className="aviso">
            <span className="aviso-tag">Ni los administradores la editan</span>
            Esta bitácora es de solo lectura para todos los roles. Se consulta y se exporta;
            no se modifica.
          </div>
        </div>
      </div>
    </Marco>
  );
}
