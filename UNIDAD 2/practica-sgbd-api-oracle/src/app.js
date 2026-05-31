// ============================================================
//  app.js  ->  Es el archivo principal, el que arranca todo.
//  Aqui creo el servidor con Express, engancho las rutas y
//  prendo el microservicio en el puerto 3010.
// ============================================================
const express = require('express');
const { iniciarPool, verificarConexion } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json()); // para que Express entienda los datos en formato JSON

// Engancho mis rutas, todas empiezan con /api
app.use('/api', require('./routes/salud'));        // estado del servidor y del SGBD
app.use('/api', require('./routes/estudiantes'));  // el CRUD de estudiantes

// Ruta raiz, solo para confirmar rapido que el servidor esta vivo
app.get('/', (req, res) => {
  res.json({ mensaje: 'Microservicio SGBD Oracle activo', version: '1.0.0' });
});

// El puerto lo leo del .env, si no hay uso el 3010 por defecto
const PORT = process.env.API_PORT || 3010;

// Funcion que arranca todo EN ORDEN:
async function iniciar() {
  await iniciarPool();        // 1) creo el pool de conexiones de Oracle
  await verificarConexion();  // 2) pruebo que el SGBD si responde
  app.listen(PORT, () => {    // 3) si todo bien, prendo el servidor
    console.log('');
    console.log('  ================================');
    console.log(`  Servidor Oracle en puerto ${PORT}`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log('  ================================');
    console.log('');
  });
}

// Solo arranco el servidor si este archivo se ejecuta directo (npm start)
// asi en los test puedo importar la app sin que se levante el puerto
if (require.main === module) {
  iniciar();
}

module.exports = app; // mando llamar la funcion para que empiece a correr
