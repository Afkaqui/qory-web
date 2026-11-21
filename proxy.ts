import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirección optimista: sin cookie de sesión no se entra a las páginas internas.
 * No es la defensa real (la cookie podría ser falsa): cada página y cada acción
 * vuelve a comprobar la sesión en la base con `exigir()`.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const libre = pathname === "/intranet" || pathname.startsWith("/intranet/activar");
  if (!libre && !req.cookies.get("qory_sesion")) {
    return NextResponse.redirect(new URL("/intranet", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/intranet/:path*" };
