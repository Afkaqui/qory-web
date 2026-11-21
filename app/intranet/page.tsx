import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EMPRESA } from "@/lib/empresa";
import { FormIngreso } from "@/components/intranet/formularios";
import { usuarioActual } from "@/lib/auth/sesion";

export default async function Page() {
  if (await usuarioActual()) redirect("/intranet/panel");
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      {/* lado de marca */}
      <section className="flex flex-col justify-between bg-verde-hondo px-6 py-10 sm:px-12 lg:py-14">
        <Link href="/" className="inline-flex w-fit">
          <Image
            src="/img/logo-negativo.png"
            alt="Qory Laboratorios"
            width={1400}
            height={350}
            className="h-11 w-auto"
          />
        </Link>

        <div className="my-10 max-w-[46ch]">
          <span className="eyebrow eyebrow-luz">Acceso interno</span>
          <h1 className="mt-3.5 text-[clamp(28px,4.4vw,44px)] text-[#f1f5ee]">
            Lo que pasa en planta,
            <br />
            registrado donde pasa.
          </h1>
          <p className="mt-4 text-[15.5px] text-[#aebba9]">
            Partes de producción, control de calidad, tareas y personas. Cada registro
            queda con su autor y su hora, y alimenta el tablero sin que nadie transcriba
            papeles.
          </p>
          <ul className="check check-luz mt-6">
            <li>Los operarios registran desde las tabletas de planta.</li>
            <li>Los jefes de área validan y ven su área.</li>
            <li>Los administradores ven el tablero completo.</li>
          </ul>
        </div>

        <p className="font-mono text-[10.5px] tracking-[0.1em] text-[#7e8d7c] uppercase">
          {EMPRESA.razon} · Uso exclusivo del personal autorizado
        </p>
      </section>

      {/* lado de ingreso */}
      <section className="flex items-center justify-center bg-hueso px-6 py-12 sm:px-10">
        <div className="w-full max-w-[400px]">
          <h2 className="text-[22px] text-verde">Ingresar</h2>
          <p className="mt-2 text-[14.5px] text-acero">
            Con tu correo y la contraseña que definiste al activar tu cuenta.
          </p>

          <FormIngreso />

          <div className="mt-6 border-t border-linea pt-5">
            <p className="text-[13.5px] text-acero">
              ¿Primera vez? Usa el enlace de activación que te envió un administrador.
            </p>
          </div>

          <p className="mt-6 text-[13px] text-acero-claro">
            ¿Problemas para ingresar? Escribe a{" "}
            <a className="text-hoja-txt" href={`mailto:${EMPRESA.correo}`}>
              {EMPRESA.correo}
            </a>
            .
          </p>
          <p className="mt-4">
            <Link className="text-[13px] text-acero-claro hover:text-hoja-txt" href="/">
              ← Volver al sitio público
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
