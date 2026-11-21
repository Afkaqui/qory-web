// Carga las definiciones del modelo desde db/privado/modelo.json (no versionado).
// Uso: node scripts/sembrar.mjs
import { readFileSync } from "node:fs";
import pg from "pg";

const modelo = JSON.parse(readFileSync(new URL("../db/privado/modelo.json", import.meta.url), "utf8"));
const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
await cliente.connect();
try {
  await cliente.query("BEGIN");
  for (const i of modelo.indicadores) {
    await cliente.query(
      `INSERT INTO indicadores (codigo, orden, frente, nombre, num_desc, den_desc, tipo, formato, sentido, meta_defecto, fuente, decision, responsable)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (codigo) DO UPDATE SET orden=$2, frente=$3, nombre=$4, num_desc=$5, den_desc=$6, tipo=$7, formato=$8,
         sentido=$9, meta_defecto=$10, fuente=$11, decision=$12, responsable=$13`,
      [i.codigo, i.orden, i.frente, i.nombre, i.num_desc, i.den_desc, i.tipo, i.formato, i.sentido, i.meta_defecto, i.fuente, i.decision, i.responsable],
    );
  }
  for (const clave of ["conectores", "modelo", "evidencia", "notas"]) {
    await cliente.query(
      "INSERT INTO contenido (clave, datos) VALUES ($1,$2) ON CONFLICT (clave) DO UPDATE SET datos = $2",
      [clave, JSON.stringify(modelo[clave])],
    );
  }
  await cliente.query("COMMIT");
  console.log(`Sembrados ${modelo.indicadores.length} indicadores y ${4} bloques de referencia.`);
} catch (e) {
  await cliente.query("ROLLBACK");
  throw e;
} finally {
  await cliente.end();
}
