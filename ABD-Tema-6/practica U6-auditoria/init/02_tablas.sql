-- =============================================================
-- PASO 2: Creación de Tablas Operativas
-- Práctica 6.2 - Monitoreo y Auditoría
-- =============================================================
-- Se crea la tabla principal 'clientes' que será el objeto
-- de las operaciones DML auditadas.
-- =============================================================

-- Tabla principal de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    ciudad VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla adicional para demostrar auditoría en múltiples tablas
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    categoria VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba en clientes
INSERT INTO clientes(nombre, correo, telefono, ciudad) VALUES
('Juan Pérez', 'juan.perez@gmail.com', '9610000001', 'Tuxtla Gutiérrez'),
('María López', 'maria.lopez@gmail.com', '9610000002', 'San Cristóbal'),
('Carlos Gómez', 'carlos.gomez@gmail.com', '9610000003', 'Tapachula'),
('Laura Sánchez', 'laura.sanchez@gmail.com', '9610000004', 'Comitán'),
('Roberto Díaz', 'roberto.diaz@gmail.com', '9610000005', 'Tuxtla Gutiérrez');

-- Insertar datos de prueba en productos
INSERT INTO productos(nombre, precio, stock, categoria) VALUES
('Laptop HP', 15999.99, 10, 'Electrónica'),
('Mouse Logitech', 499.50, 50, 'Accesorios'),
('Monitor Samsung 24"', 4500.00, 15, 'Electrónica'),
('Teclado Mecánico', 1200.00, 30, 'Accesorios'),
('Disco SSD 1TB', 1899.00, 25, 'Almacenamiento');

DO $$
BEGIN
    RAISE NOTICE '✅ Tablas creadas: clientes (5 registros), productos (5 registros)';
END $$;
