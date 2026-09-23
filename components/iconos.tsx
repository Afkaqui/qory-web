/**
 * Juego de iconos.
 *
 * Monolineales de trazo fino para que acompañen a los filetes del sistema sin
 * competir con ellos. Los de redes van rellenos porque son marcas ajenas y
 * deben reconocerse tal cual.
 *
 * Todos heredan el color del texto y van marcados como decorativos: el
 * significado siempre lo lleva la palabra que va al lado, nunca el símbolo
 * solo.
 */

type Props = { className?: string; size?: number };

function Base({
  children,
  className = "",
  size = 14,
  relleno = false,
}: Props & { children: React.ReactNode; relleno?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill={relleno ? "currentColor" : "none"}
      stroke={relleno ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const Telefono = (p: Props) => (
  <Base {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </Base>
);

export const Correo = (p: Props) => (
  <Base {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Base>
);

export const Reloj = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Base>
);

export const Ubicacion = (p: Props) => (
  <Base {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const Candado = (p: Props) => (
  <Base {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="1.6" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </Base>
);

export const Whatsapp = (p: Props) => (
  <Base {...p} relleno>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.3 5.3 0 0 0 3.3.6 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
  </Base>
);

export const LinkedIn = (p: Props) => (
  <Base {...p} relleno>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 21h4V9.5H3V21Zm7-11.5V21h4v-6.2c0-1.7.8-2.6 2.1-2.6 1.2 0 1.9.8 1.9 2.6V21h4v-6.9c0-3.5-1.9-5.1-4.4-5.1a3.8 3.8 0 0 0-3.6 2V9.5h-4Z" />
  </Base>
);

export const Facebook = (p: Props) => (
  <Base {...p} relleno>
    <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.3 3 10.2 4.6 10.2 7v2H8v3h2.2v9h3.8v-9h2.6l.4-3H14Z" />
  </Base>
);

export const Instagram = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </Base>
);

export const Flecha = (p: Props) => (
  <Base {...p}>
    <path d="M5 12h13m-5-6 6 6-6 6" />
  </Base>
);
