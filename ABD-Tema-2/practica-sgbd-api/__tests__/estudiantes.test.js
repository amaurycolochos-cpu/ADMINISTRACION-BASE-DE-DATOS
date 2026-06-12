// ============================================================
//  estudiantes.test.js -> pruebas del microservicio MySQL
//  uso jest y supertest para probar los endpoints sin levantar
//  el servidor en un puerto real, se importa la app directo
// ============================================================
const request = require('supertest');
const app     = require('../src/app');
const { pool } = require('../src/db'); // necesito el pool para cerrarlo al final

// guardo aqui el id del estudiante que creo, para usarlo en los siguientes tests
let idCreado;

// al terminar todos los tests cierro el pool
// si no, jest se queda colgado esperando conexiones abiertas
afterAll(async () => {
  await pool.end();
});

// ── SALUD ────────────────────────────────────────────────────
describe('Endpoints de salud', () => {
  // la api debe decir que esta activa con un 200
  test('GET /api/salud devuelve 200 y estado activo', async () => {
    const res = await request(app).get('/api/salud');
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('activo');
  });

  // el estado del sgbd debe traer al menos la version de mysql
  test('GET /api/sgbd/estado devuelve 200 con estado y version', async () => {
    const res = await request(app).get('/api/sgbd/estado');
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('conectado');
    expect(res.body.version).toBeDefined();
  });
});

// ── CRUD ─────────────────────────────────────────────────────
describe('CRUD de estudiantes (MySQL)', () => {
  // listar todos los estudiantes, esperamos un arreglo
  test('GET /api/estudiantes devuelve 200 y datos es arreglo', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  // creo un alumno con email y matricula unicos para que no truene el UNIQUE
  test('POST /api/estudiantes crea uno nuevo y devuelve 201', async () => {
    const ts = Date.now();
    const res = await request(app)
      .post('/api/estudiantes')
      .send({ nombre: 'Prueba Jest', email: `jest${ts}@test.com`, matricula: `J${ts}` });
    expect(res.status).toBe(201);
    expect(res.body.exito).toBe(true);
    expect(res.body.id).toBeDefined();
    idCreado = res.body.id; // me lo guardo para los siguientes pasos
  });

  // busco por id el que acabe de crear
  test('GET /api/estudiantes/:id devuelve el estudiante recien creado', async () => {
    const res = await request(app).get(`/api/estudiantes/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
    expect(res.body.datos.id).toBe(idCreado);
  });

  // lo actualizo, cambio el estado a inactivo
  test('PUT /api/estudiantes/:id actualiza el estado', async () => {
    const res = await request(app)
      .put(`/api/estudiantes/${idCreado}`)
      .send({ estado: 'inactivo' });
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
  });

  // lo borro para no dejar basura en la base de datos
  test('DELETE /api/estudiantes/:id elimina al estudiante', async () => {
    const res = await request(app).delete(`/api/estudiantes/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
  });

  // si mando el body vacio me debe regresar 400
  test('POST sin campos devuelve 400', async () => {
    const res = await request(app).post('/api/estudiantes').send({});
    expect(res.status).toBe(400);
    expect(res.body.exito).toBe(false);
  });
});
