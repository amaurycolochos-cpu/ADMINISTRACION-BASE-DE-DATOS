-- Este script lo corre docker SOLITO la primera vez q nace el contenedor de postgres.
-- como ya entramos directo a la base "escuela" (la del POSTGRES_DB), no hace
-- falta crearla ni conectarse, vamos directo a hacer la tabla

-- Tabla de estudiantes. el id es SERIAL asi q postgres lo va autoincrementando
CREATE TABLE student (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email     VARCHAR(150),
    course_id INTEGER
);

-- unos cuantos alumnos de ejemplo pa q la tabla no salga vacia en la demo.
-- El course_id apunta al id del curso (1, 2...) q estan en la base de oracle
INSERT INTO student (name, last_name, email, course_id) VALUES
('Ana',     'García',    'ana.garcia@correo.com',      1),
('Luis',    'Pérez',     'luis.perez@correo.com',      2),
('Marta',   'López',     'marta.lopez@correo.com',     1),
('Carlos',  'Ramírez',   'carlos.ramirez@correo.com',  2),
('Sofía',   'Hernández', 'sofia.hernandez@correo.com', 1);
