// Conexion a la base de datos usando un pool de conexiones
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  waitForConnections: true
});

// Prueba que la conexion funcione al iniciar
async function verificarConexion() {
  try {
    const conn = await pool.getConnection();
    console.log('  Conexion a MySQL exitosa');
    conn.release();
  } catch (err) {
    console.error('  Error de conexion:', err.message);
    process.exit(1); // si no conecta, cerramos la app
  }
}

// Trae informacion basica del servidor MySQL
async function obtenerInfoInstancia() {
  const [rows] = await pool.query(`
    SELECT
      VERSION() AS version,
      DATABASE() AS base_datos,
      USER() AS usuario,
      @@hostname AS servidor
  `);
  return rows[0];
}

module.exports = { pool, verificarConexion, obtenerInfoInstancia };
