-- =============================================================
-- PASO 1: Creación de Roles y Usuarios
-- Práctica 6.2 - Monitoreo y Auditoría
-- =============================================================
-- Se crean 3 roles con diferentes niveles de acceso:
-- - auditor: Solo lectura de la bitácora de auditoría
-- - operador: Puede insertar, actualizar datos operativos
-- - lector: Solo lectura de tablas operativas
-- =============================================================

-- Crear roles con contraseñas
CREATE ROLE auditor LOGIN PASSWORD 'auditor123';
CREATE ROLE operador LOGIN PASSWORD 'operador123';
CREATE ROLE lector LOGIN PASSWORD 'lector123';

-- Otorgar permiso de conexión a la base de datos
GRANT CONNECT ON DATABASE seguridad_db TO auditor, operador, lector;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Roles creados: auditor, operador, lector';
END $$;
