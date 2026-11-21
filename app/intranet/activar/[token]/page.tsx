import Link from "next/link";
import { FormActivar } from "@/components/intranet/formularios";

export default async function Page({ params }: PageProps<"/intranet/activar/[token]">) {
  const { token } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center bg-hueso px-6 py-12">
      <div className="w-full max-w-[400px]">
        <h1 className="text-[22px] text-verde">Define tu contraseña</h1>
        <p className="mt-2 text-[14.5px] text-acero">
          Es la primera vez que ingresas, o un administrador te pidió cambiarla. Este enlace sirve
          una sola vez.
        </p>
        <FormActivar token={token} />
        <p className="mt-6">
          <Link className="text-[13px] text-acero-claro hover:text-hoja-txt" href="/intranet">
            ← Volver al ingreso
          </Link>
        </p>
      </div>
    </div>
  );
}
