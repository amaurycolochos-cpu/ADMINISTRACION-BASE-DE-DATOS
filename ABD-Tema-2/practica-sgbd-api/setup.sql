-- Script para crear la base de datos y tabla del proyecto
-- Ejecutar una sola vez antes de iniciar el servidor

CREATE DATABASE IF NOT EXISTS prueba_sgbd
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE prueba_sgbd;

CREATE TABLE IF NOT EXISTS estudiantes (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  email         VARCHAR(100) NOT NULL UNIQUE,
  matricula     VARCHAR(20)  NOT NULL UNIQUE,
  fecha_registro TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  estado        ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- Datos de prueba
INSERT INTO estudiantes (nombre, email, matricula) VALUES
  ('Juan Garcia',       'juan.garcia@email.com',   'EST001'),
  ('Maria Lopez',       'maria.lopez@email.com',   'EST002'),
  ('Carlos Rodriguez',  'carlos.rodriguez@email.com', 'EST003');

SELECT 'Base de datos lista' AS resultado;
