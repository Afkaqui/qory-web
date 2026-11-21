import "server-only";
import { Pool } from "pg";

const globalPool = globalThis as unknown as { __qoryPool?: Pool };

/** Un solo pool por proceso (también en desarrollo, donde se recarga el módulo). */
export const pool =
  globalPool.__qoryPool ??
  (globalPool.__qoryPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 8 }));
