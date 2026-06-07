import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Student } from '../models/student.model';

// El gemelo del de cursos pero pa Estudiantes (el micro de postgres).
// mismo patron: aqui adentro va todo lo de hablarle al backend de alumnos
@Injectable({
  providedIn: 'root', // singleton, una sola copia compartida en toda la app
})
export class StudentService {
  // el cliente http que hace las peticiones
  private readonly http = inject(HttpClient);

  // URL base sacada del environment (asi no la dejo hardcodeada aqui)
  private readonly apiUrl = environment.studentApiUrl;

  // get a /api/student/all -> devuelve un Observable con todos los estudiantes
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/all`);
  }
}
