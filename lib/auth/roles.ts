export type Rol = "superadmin" | "administrador" | "jefe" | "operario";

export const NIVEL_ROL: Record<Rol, number> = { operario: 1, jefe: 2, administrador: 3, superadmin: 4 };

export const NOMBRE_ROL: Record<Rol, string> = {
  superadmin: "Super administrador",
  administrador: "Administrador",
  jefe: "Jefe de área",
  operario: "Operario",
};

/** Roles que puede asignar quien actúa: un administrador no crea administradores ni superadmins. */
export function rolesAsignables(actor: Rol): Rol[] {
  if (actor === "superadmin") return ["superadmin", "administrador", "jefe", "operario"];
  if (actor === "administrador") return ["jefe", "operario"];
  return [];
}

/** Puede gestionar a un usuario de ese rol (desactivar, reenviar enlace). */
export function puedeGestionar(actor: Rol, objetivo: Rol): boolean {
  if (actor === "superadmin") return true;
  if (actor === "administrador") return objetivo === "jefe" || objetivo === "operario";
  return false;
}
