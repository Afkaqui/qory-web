-- Esquema de la intranet de Qory. Idempotente: se puede ejecutar varias veces.

CREATE TABLE IF NOT EXISTS usuarios (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text NOT NULL,
  nombre          text NOT NULL,
  rol             text NOT NULL CHECK (rol IN ('superadmin','administrador','jefe','operario')),
  area            text,
  celular         text,
  activo          boolean NOT NULL DEFAULT true,
  clave_hash      text,
  intentos        integer NOT NULL DEFAULT 0,
  bloqueado_hasta timestamptz,
  creado_por      uuid REFERENCES usuarios(id),
  creado_en       timestamptz NOT NULL DEFAULT now(),
  ultimo_ingreso  timestamptz
);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS celular text;
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

-- ============================================================ tablero de gerencia

-- Definición de cada indicador (se siembra con scripts/sembrar.mjs).
CREATE TABLE IF NOT EXISTS indicadores (
  codigo        text PRIMARY KEY,
  orden         integer NOT NULL,
  frente        text NOT NULL,
  nombre        text NOT NULL,
  num_desc      text,
  den_desc      text,
  tipo          text NOT NULL CHECK (tipo IN ('valor','razon')),
  formato       text NOT NULL CHECK (formato IN ('entero','pct','soles')),
  sentido       text NOT NULL CHECK (sentido IN ('menor','mayor')),
  meta_defecto  numeric,
  fuente        text,
  decision      text,
  responsable   text
);

-- Un corte por mes: la fecha desde la que se evalúan vencimientos y se proyecta la caja.
CREATE TABLE IF NOT EXISTS cortes (
  periodo date PRIMARY KEY,
  corte   date NOT NULL
);

-- Valor capturado de un indicador en un mes. Cada cambio queda en la auditoría.
CREATE TABLE IF NOT EXISTS capturas (
  codigo        text NOT NULL REFERENCES indicadores(codigo),
  periodo       date NOT NULL,
  valor         numeric,
  denominador   numeric,
  meta          numeric,
  referencia    text,
  usuario_id    uuid REFERENCES usuarios(id),
  actualizado_en timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (codigo, periodo)
);

CREATE TABLE IF NOT EXISTS caja_semanas (
  periodo      date NOT NULL,
  semana       integer NOT NULL CHECK (semana BETWEEN 1 AND 13),
  caja_inicial numeric,
  cobros       numeric,
  pagos        numeric,
  evidencia    text,
  usuario_id   uuid REFERENCES usuarios(id),
  actualizado_en timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (periodo, semana)
);

CREATE TABLE IF NOT EXISTS acciones (
  id           bigserial PRIMARY KEY,
  codigo       text NOT NULL,
  brecha       text NOT NULL,
  accion       text,
  responsable  text,
  fecha_limite date,
  estado       text NOT NULL DEFAULT 'Abierta' CHECK (estado IN ('Abierta','En curso','Cerrada')),
  evidencia    text,
  creado_por   uuid REFERENCES usuarios(id),
  creada_en    timestamptz NOT NULL DEFAULT now(),
  actualizada_en timestamptz NOT NULL DEFAULT now()
);

-- Textos de referencia (fuentes, modelo de datos, evidencia). Datos internos: viven aquí, no en el código.
CREATE TABLE IF NOT EXISTS contenido (
  clave text PRIMARY KEY,
  datos jsonb NOT NULL
);
