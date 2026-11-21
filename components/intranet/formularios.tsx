"use client";

import { useActionState, useState } from "react";
import { activar, crearUsuario, ingresar, nuevoEnlace, type Estado } from "@/app/intranet/actions";
import { NOMBRE_ROL, type Rol } from "@/lib/auth/roles";

function Aviso({ estado }: { estado: Estado }) {
  if (!estado?.error) return null;
  return (
    <p role="alert" className="rounded-[3px] bg-[#f4e2de] px-3 py-2 text-[13.5px] text-[#8c382b]">
      {estado.error}
    </p>
  );
}

/** Muestra el enlace una sola vez, con botón de copiar. Es lo que se entrega a la persona. */
export function EnlaceEmitido({ estado }: { estado: Estado }) {
  const [copiado, setCopiado] = useState(false);
  if (!estado?.enlace) return null;
  return (
    <div className="aviso" role="status">
      <span className="aviso-tag">Enlace</span>
      {estado.ok} Cópialo y envíaselo por un canal privado; <strong>no se vuelve a mostrar</strong>.
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input readOnly value={estado.enlace} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 font-mono text-[12px]" aria-label="Enlace de activación" />
        <button
          type="button"
          className="btn btn-verde"
          onClick={async () => {
            await navigator.clipboard.writeText(estado.enlace!);
            setCopiado(true);
          }}
        >
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}

export function FormIngreso() {
  const [estado, accion, pendiente] = useActionState(ingresar, undefined);
  return (
    <form action={accion} className="mt-6 grid gap-4">
      <div className="campo">
        <label htmlFor="email">Correo</label>
        <input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="campo">
        <label htmlFor="clave">Contraseña</label>
        <input id="clave" name="clave" type="password" autoComplete="current-password" required />
      </div>
      <Aviso estado={estado} />
      <button type="submit" className="btn btn-verde" disabled={pendiente}>
        {pendiente ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}

export function FormActivar({ token }: { token: string }) {
  const [estado, accion, pendiente] = useActionState(activar.bind(null, token), undefined);
  return (
    <form action={accion} className="mt-6 grid gap-4">
      <div className="campo">
        <label htmlFor="clave">Contraseña nueva</label>
        <input id="clave" name="clave" type="password" autoComplete="new-password" minLength={10} required />
        <span className="ayuda">Mínimo 10 caracteres. Una frase larga es mejor que una palabra con símbolos.</span>
      </div>
      <div className="campo">
        <label htmlFor="repetida">Repite la contraseña</label>
        <input id="repetida" name="repetida" type="password" autoComplete="new-password" minLength={10} required />
      </div>
      <Aviso estado={estado} />
      <button type="submit" className="btn btn-verde" disabled={pendiente}>
        {pendiente ? "Guardando…" : "Definir contraseña y entrar"}
      </button>
    </form>
  );
}

export function FormNuevoUsuario({ roles }: { roles: Rol[] }) {
  const [estado, accion, pendiente] = useActionState(crearUsuario, undefined);
  return (
    <form action={accion} className="grid gap-4">
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" placeholder="Nombre y apellido" required />
      </div>
      <div className="campo">
        <label htmlFor="email-nuevo">Correo</label>
        <input id="email-nuevo" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="campo">
          <label htmlFor="rol">Rol</label>
          <select id="rol" name="rol" defaultValue={roles[roles.length - 1]}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {NOMBRE_ROL[r]}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label htmlFor="area">Área</label>
          <input id="area" name="area" type="text" placeholder="Producción" />
        </div>
      </div>
      <Aviso estado={estado} />
      <EnlaceEmitido estado={estado} />
      <button type="submit" className="btn btn-verde" disabled={pendiente}>
        {pendiente ? "Creando…" : "Crear usuario"}
      </button>
    </form>
  );
}

/** Botón por fila: emite un enlace nuevo (para quien olvidó su clave o no activó a tiempo). */
export function BotonEnlace({ id }: { id: string }) {
  const [estado, accion, pendiente] = useActionState(nuevoEnlace, undefined);
  return (
    <form action={accion} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pendiente} className="text-[12.5px] text-hoja-txt underline underline-offset-2">
        {pendiente ? "…" : "Enlace nuevo"}
      </button>
      {estado?.error && <span role="alert" className="ml-2 text-[12px] text-[#8c382b]">{estado.error}</span>}
      {estado?.enlace && (
        <div className="mt-2 w-[min(420px,80vw)]">
          <EnlaceEmitido estado={estado} />
        </div>
      )}
    </form>
  );
}
