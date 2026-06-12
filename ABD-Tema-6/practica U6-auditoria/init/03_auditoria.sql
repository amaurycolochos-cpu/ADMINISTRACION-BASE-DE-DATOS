-- =============================================================
-- PASO 3: Sistema de Auditoría Completo
-- Práctica 6.2 - Monitoreo y Auditoría
-- =============================================================
-- Se implementa:
-- 1. Esquema dedicado para auditoría
-- 2. Tabla de bitácora con datos completos
-- 3. Función genérica de auditoría (reutilizable)
-- 4. Triggers para cada tabla auditada
-- 5. Vista resumen de actividad
-- 6. Función de detección de anomalías
-- =============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. ESQUEMA DE AUDITORÍA (separado del esquema público)
-- ─────────────────────────────────────────────────────────────
CREATE SCHEMA auditoria;

-- ─────────────────────────────────────────────────────────────
-- 2. TABLA DE BITÁCORA (registro detallado de cada operación)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE auditoria.bitacora (
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL,
    operacion TEXT NOT NULL,           -- INSERT, UPDATE, DELETE
    esquema TEXT NOT NULL,
    tabla_afectada TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_cliente TEXT,
    aplicacion TEXT,
    dato_anterior JSONB,               -- Registro ANTES del cambio
    dato_nuevo JSONB,                  -- Registro DESPUÉS del cambio
    consulta_sql TEXT                   -- La sentencia que se ejecutó
);

-- Índices para consultas frecuentes de auditoría
CREATE INDEX idx_bitacora_fecha ON auditoria.bitacora(fecha);
CREATE INDEX idx_bitacora_usuario ON auditoria.bitacora(usuario);
CREATE INDEX idx_bitacora_tabla ON auditoria.bitacora(tabla_afectada);
CREATE INDEX idx_bitacora_operacion ON auditoria.bitacora(operacion);

-- ─────────────────────────────────────────────────────────────
-- 3. FUNCIÓN GENÉRICA DE AUDITORÍA (funciona con cualquier tabla)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION auditoria.fn_registrar_cambio()
RETURNS TRIGGER AS $$
DECLARE
    v_dato_anterior JSONB := NULL;
    v_dato_nuevo JSONB := NULL;
    v_ip TEXT;
    v_app TEXT;
BEGIN
    -- Obtener información de la conexión
    SELECT client_addr::TEXT, application_name
    INTO v_ip, v_app
    FROM pg_stat_activity
    WHERE pid = pg_backend_pid();

    -- Determinar qué datos guardar según la operación
    IF TG_OP = 'INSERT' THEN
        v_dato_nuevo := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        v_dato_anterior := to_jsonb(OLD);
        v_dato_nuevo := to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        v_dato_anterior := to_jsonb(OLD);
    END IF;

    -- Insertar registro en la bitácora
    INSERT INTO auditoria.bitacora(
        usuario, operacion, esquema, tabla_afectada,
        ip_cliente, aplicacion, dato_anterior, dato_nuevo, consulta_sql
    ) VALUES (
        current_user,
        TG_OP,
        TG_TABLE_SCHEMA,
        TG_TABLE_NAME,
        v_ip,
        v_app,
        v_dato_anterior,
        v_dato_nuevo,
        current_query()
    );

    -- Retornar el registro apropiado
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────
-- 4. TRIGGERS DE AUDITORÍA (uno por cada tabla)
-- ─────────────────────────────────────────────────────────────

-- Trigger para la tabla clientes
CREATE TRIGGER trg_auditar_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW EXECUTE FUNCTION auditoria.fn_registrar_cambio();

-- Trigger para la tabla productos
CREATE TRIGGER trg_auditar_productos
AFTER INSERT OR UPDATE OR DELETE ON productos
FOR EACH ROW EXECUTE FUNCTION auditoria.fn_registrar_cambio();

-- ─────────────────────────────────────────────────────────────
-- 5. VISTA RESUMEN DE ACTIVIDAD
-- ─────────────────────────────────────────────────────────────
CREATE VIEW auditoria.v_resumen_actividad AS
SELECT
    usuario,
    operacion,
    tabla_afectada,
    COUNT(*) AS total_operaciones,
    MIN(fecha) AS primera_actividad,
    MAX(fecha) AS ultima_actividad
FROM auditoria.bitacora
GROUP BY usuario, operacion, tabla_afectada
ORDER BY ultima_actividad DESC;

-- ─────────────────────────────────────────────────────────────
-- 6. FUNCIÓN DE DETECCIÓN DE ANOMALÍAS
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION auditoria.fn_detectar_anomalias(
    p_minutos INTEGER DEFAULT 5,
    p_umbral INTEGER DEFAULT 10
)
RETURNS TABLE(
    usuario_sospechoso TEXT,
    total_operaciones BIGINT,
    primera_op TIMESTAMP,
    ultima_op TIMESTAMP,
    tablas_afectadas TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.usuario,
        COUNT(*) AS total_ops,
        MIN(b.fecha),
        MAX(b.fecha),
        STRING_AGG(DISTINCT b.tabla_afectada, ', ')
    FROM auditoria.bitacora b
    WHERE b.fecha > NOW() - (p_minutos || ' minutes')::INTERVAL
    GROUP BY b.usuario
    HAVING COUNT(*) > p_umbral;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────
-- 7. VISTA DE CONEXIONES ACTIVAS (monitoreo simplificado)
-- ─────────────────────────────────────────────────────────────
CREATE VIEW auditoria.v_conexiones_activas AS
SELECT
    pid,
    usename AS usuario,
    datname AS base_datos,
    client_addr AS ip_cliente,
    application_name AS aplicacion,
    state AS estado,
    query AS consulta_actual,
    query_start AS inicio_consulta,
    NOW() - query_start AS duracion
FROM pg_stat_activity
WHERE datname = 'seguridad_db'
ORDER BY query_start DESC;

-- ─────────────────────────────────────────────────────────────
-- 8. PERMISOS GRANULARES POR ROL
-- ─────────────────────────────────────────────────────────────

-- Permisos para el esquema público
GRANT USAGE ON SCHEMA public TO lector, operador, auditor;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lector;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO operador;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO operador;

-- Permisos para el esquema de auditoría
GRANT USAGE ON SCHEMA auditoria TO auditor;
GRANT SELECT ON ALL TABLES IN SCHEMA auditoria TO auditor;

-- El auditor NO puede modificar la bitácora (solo leer)
-- El operador NO puede ver la bitácora
-- El lector NO puede modificar nada

DO $$
BEGIN
    RAISE NOTICE '✅ Sistema de auditoría configurado completamente';
    RAISE NOTICE '   - Esquema: auditoria';
    RAISE NOTICE '   - Tabla: auditoria.bitacora';
    RAISE NOTICE '   - Función: auditoria.fn_registrar_cambio()';
    RAISE NOTICE '   - Triggers: trg_auditar_clientes, trg_auditar_productos';
    RAISE NOTICE '   - Vista: auditoria.v_resumen_actividad';
    RAISE NOTICE '   - Vista: auditoria.v_conexiones_activas';
    RAISE NOTICE '   - Función: auditoria.fn_detectar_anomalias()';
    RAISE NOTICE '   - Permisos configurados para 3 roles';
END $$;
