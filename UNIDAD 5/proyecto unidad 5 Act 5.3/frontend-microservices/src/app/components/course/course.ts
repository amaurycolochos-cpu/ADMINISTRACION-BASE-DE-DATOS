import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Course as CourseModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

// Componente q pinta la tabla de cursos. el solito le pide los datos al
// service y los muestra. Uso signals (lo nuevo de angular) pa el estado
@Component({
  selector: 'app-course',
  imports: [FormsModule],
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

  // --- Busqueda por ID ---
  searchId = '';
  readonly foundCourse = signal<CourseModel | null>(null);
  readonly searchError = signal<string | null>(null);

  // --- Formulario para registrar curso (Ejercicio 5) ---
  newCourseName = '';
  newCourseDescription = '';
  readonly createSuccess = signal<string | null>(null);
  readonly createError = signal<string | null>(null);

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

  // Registrar un nuevo curso (Ejercicio 5 - POST)
  createCourse(): void {
    const name = this.newCourseName.trim();
    const description = this.newCourseDescription.trim();

    if (!name || !description) {
      this.createError.set('Ambos campos son obligatorios.');
      this.createSuccess.set(null);
      return;
    }

    this.createError.set(null);
    this.createSuccess.set(null);

    this.courseService.createCourse({ name, description }).subscribe({
      next: (created) => {
        this.createSuccess.set(`Curso "${created.name}" registrado con ID ${created.id}.`);
        this.createError.set(null);
        // Limpio el formulario y recargo la tabla
        this.newCourseName = '';
        this.newCourseDescription = '';
        this.loadCourses();
      },
      error: (err) => {
        console.error('Error al crear curso:', err);
        this.createError.set('No se pudo registrar el curso. Verifica que el microservicio esté activo.');
        this.createSuccess.set(null);
      },
    });
  }

  // Buscar un curso por su ID
  searchById(): void {
    const id = Number(this.searchId);
    if (!id || id <= 0) {
      this.searchError.set('Ingresa un ID válido (número positivo).');
      this.foundCourse.set(null);
      return;
    }

    this.searchError.set(null);
    this.foundCourse.set(null);

    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.foundCourse.set(course);
        this.searchError.set(null);
      },
      error: (err) => {
        console.error('Error al buscar curso por ID:', err);
        this.foundCourse.set(null);
        this.searchError.set(`No se encontró un curso con ID ${id}.`);
      },
    });
  }
}
