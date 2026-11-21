// Aplica db/schema.sql. Uso: node --env-file=.env scripts/migrar.mjs
import { readFileSync } from "node:fs";
import pg from "pg";

const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
await cliente.connect();
await cliente.query(readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
await cliente.end();
console.log("Esquema aplicado.");
