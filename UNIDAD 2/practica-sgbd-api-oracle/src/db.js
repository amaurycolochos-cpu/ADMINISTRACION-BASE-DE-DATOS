// ============================================================
//  db.js  ->  Aqui manejo TODA la conexion con Oracle Database.
//  Uso el driver "oracledb" en modo thin, que es el modo que
//  NO necesita instalar el Oracle Instant Client aparte, asi
//  es mucho mas facil de correr en cualquier compu.
// ============================================================
const oracledb = require('oracledb');
require('dotenv').config(); // sirve para leer las variables del archivo .env

// Le digo a oracledb que cada fila me la regrese como un objeto
// { columna: valor }, asi es mas comodo mandarlo como JSON al navegador.
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// autoCommit en true = cada INSERT / UPDATE / DELETE se guarda solo,
// asi no tengo que andar escribiendo commit() a cada rato.
oracledb.autoCommit = true;

// ----- Creo el "pool" de conexiones cuando arranca la app -----
// Un pool es como una bolsa de conexiones ya abiertas que se van
// reutilizando, en lugar de habrir una nueva conexion en cada peticion
// (eso seria lento). Asi la API responde mas rapido.
async function iniciarPool() {
  await oracledb.createPool({
    user: process.env.DB_USER,             // usuario de Oracle (alumno_sgbd)
    password: process.env.DB_PASSWORD,     // su contrasena
    connectString: process.env.DB_CONNECT, // ej: localhost:1521/FREEPDB1
    poolMin: 1,       // minimo de conexiones que siempre deja listas
    poolMax: 10,      // maximo que puede abrir al mismo tiempo
    poolIncrement: 1  // de cuanto en cuanto va creando mas si hacen falta
  });
}

// ----- Pruebo que de verdad se conecta cuando inicia el servidor -----
async function verificarConexion() {
  let conn;
  try {
    conn = await oracledb.getConnection();    // saco una conexion del pool
    await conn.execute('SELECT 1 FROM dual');  // consulta chiquita de prueba
    console.log('  Conexion a Oracle exitosa');
  } catch (err) {
    console.error('  Error de conexion:', err.message);
    process.exit(1); // si no conecta no tiene caso seguir, cierro la app
  } finally {
    if (conn) await conn.close(); // SIEMPRE regreso la conexion al pool
  }
}

// ----- Funcion ayudante para no repetir lo mismo en cada ruta -----
// Saca una conexion, ejecuta la consulta y al final la devuelve al pool.
async function consulta(sql, binds = {}, opts = {}) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    return await conn.execute(sql, binds, opts);
  } finally {
    if (conn) await conn.close();
  }
}

// ----- Trae info del servidor Oracle (version, base, usuario, host) -----
// Lo uso en el endpoint /api/sgbd/estado para demostrar a que SGBD me conecte.
async function obtenerInfoInstancia() {
  const result = await consulta(`
    SELECT
      (SELECT version FROM product_component_version WHERE ROWNUM = 1) AS version,
      SYS_CONTEXT('USERENV','DB_NAME')     AS base_datos,
      USER                                 AS usuario,
      SYS_CONTEXT('USERENV','SERVER_HOST') AS servidor
    FROM dual
  `);
  return result.rows[0];
}

// Exporto las funciones para usarlas en app.js y en las rutas.
module.exports = { oracledb, iniciarPool, verificarConexion, consulta, obtenerInfoInstancia };
