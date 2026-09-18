import { Caja, Chip, FormularioMaqueta, Marco } from "@/components/intranet/marco";
import { USUARIOS } from "@/lib/intranet-demo";

const ROL_TONO = {
  Encargado: "ok",
  "Jefe de área": "curso",
  Operario: "neutro",
} as const;

export default function Page() {
  return (
    <Marco
      titulo="Usuarios"
      bajada="Alta, baja y rol de cada persona. Solo los encargados entran aquí, y cada cambio queda en la bitácora de auditoría."
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Caja titulo={`Personas con acceso · ${USUARIOS.filter((u) => u.activo).length} activas`}>
          <div className="tabla border-0">
            <table className="min-w-[540px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Área</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {USUARIOS.map((u) => (
                  <tr key={u.codigo} className={u.activo ? "" : "opacity-60"}>
                    <td className="font-mono whitespace-nowrap">{u.codigo}</td>
                    <td className="font-medium">{u.nombre}</td>
                    <td>
                      <Chip tono={ROL_TONO[u.rol as keyof typeof ROL_TONO]}>{u.rol}</Chip>
                    </td>
                    <td>{u.area}</td>
                    <td>
                      <Chip tono={u.activo ? "ok" : "neutro"}>{u.activo ? "Activo" : "Inactivo"}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="aviso mt-4">
            <span className="aviso-tag">Regla</span>
            Un usuario <strong>no se borra, se desactiva</strong>. Si se borrara, los registros que
            esa persona hizo quedarían sin autor y la trazabilidad se rompería.
          </div>
        </Caja>

        <Caja titulo="Nuevo usuario">
          <FormularioMaqueta boton="Crear usuario">
            <div className="grid grid-cols-2 gap-4">
              <div className="campo">
                <label htmlFor="codigo">Código</label>
                <input id="codigo" name="codigo" type="text" placeholder="OP03" />
                <span className="ayuda">El del fotocheck.</span>
              </div>
              <div className="campo">
                <label htmlFor="rol">Rol</label>
                <select id="rol" name="rol" defaultValue="Operario">
                  <option>Operario</option>
                  <option>Jefe de área</option>
                  <option>Encargado</option>
                </select>
              </div>
            </div>
            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" placeholder="Nombre y apellido" />
            </div>
            <div className="campo">
              <label htmlFor="area">Área</label>
              <select id="area" name="area" defaultValue="Producción">
                <option>Producción</option>
                <option>Calidad</option>
                <option>Almacén</option>
                <option>Servicios</option>
                <option>Ventas</option>
                <option>Administración</option>
                <option>Gerencia</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="clave">Contraseña inicial</label>
              <input id="clave" name="clave" type="text" placeholder="La cambia al primer ingreso" />
            </div>
          </FormularioMaqueta>
        </Caja>
      </div>
    </Marco>
  );
}
