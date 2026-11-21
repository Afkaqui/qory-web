/**
 * Navegación y niveles de la intranet. (El nombre viene de la maqueta original;
 * ya no hay datos de ejemplo aquí.)
 */

export type RolDemo = "operario" | "jefe" | "encargado";
export type Tono = "ok" | "curso" | "alerta" | "malo" | "neutro";

export const ROLES: { id: RolDemo; nombre: string; quien: string }[] = [
  { id: "operario", nombre: "Operario", quien: "Registra su trabajo" },
  { id: "jefe", nombre: "Jefe de área", quien: "Captura y da seguimiento" },
  { id: "encargado", nombre: "Administración", quien: "Control total" },
];

export const NAV: {
  href: string;
  texto: string;
  desde: RolDemo;
  grupo: "Captura" | "Gestión" | "Dirección";
}[] = [
  { href: "/intranet/panel", texto: "Tablero", desde: "jefe", grupo: "Gestión" },
  { href: "/intranet/captura", texto: "Captura mensual", desde: "jefe", grupo: "Captura" },
  { href: "/intranet/caja", texto: "Caja a 13 semanas", desde: "jefe", grupo: "Captura" },
  { href: "/intranet/acciones", texto: "Acciones", desde: "jefe", grupo: "Gestión" },
  { href: "/intranet/referencias", texto: "Fuentes y modelo", desde: "encargado", grupo: "Dirección" },
  { href: "/intranet/usuarios", texto: "Usuarios", desde: "encargado", grupo: "Dirección" },
  { href: "/intranet/auditoria", texto: "Auditoría", desde: "encargado", grupo: "Dirección" },
];

export const NIVEL: Record<RolDemo, number> = { operario: 1, jefe: 2, encargado: 3 };
