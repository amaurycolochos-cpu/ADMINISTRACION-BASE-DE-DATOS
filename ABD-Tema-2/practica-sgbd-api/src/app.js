// Punto de entrada principal del servidor
const express = require('express');
const { verificarConexion } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas del microservicio
app.use('/api', require('./routes/salud'));
app.use('/api', require('./routes/estudiantes'));

// Ruta raiz para saber que el servidor responde
app.get('/', (req, res) => {
  res.json({ mensaje: 'Microservicio SGBD activo', version: '1.0.0' });
});

const PORT = process.env.API_PORT || 3000;

async function iniciar() {
  await verificarConexion();
  app.listen(PORT, () => {
    console.log('');
    console.log('  ================================');
    console.log(`  Servidor en puerto ${PORT}`);
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

module.exports = app;
