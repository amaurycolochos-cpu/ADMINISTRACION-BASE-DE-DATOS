// CRUD completo para la tabla estudiantes
const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/estudiantes — lista todos los estudiantes
router.get('/estudiantes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estudiantes ORDER BY id');
    res.json({ exito: true, cantidad: rows.length, datos: rows });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// GET /api/estudiantes/:id — trae un estudiante por su id
router.get('/estudiantes/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, datos: rows[0] });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// POST /api/estudiantes — crea un nuevo estudiante
router.post('/estudiantes', async (req, res) => {
  const { nombre, email, matricula } = req.body;
  if (!nombre || !email || !matricula) {
    return res.status(400).json({ exito: false, mensaje: 'nombre, email y matricula son requeridos' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO estudiantes (nombre, email, matricula) VALUES (?, ?, ?)',
      [nombre, email, matricula]
    );
    res.status(201).json({ exito: true, id: result.insertId, mensaje: 'Estudiante creado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// PUT /api/estudiantes/:id — actualiza un estudiante existente
router.put('/estudiantes/:id', async (req, res) => {
  const { nombre, email, estado } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE estudiantes SET nombre = COALESCE(?, nombre), email = COALESCE(?, email), estado = COALESCE(?, estado) WHERE id = ?',
      [nombre, email, estado, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, mensaje: 'Estudiante actualizado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// DELETE /api/estudiantes/:id — elimina un estudiante
router.delete('/estudiantes/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM estudiantes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, mensaje: 'Estudiante eliminado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

module.exports = router;
