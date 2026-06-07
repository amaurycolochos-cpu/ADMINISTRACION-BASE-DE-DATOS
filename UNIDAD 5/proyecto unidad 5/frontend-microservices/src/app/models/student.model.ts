// molde del Estudiante para el front. Misma idea que el de cursos: es una
// interface, puro tipado para q typescript sepa que campos esperar.
// Importante -> deben coincidir con el json del backend (/api/student/all).
// fijate que aqui uso lastName y courseId (camelCase) xq asi viene en el json,
// aunque en la base de datos esas columnas esten como last_name y course_id
export interface Student {
  id: number;
  name: string;
  lastName: string;
  email: string;
  courseId: number;
}
