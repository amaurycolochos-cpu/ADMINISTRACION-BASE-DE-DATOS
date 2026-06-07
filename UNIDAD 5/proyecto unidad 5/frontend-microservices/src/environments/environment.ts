// Archivo de configuracion del entorno. aqui guardo las urls del backend
// en un solo lugar pa no andarlas escribiendo a mano en cada service.
//
// la idea original de la practica era: angular corre en Windows (localhost:4200)
// y los micros en un server Linux, x eso normalmente NO se usa localhost pal back
// sino la ip del server. Pero en esta unidad 5 levante todo con docker en la
// MISMA maquina windows, asi q al final si me quedo en localhost. Si algun dia
// lo muevo a un server de verdad, nomas cambio la ip/puertos aqui y listo
export const environment = {
  production: false,

  // ip del server. Como todo esta en docker local, lo dejo en localhost
  serverIp: 'localhost',

  // Micro de estudiantes (postgres) -> puerto 8090
  studentApiUrl: 'http://localhost:8090/api/student',

  // micro de cursos (oracle) -> puerto 8080
  courseApiUrl: 'http://localhost:8080/api/course',
};
