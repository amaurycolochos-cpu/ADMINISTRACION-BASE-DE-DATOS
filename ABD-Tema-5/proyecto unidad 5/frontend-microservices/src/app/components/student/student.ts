import { Component, OnInit, inject, signal } from '@angular/core';

import { Student as StudentModel } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

// componente q muestra la tabla de estudiantes. Clavado igualito al de cursos.
// Manejo 3 estados con signals:
//   - loading -> mientras esta pidiendo los datos
//   - error   -> si el micro no responde (lo agarro pa q no truene la app)
//   - students -> la lista q ya llego
@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  // El service de estudiantes, de aqui salen las peticiones
  private readonly studentService = inject(StudentService);

  readonly students = signal<StudentModel[]>([]); // los alumnos q recibo
  readonly loading = signal<boolean>(false);        // bandera de "cargando"
  readonly error = signal<string | null>(null);     // mensaje de error si lo hay

  // Apenas arranca el componente pido los datos
  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    // antes de pedir: prendo loading y borro errores anteriores
    this.loading.set(true);
    this.error.set(null);

    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        // Error controlado: en vez de q la app se caiga, le aviso bonito
        // al usuario y dejo el detalle tecnico en la consola
        console.error('Error al consumir el microservicio de estudiantes:', err);
        this.error.set(
          'No se pudieron cargar los estudiantes. Verifica que el microservicio ' +
            'de estudiantes (Linux, puerto 8090) esté encendido y accesible.',
        );
        this.loading.set(false);
      },
    });
  }
}
