// ============================================================
//  salud.js  ->  Rutas para revisar el "estado de salud".
//  Sirven para comprobar que el servidor responde y que el
//  microservicio si esta conectado al SGBD (esto es la idea
//  principal de la practica: verificar el funcionamiento del SGBD).
// ============================================================
const express = require('express');
const router = express.Router();
const { obtenerInfoInstancia } = require('../db');

// GET /api/salud -> nada mas confirma que la API esta viva
router.get('/salud', (req, res) => {
  res.json({
    estado: 'activo',
    mensaje: 'La API del SGBD Oracle esta funcionando correctamente',
    timestamp: new Date().toISOString() // la fecha y hora del momento
  });
});

// GET /api/sgbd/estado -> aqui si me conecto a Oracle y traigo su info
// (version, base de datos, usuario y servidor). Asi demuestro la conexion.
router.get('/sgbd/estado', async (req, res) => {
  try {
    const info = await obtenerInfoInstancia();
    res.json({
      estado: 'conectado',
      motor: 'Oracle Database',
      version: info.VERSION,
      baseDatos: info.BASE_DATOS,
      usuario: info.USUARIO,
      servidor: info.SERVIDOR
    });
  } catch (err) {
    res.status(500).json({ estado: 'error', mensaje: err.message });
  }
});

module.exports = router;
