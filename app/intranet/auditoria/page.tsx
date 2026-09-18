import { Caja, Marco } from "@/components/intranet/marco";
import { AUDITORIA } from "@/lib/intranet-demo";

export default function Page() {
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
                {AUDITORIA.map((a) => (
                  <tr key={`${a.fecha}-${a.accion}`}>
                    <td className="font-mono whitespace-nowrap text-acero-claro">{a.fecha}</td>
                    <td className="whitespace-nowrap">{a.usuario}</td>
                    <td className="font-medium">{a.accion}</td>
                    <td className="whitespace-nowrap">{a.entidad}</td>
                    <td className="text-acero">{a.detalle}</td>
                  </tr>
                ))}
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
            <span className="aviso-tag">Ni los encargados la editan</span>
            Esta bitácora es de solo lectura para todos los roles. Se consulta y se exporta;
            no se modifica.
          </div>
        </div>
      </div>
    </Marco>
  );
}
