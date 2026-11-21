// Crea un usuario desde la terminal y escribe su enlace de activación.
// Sirve para el primer superadmin (la web exige uno para entrar).
// Uso: node --env-file=.env scripts/crear-usuario.mjs <correo> "<Nombre Apellido>" <rol> [area]
import { createHash, randomBytes } from "node:crypto";
import pg from "pg";

const [email, nombre, rol, area] = process.argv.slice(2);
const ROLES = ["superadmin", "administrador", "jefe", "operario"];
if (!email || !nombre || !ROLES.includes(rol)) {
  console.error('Uso: crear-usuario.mjs <correo> "<Nombre>" <superadmin|administrador|jefe|operario> [area]');
  process.exit(1);
}

const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
await cliente.connect();
try {
  const { rows } = await cliente.query(
    "INSERT INTO usuarios (email, nombre, rol, area) VALUES ($1,$2,$3,$4) RETURNING id",
    [email.toLowerCase(), nombre, rol, area ?? null],
  );
  const token = randomBytes(32).toString("base64url");
  await cliente.query(
    "INSERT INTO enlaces (token_hash, usuario_id, tipo, expira_en) VALUES ($1,$2,'activacion', now() + interval '72 hours')",
    [createHash("sha256").update(token).digest("hex"), rows[0].id],
  );
  await cliente.query(
    "INSERT INTO auditoria (actor, accion, objetivo, detalle) VALUES ('sistema','usuario_creado',$1,$2)",
    [email.toLowerCase(), `rol ${rol} (por script)`],
  );
  console.log(`Usuario creado: ${nombre} <${email}> · ${rol}`);
  console.log(`Enlace de activación (72 h, un solo uso):\n${process.env.WEB_URL ?? "https://www.qorylab.pe"}/intranet/activar/${token}`);
} finally {
  await cliente.end();
}
