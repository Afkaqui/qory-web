import { tokenDe } from "@/lib/servidor/http";
import { cerrarSesion } from "@/lib/servidor/servicio";

export async function POST(req: Request) {
  const token = tokenDe(req);
  if (token) await cerrarSesion(token);
  return Response.json({}, { headers: { "Cache-Control": "no-store" } });
}
