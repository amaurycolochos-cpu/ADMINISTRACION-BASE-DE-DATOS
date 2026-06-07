import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student as StudentModel } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

// componente q muestra la tabla de estudiantes. Clavado igualito al de cursos.
// Manejo 3 estados con signals:
//   - loading -> mientras esta pidiendo los datos
//   - error   -> si el micro no responde (lo agarro pa q no truene la app)
//   - students -> la lista q ya llego
@Component({
  selector: 'app-student',
  imports: [FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  // El service de estudiantes, de aqui salen las peticiones
  private readonly studentService = inject(StudentService);

  readonly students = signal<StudentModel[]>([]); // los alumnos q recibo
  readonly loading = signal<boolean>(false);        // bandera de "cargando"
  readonly error = signal<string | null>(null);     // mensaje de error si lo hay

  // --- Busqueda por ID ---
  searchId = '';  // el valor del input de busqueda
  readonly foundStudent = signal<StudentModel | null>(null); // estudiante encontrado
  readonly searchError = signal<string | null>(null); // error en busqueda

  // --- Registro de nuevo estudiante ---
  newStudent = { name: '', lastName: '', email: '', courseId: 1 };
  readonly createSuccess = signal<string | null>(null);
  readonly createError = signal<string | null>(null);

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

  // Buscar un estudiante por su ID
  searchById(): void {
    const id = Number(this.searchId);
    if (!id || id <= 0) {
      this.searchError.set('Ingresa un ID válido (número positivo).');
      this.foundStudent.set(null);
      return;
    }

    this.searchError.set(null);
    this.foundStudent.set(null);

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.foundStudent.set(student);
        this.searchError.set(null);
      },
      error: (err) => {
        console.error('Error al buscar estudiante por ID:', err);
        this.foundStudent.set(null);
        this.searchError.set(`No se encontró un estudiante con ID ${id}.`);
      },
    });
  }

  // Eliminar un estudiante por ID con DELETE
  deleteStudent(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        // Recargar la tabla para que desaparezca el registro eliminado
        this.loadStudents();
      },
      error: (err) => {
        console.error('Error al eliminar estudiante:', err);
        this.error.set('No se pudo eliminar el estudiante. Verifica que el microservicio esté activo.');
      },
    });
  }

  // Registrar un nuevo estudiante con POST
  createStudent(): void {
    if (!this.newStudent.name || !this.newStudent.lastName || !this.newStudent.email) {
      this.createError.set('Todos los campos son obligatorios.');
      this.createSuccess.set(null);
      return;
    }

    this.createError.set(null);
    this.createSuccess.set(null);

    this.studentService.createStudent(this.newStudent).subscribe({
      next: (created) => {
        this.createSuccess.set(`Estudiante "${created.name} ${created.lastName}" registrado con ID ${created.id}.`);
        this.createError.set(null);
        // Limpiar formulario
        this.newStudent = { name: '', lastName: '', email: '', courseId: 1 };
        // Recargar la tabla para que aparezca el nuevo registro
        this.loadStudents();
      },
      error: (err) => {
        console.error('Error al registrar estudiante:', err);
        this.createSuccess.set(null);
        this.createError.set('No se pudo registrar el estudiante. Verifica que el microservicio esté activo.');
      },
    });
  }
}
