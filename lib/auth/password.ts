import { randomBytes, scrypt as _scrypt, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt) as (p: string, s: Buffer, n: number) => Promise<Buffer>;

export async function hashClave(clave: string): Promise<string> {
  const sal = randomBytes(16);
  const hash = await scrypt(clave, sal, 64);
  return `scrypt$${sal.toString("hex")}$${hash.toString("hex")}`;
}

export async function verificarClave(clave: string, guardado: string | null): Promise<boolean> {
  if (!guardado) return false;
  const [tipo, sal, hash] = guardado.split("$");
  if (tipo !== "scrypt" || !sal || !hash) return false;
  const calculado = await scrypt(clave, Buffer.from(sal, "hex"), 64);
  const esperado = Buffer.from(hash, "hex");
  return calculado.length === esperado.length && timingSafeEqual(calculado, esperado);
}

/** Token aleatorio para cookies y enlaces; en la base solo se guarda su hash. */
export const nuevoToken = () => randomBytes(32).toString("base64url");
export const hashToken = (t: string) => createHash("sha256").update(t).digest("hex");

/** Mínimo razonable: 10 caracteres, sin exigir símbolos raros. */
export function validarClave(clave: string): string | null {
  if (clave.length < 10) return "La contraseña debe tener al menos 10 caracteres.";
  if (clave.length > 200) return "La contraseña es demasiado larga.";
  return null;
}
