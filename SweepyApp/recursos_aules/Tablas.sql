-- Opcional: esquema
-- CREATE SCHEMA alquiler;
-- SET search_path TO alquiler;

------------------------------------------------------------
-- 0. TIPOS ENUM
------------------------------------------------------------

CREATE TYPE estado_pedido AS ENUM (
  'PREPARADO',
  'ENTREGADO',
  'DEVUELTO',
  'PENDIENTE_REVISION',
  'FINALIZADO'
);

------------------------------------------------------------
-- 1. ROLES Y USUARIOS
------------------------------------------------------------

CREATE TABLE roles (
  id_rol       SERIAL PRIMARY KEY,
  nombre       VARCHAR(50) NOT NULL,   -- 'NORMAL', 'ADMIN'
  descripcion  VARCHAR(255)
);

CREATE TABLE usuarios (
  id_usuario          SERIAL PRIMARY KEY,
  id_rol              INT NOT NULL,
  nombre              VARCHAR(100) NOT NULL,
  email               VARCHAR(150) NOT NULL UNIQUE,
  password_hash       VARCHAR(255) NOT NULL,
  activo              BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_ultimo_acceso TIMESTAMPTZ,

  CONSTRAINT fk_usuarios_roles
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

------------------------------------------------------------
-- 2. CLIENTES Y DIRECCIONES
------------------------------------------------------------

CREATE TABLE clientes (
  id_cliente   SERIAL PRIMARY KEY,
  nombre       VARCHAR(150) NOT NULL,
  nif_cif      VARCHAR(20),
  telefono     VARCHAR(30),
  email        VARCHAR(150),
  notas        TEXT,
  fecha_alta   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activo       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE direcciones_cliente (
  id_direccion   SERIAL PRIMARY KEY,
  id_cliente     INT NOT NULL,
  alias          VARCHAR(100),
  linea1         VARCHAR(200) NOT NULL,
  linea2         VARCHAR(200),
  ciudad         VARCHAR(100),
  provincia      VARCHAR(100),
  codigo_postal  VARCHAR(20),
  pais           VARCHAR(100),
  latitud        NUMERIC(10,7),
  longitud       NUMERIC(10,7),
  es_principal   BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT fk_dir_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

------------------------------------------------------------
-- 3. PRODUCTOS Y TALLAS/TAMAÑOS
------------------------------------------------------------

CREATE TABLE productos (
  id_producto  SERIAL PRIMARY KEY,
  nombre       VARCHAR(150) NOT NULL,
  descripcion  TEXT,
  precio_dia   NUMERIC(10,2) NOT NULL,  -- precio alquiler por unidad y día
  activo       BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_alta   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tallas_producto (
  id_talla      SERIAL PRIMARY KEY,
  id_producto   INT NOT NULL,
  codigo_talla  VARCHAR(50) NOT NULL,
  descripcion   VARCHAR(255),
  activo        BOOLEAN NOT NULL DEFAULT TRUE,

  CONSTRAINT uq_talla_producto UNIQUE (id_producto, codigo_talla),

  CONSTRAINT fk_tallas_producto
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

------------------------------------------------------------
-- 4. PEDIDOS (ALQUILERES) Y LÍNEAS
------------------------------------------------------------

CREATE TABLE pedidos (
  id_pedido             SERIAL PRIMARY KEY,
  codigo                VARCHAR(50) UNIQUE, -- 'P-2025-0001', etc.
  id_cliente            INT NOT NULL,
  id_direccion_entrega  INT,
  id_direccion_recogida INT,
  fecha_inicio          DATE NOT NULL,
  fecha_fin             DATE NOT NULL,
  estado                estado_pedido NOT NULL,
  creado_por            INT NOT NULL,
  fecha_creacion        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_actualizacion   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notas                 TEXT,

  CONSTRAINT fk_pedidos_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),

  CONSTRAINT fk_pedidos_dir_entrega
    FOREIGN KEY (id_direccion_entrega) REFERENCES direcciones_cliente(id_direccion),

  CONSTRAINT fk_pedidos_dir_recogida
    FOREIGN KEY (id_direccion_recogida) REFERENCES direcciones_cliente(id_direccion),

  CONSTRAINT fk_pedidos_usuario
    FOREIGN KEY (creado_por) REFERENCES usuarios(id_usuario)
);

-- Trigger para actualizar fecha_actualizacion en UPDATE
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_pedidos_set_timestamp
BEFORE UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

------------------------------------------------------------

CREATE TABLE lineas_pedido (
  id_linea_pedido  SERIAL PRIMARY KEY,
  id_pedido        INT NOT NULL,
  id_producto      INT NOT NULL,
  precio_dia       NUMERIC(10,2) NOT NULL,  -- copia del precio del producto
  dias_alquiler    INT NOT NULL,           -- DATEDIFF equivalente lo calculas en lógica o en vista
  cantidad_total   INT NOT NULL,           -- suma de tallas
  importe_linea    NUMERIC(10,2) NOT NULL, -- cantidad_total * precio_dia * dias_alquiler

  CONSTRAINT fk_lineas_pedido_pedidos
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),

  CONSTRAINT fk_lineas_pedido_producto
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE tallas_linea_pedido (
  id_talla_linea  SERIAL PRIMARY KEY,
  id_linea_pedido INT NOT NULL,
  id_talla        INT NOT NULL,
  cantidad        INT NOT NULL,

  CONSTRAINT fk_tallas_linea_pedido_linea
    FOREIGN KEY (id_linea_pedido) REFERENCES lineas_pedido(id_linea_pedido)
      ON DELETE CASCADE,

  CONSTRAINT fk_tallas_linea_pedido_talla
    FOREIGN KEY (id_talla) REFERENCES tallas_producto(id_talla)
);

------------------------------------------------------------
-- 5. HISTORIAL DE ESTADOS DE PEDIDO
------------------------------------------------------------

CREATE TABLE historial_estados_pedido (
  id_historial    SERIAL PRIMARY KEY,
  id_pedido       INT NOT NULL,
  estado_anterior estado_pedido,
  estado_nuevo    estado_pedido NOT NULL,
  cambiado_por    INT NOT NULL,
  fecha_cambio    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  observaciones   TEXT,

  CONSTRAINT fk_historial_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),

  CONSTRAINT fk_historial_usuario
    FOREIGN KEY (cambiado_por) REFERENCES usuarios(id_usuario)
);

------------------------------------------------------------
-- 6. STOCK POR TALLA (OPCIONAL)
------------------------------------------------------------

CREATE TABLE stock_producto_talla (
  id_stock           SERIAL PRIMARY KEY,
  id_talla           INT NOT NULL,
  unidades_totales   INT NOT NULL,
  unidades_reservadas INT NOT NULL DEFAULT 0,

  CONSTRAINT fk_stock_talla
    FOREIGN KEY (id_talla) REFERENCES tallas_producto(id_talla)
);

------------------------------------------------------------
-- 7. ÍNDICES RECOMENDADOS
------------------------------------------------------------

CREATE INDEX idx_pedidos_cliente_fecha
  ON pedidos (id_cliente, fecha_inicio, fecha_fin);

CREATE INDEX idx_pedidos_estado
  ON pedidos (estado);

CREATE INDEX idx_lineas_pedido_pedido
  ON lineas_pedido (id_pedido);

CREATE INDEX idx_tallas_producto_producto
  ON tallas_producto (id_producto);

------------------------------------------------------------
-- 8. DATOS INICIALES (ROLES)
------------------------------------------------------------

INSERT INTO roles (nombre, descripcion) VALUES
  ('NORMAL', 'Usuario operativo: crea pedidos, gestiona clientes'),
  ('ADMIN',  'Administrador: además gestiona productos y usuarios');

