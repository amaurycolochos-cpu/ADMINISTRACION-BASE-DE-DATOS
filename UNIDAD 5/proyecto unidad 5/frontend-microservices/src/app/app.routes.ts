import { Routes } from '@angular/router';

import { Course } from './components/course/course';
import { Student } from './components/student/student';

// Las rutas de la app. basicamente q componente sale segun la url
export const routes: Routes = [
  // si entran a la raiz "/" los mando derecho a estudiantes
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: Student, title: 'Estudiantes' }, // /students
  { path: 'courses', component: Course, title: 'Cursos' },        // /courses
  // Comodin: cualquier ruta rara q no exista, de vuelta a estudiantes (asi no truena)
  { path: '**', redirectTo: 'students' },
];
