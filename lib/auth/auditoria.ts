import "server-only";
import { pool } from "@/lib/db";

export async function auditar(
  actor: { id: string; email: string } | null,
  accion: string,
  objetivo?: string,
  detalle?: string,
) {
  await pool.query(
    "INSERT INTO auditoria (actor_id, actor, accion, objetivo, detalle) VALUES ($1,$2,$3,$4,$5)",
    [actor?.id ?? null, actor?.email ?? "sistema", accion, objetivo ?? null, detalle ?? null],
  );
}
