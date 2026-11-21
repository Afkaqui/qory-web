// Emite un enlace nuevo de activación para un usuario existente (anula los anteriores).
// Uso: node scripts/enlace.mjs <correo>
import { createHash, randomBytes } from "node:crypto";
import pg from "pg";

const email = process.argv[2]?.toLowerCase();
if (!email) {
  console.error("Uso: enlace.mjs <correo>");
  process.exit(1);
}
const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
await cliente.connect();
try {
  const { rows } = await cliente.query("SELECT id FROM usuarios WHERE lower(email) = $1 AND activo", [email]);
  if (!rows[0]) throw new Error("No existe un usuario activo con ese correo.");
  const token = randomBytes(32).toString("base64url");
  await cliente.query("DELETE FROM enlaces WHERE usuario_id = $1 AND usado_en IS NULL", [rows[0].id]);
  await cliente.query(
    "INSERT INTO enlaces (token_hash, usuario_id, tipo, expira_en) VALUES ($1,$2,'activacion', now() + interval '72 hours')",
    [createHash("sha256").update(token).digest("hex"), rows[0].id],
  );
  await cliente.query("INSERT INTO auditoria (actor, accion, objetivo) VALUES ('sistema','enlace_emitido',$1)", [email]);
  console.log(`${process.env.WEB_URL ?? "https://www.qorylab.pe"}/intranet/activar/${token}`);
} finally {
  await cliente.end();
}
