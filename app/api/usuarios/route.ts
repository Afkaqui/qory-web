import { autenticar, cuerpo, responder } from "@/lib/servidor/http";
import { crearUsuario, listarUsuarios } from "@/lib/servidor/servicio";

export async function GET(req: Request) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  return responder(await listarUsuarios(a.usuario));
}

export async function POST(req: Request) {
  const a = await autenticar(req, "administrador");
  if ("respuesta" in a) return a.respuesta;
  const d = await cuerpo<{ email: string; nombre: string; rol: string; area: string; celular: string }>(req);
  return responder(
    await crearUsuario(a.usuario, {
      email: String(d.email ?? ""),
      nombre: String(d.nombre ?? ""),
      rol: String(d.rol ?? ""),
      area: String(d.area ?? ""),
      celular: String(d.celular ?? ""),
    }),
  );
}
