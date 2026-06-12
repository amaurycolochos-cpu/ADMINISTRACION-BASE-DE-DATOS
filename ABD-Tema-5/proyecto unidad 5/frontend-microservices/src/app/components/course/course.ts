import { Component, OnInit, inject, signal } from '@angular/core';

import { Course as CourseModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

// Componente q pinta la tabla de cursos. el solito le pide los datos al
// service y los muestra. Uso signals (lo nuevo de angular) pa el estado
@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course implements OnInit {
  // me jalo el service de cursos para pedirle la info
  private readonly courseService = inject(CourseService);

  // Estos 3 signals son basicamente el "estado" de la pantalla:
  readonly courses = signal<CourseModel[]>([]);   // aqui guardo los cursos q llegan
  readonly loading = signal<boolean>(false);       // true mientras carga (pa el "Cargando...")
  readonly error = signal<string | null>(null);    // si algo truena, aqui va el mensaje

  // ngOnInit corre apenas se monta el componente, asi q de una vez cargo todo
  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    // Prendo el loading y limpio cualquier error viejo antes de pedir
    this.loading.set(true);
    this.error.set(null);

    // me suscribo al observable del service. El next es cuando todo sale bien
    // y el error es el plan B por si el backend no responde
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data); // meto los cursos al signal
        this.loading.set(false); // ya cargo, apago el spinner
      },
      error: (err) => {
        // Si entra aqui es q el micro no contesto o esta apagado.
        // lo saco por consola pa debug y muestro un texto entendible en pantalla
        console.error('Error al consumir el microservicio de cursos:', err);
        this.error.set(
          'No se pudieron cargar los cursos. Verifica que el microservicio ' +
            'de cursos (Linux, puerto 8080) esté encendido y accesible.',
        );
        this.loading.set(false);
      },
    });
  }
}
