import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirección optimista: sin cookie de sesión no se entra a las páginas internas.
 * No es la defensa real (la cookie podría ser falsa): cada página y cada acción
 * vuelve a comprobar la sesión en la base con `exigir()`.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // En el servidor del backend (api.qorylab.pe) solo existe /api: la interfaz vive en la web.
  if (process.env.MODO === "api") {
    return pathname.startsWith("/api/") ? NextResponse.next() : new NextResponse("Not found", { status: 404 });
  }
  // En la web pública el backend no existe: /api responde solo en el servidor propio.
  if (pathname.startsWith("/api/")) return new NextResponse("Not found", { status: 404 });
  if (!pathname.startsWith("/intranet")) return NextResponse.next();
  const libre = pathname === "/intranet" || pathname.startsWith("/intranet/activar");
  if (!libre && !req.cookies.get("qory_sesion")) {
    return NextResponse.redirect(new URL("/intranet", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
