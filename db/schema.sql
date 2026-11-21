-- Esquema de la intranet de Qory. Idempotente: se puede ejecutar varias veces.

CREATE TABLE IF NOT EXISTS usuarios (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text NOT NULL,
  nombre          text NOT NULL,
  rol             text NOT NULL CHECK (rol IN ('superadmin','administrador','jefe','operario')),
  area            text,
  activo          boolean NOT NULL DEFAULT true,
  clave_hash      text,
  intentos        integer NOT NULL DEFAULT 0,
  bloqueado_hasta timestamptz,
  creado_por      uuid REFERENCES usuarios(id),
  creado_en       timestamptz NOT NULL DEFAULT now(),
  ultimo_ingreso  timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS usuarios_email_unico ON usuarios (lower(email));

CREATE TABLE IF NOT EXISTS sesiones (
  token_hash  text PRIMARY KEY,
  usuario_id  uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  creada_en   timestamptz NOT NULL DEFAULT now(),
  expira_en   timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS sesiones_usuario ON sesiones (usuario_id);

-- Enlaces de activación y de cambio de clave: de un solo uso, guardados como hash.
CREATE TABLE IF NOT EXISTS enlaces (
  token_hash  text PRIMARY KEY,
  usuario_id  uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo        text NOT NULL CHECK (tipo IN ('activacion','reset')),
  expira_en   timestamptz NOT NULL,
  usado_en    timestamptz
);

-- Bitácora: solo se agrega, nunca se edita ni se borra.
CREATE TABLE IF NOT EXISTS auditoria (
  id          bigserial PRIMARY KEY,
  cuando      timestamptz NOT NULL DEFAULT now(),
  actor_id    uuid,
  actor       text,
  accion      text NOT NULL,
  objetivo    text,
  detalle     text
);

CREATE OR REPLACE FUNCTION auditoria_solo_agregar() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'La bitácora de auditoría no se puede modificar';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auditoria_inmutable ON auditoria;
CREATE TRIGGER auditoria_inmutable BEFORE UPDATE OR DELETE ON auditoria
  FOR EACH ROW EXECUTE FUNCTION auditoria_solo_agregar();
