-- ============================================================
-- Script de Oracle pal micro de cursos (puerto 8080)
-- este es el "manual", o sea pa correrlo a mano si NO uso docker.
-- En linux se lanza con sqlplus asi:
--   sqlplus usuario/password@//localhost:1521/XEPDB1 @course_oracle.sql
-- ============================================================

-- Primero tiro la tabla por si ya existia (asi puedo correr el script las veces
-- q quiera sin q truene). el truco del BEGIN/EXCEPTION es xq oracle NO tiene
-- el "DROP TABLE IF EXISTS" como postgres, entonces atrapo el error y lo ignoro
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE course';
EXCEPTION
   WHEN OTHERS THEN NULL;   -- si no existia la tabla, ni modo, seguimos
END;
/

-- ya limpio, creo la tabla de cursos
CREATE TABLE course (
    id          NUMBER PRIMARY KEY,
    name        VARCHAR2(100) NOT NULL,
    description VARCHAR2(255)
);

-- Datos de ejemplo (mismos 3 cursos de siempre)
INSERT INTO course (id, name, description) VALUES (1, 'Bases de Datos', 'Administracion de bases de datos');
INSERT INTO course (id, name, description) VALUES (2, 'Programacion Web', 'Angular y servicios REST');
INSERT INTO course (id, name, description) VALUES (3, 'Sistemas Operativos', 'Administracion de servidores Linux');
COMMIT;   -- Guardar de verdad (en oracle sin commit no se salva nada)

-- nomas pa confirmar q si quedaron los datos, los muestro
SELECT * FROM course;
