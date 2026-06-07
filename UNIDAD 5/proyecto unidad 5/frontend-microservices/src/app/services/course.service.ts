import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

// este servicio es el q se encarga de hablarle al micro de cursos (el de Oracle).
// La idea de meterlo en un service y no en el componente es q toda la logica
// de las peticiones quede en un solo lugar, asi no la repito por todos lados
@Injectable({
  providedIn: 'root', // 'root' = una sola instancia para toda la app (singleton)
})
export class CourseService {
  // Inyecto el HttpClient, q es el q de verdad hace las llamadas http
  private readonly http = inject(HttpClient);

  // la url base la saco del environment.ts, asi si cambia la ip/puerto
  // solo lo toco en UN archivo y no aqui
  private readonly apiUrl = environment.courseApiUrl;

  // Pega un GET a /api/course/all y regresa un Observable con la lista de cursos.
  // el componente luego se "suscribe" a esto pa recibir los datos cuando lleguen
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/all`);
  }
}
