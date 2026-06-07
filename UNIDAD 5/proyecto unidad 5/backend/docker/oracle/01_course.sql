-- este lo ejecuta docker solito al crear el contenedor de oracle.
-- Detalle: estos scripts corren como SYS conectado a la instancia, x eso
-- primero me cambio al pluggable database FREEPDB1 y luego creo la tabla
-- dentro del esquema del usuario de la app (escuela), q lo crea el APP_USER

ALTER SESSION SET CONTAINER = FREEPDB1;

-- Tabla de cursos. aqui el id lo pongo a MANO (no es autonumerico) xq abajo
-- los inserts ya traen su id (1,2,3). En oracle uso NUMBER y VARCHAR2
CREATE TABLE escuela.course (
    id          NUMBER PRIMARY KEY,
    name        VARCHAR2(100) NOT NULL,
    description VARCHAR2(255)
);

-- los 3 cursos de ejemplo pa la practica
INSERT INTO escuela.course (id, name, description) VALUES (1, 'Bases de Datos',      'Administracion de bases de datos');
INSERT INTO escuela.course (id, name, description) VALUES (2, 'Programacion Web',    'Angular y servicios REST');
INSERT INTO escuela.course (id, name, description) VALUES (3, 'Sistemas Operativos', 'Administracion de servidores Linux');
-- El COMMIT es OBLIGATORIO en oracle, si no, los datos no se guardan de verdad
COMMIT;
