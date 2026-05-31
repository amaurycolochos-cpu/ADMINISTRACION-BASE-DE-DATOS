// Rutas para verificar el estado del servidor y del SGBD
const express = require('express');
const router = express.Router();
const { obtenerInfoInstancia } = require('../db');

// GET /api/salud — confirma que la API responde
router.get('/salud', (req, res) => {
  res.json({
    estado: 'activo',
    mensaje: 'La API del SGBD esta funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// GET /api/sgbd/estado — trae version y datos del MySQL conectado
router.get('/sgbd/estado', async (req, res) => {
  try {
    const info = await obtenerInfoInstancia();
    res.json({
      estado: 'conectado',
      version: info.version,
      baseDatos: info.base_datos,
      usuario: info.usuario,
      servidor: info.servidor
    });
  } catch (err) {
    res.status(500).json({ estado: 'error', mensaje: err.message });
  }
});

module.exports = router;
