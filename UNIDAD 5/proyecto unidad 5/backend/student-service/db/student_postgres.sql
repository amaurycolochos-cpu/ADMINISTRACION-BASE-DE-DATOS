-- ============================================================
-- script de PostgreSQL pal micro de estudiantes (puerto 8090)
-- Version "a mano" por si no levanto el docker.
-- en linux se corre asi:
--   sudo -u postgres psql -f student_postgres.sql
-- o ya estando dentro de psql:  \i student_postgres.sql
-- ============================================================

-- Creo la base de datos (esto va como el superusuario postgres).
-- si la base ya existe, brincate esta linea o te marcara error
CREATE DATABASE escuela;

-- me conecto a la base q acabo de crear
\c escuela

-- Tabla de estudiantes. aqui SI uso DROP IF EXISTS xq postgres si lo soporta
-- (a diferencia de oracle), asi el script se puede correr varias veces tranquilo
DROP TABLE IF EXISTS student;
CREATE TABLE student (
    id        SERIAL PRIMARY KEY,   -- serial = id autoincremental
    name      VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email     VARCHAR(150),
    course_id INTEGER
);

-- Alumnos de ejemplo pa la demo
INSERT INTO student (name, last_name, email, course_id) VALUES
('Ana',     'García',   'ana.garcia@correo.com',   1),
('Luis',    'Pérez',    'luis.perez@correo.com',   2),
('Marta',   'López',    'marta.lopez@correo.com',  1),
('Carlos',  'Ramírez',  'carlos.ramirez@correo.com', 2),
('Sofía',   'Hernández','sofia.hernandez@correo.com', 1);

-- checar q todo haya quedado bien
SELECT * FROM student;
