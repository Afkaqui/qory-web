import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // pg usa módulos nativos opcionales: que Next no intente empaquetarlo.
  serverExternalPackages: ["pg"],
  async redirects() {
    // En Vercel (sitio público) la intranet no vive aquí: se manda al servidor propio.
    const destino = process.env.INTRANET_ORIGIN;
    return destino
      ? [{ source: "/intranet/:path*", destination: `${destino}/intranet/:path*`, permanent: false }]
      : [];
  },
};

export default nextConfig;
