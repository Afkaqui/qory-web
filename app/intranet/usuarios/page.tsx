import { cambiarEstado } from "@/app/intranet/actions";
import { BotonEnlace, FormNuevoUsuario } from "@/components/intranet/formularios";
import { Caja, Chip, Marco } from "@/components/intranet/marco";
import { api } from "@/lib/api";
import { exigir, tokenActual } from "@/lib/auth/sesion";
import { NOMBRE_ROL, type Rol } from "@/lib/auth/roles";

const ROL_TONO = { superadmin: "ok", administrador: "ok", jefe: "curso", operario: "neutro" } as const;

const fecha = (d: string | null) =>
  d ? new Date(d).toLocaleString("es-PE", { dateStyle: "short", timeStyle: "short", timeZone: "America/Lima" }) : "—";

export default async function Page() {
  await exigir("administrador");
  const r = await api<{
    roles: Rol[];
    usuarios: {
      id: string;
      nombre: string;
      email: string;
      rol: Rol;
      area: string | null;
      celular: string | null;
      activo: boolean;
      con_clave: boolean;
      ultimo_ingreso: string | null;
      gestionable: boolean;
    }[];
  }>("/api/usuarios", { token: await tokenActual() });
  if (!r.ok) {
    return (
      <Marco titulo="Usuarios">
        <p role="alert" className="text-[#8c382b]">{r.error}</p>
      </Marco>
    );
  }
  const { usuarios: rows, roles } = r.datos;
  const activos = rows.filter((u) => u.activo).length;

  return (
    <Marco
      titulo="Usuarios"
      bajada="Alta, baja y rol de cada persona. Cada cambio queda en la bitácora de auditoría."
    >
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Caja titulo={`Personas con acceso · ${activos} activas`}>
          <div className="tabla border-0">
            <table className="min-w-[620px] text-[13px]">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Último ingreso</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => {
                  const gestionable = u.gestionable;
                  return (
                    <tr key={u.id} className={u.activo ? "" : "opacity-60"}>
                      <td>
                        <div className="font-medium">{u.nombre}</div>
                        <div className="font-mono text-[11.5px] text-acero-claro">{u.email}</div>
                        {u.celular && <div className="font-mono text-[11.5px] text-acero-claro">{u.celular.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}</div>}
                      </td>
                      <td>
                        <Chip tono={ROL_TONO[u.rol]}>{NOMBRE_ROL[u.rol]}</Chip>
                        {u.area && <div className="mt-1 text-[11.5px] text-acero-claro">{u.area}</div>}
                      </td>
                      <td>
                        <Chip tono={!u.activo ? "neutro" : u.con_clave ? "ok" : "alerta"}>
                          {!u.activo ? "Inactivo" : u.con_clave ? "Activo" : "Sin activar"}
                        </Chip>
                      </td>
                      <td className="font-mono text-[12px] whitespace-nowrap">{fecha(u.ultimo_ingreso)}</td>
                      <td>
                        {gestionable ? (
                          <div className="grid gap-1.5">
                            {u.activo && <BotonEnlace id={u.id} />}
                            <form action={cambiarEstado}>
                              <input type="hidden" name="id" value={u.id} />
                              <input type="hidden" name="activo" value={u.activo ? "0" : "1"} />
                              <button type="submit" className="text-[12.5px] text-acero underline underline-offset-2">
                                {u.activo ? "Desactivar" : "Reactivar"}
                              </button>
                            </form>
                          </div>
                        ) : (
                          <span className="text-acero-claro">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="aviso mt-4">
            <span className="aviso-tag">Regla</span>
            Un usuario <strong>no se borra, se desactiva</strong>. Si se borrara, los registros que
            esa persona hizo quedarían sin autor y la trazabilidad se rompería. Siempre debe quedar al
            menos un super administrador activo.
          </div>
        </Caja>

        <Caja titulo="Nuevo usuario">
          <FormNuevoUsuario roles={roles} />
          <p className="mt-3 text-[12.5px] text-acero-claro">
            Al crear la cuenta se genera un enlace de activación, válido 72 horas y de un solo uso.
            La persona define ahí su propia contraseña: nadie más la conoce.
          </p>
        </Caja>
      </div>
    </Marco>
  );
}
