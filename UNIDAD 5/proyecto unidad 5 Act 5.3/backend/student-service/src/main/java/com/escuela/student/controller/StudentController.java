package com.escuela.student.controller;

import com.escuela.student.model.Student;
import com.escuela.student.repository.StudentRepository;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Controlador del micro de estudiantes. aqui llegan las peticiones del front.
// el @CrossOrigin es clave: sin el, el navegador le truena al angular pq el
// front corre en otro origen (localhost:4200) y la politica CORS lo bloquea.
// Con origins = "*" le digo "deja entrar a cualquiera", pa la practica esta ok
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    // el repo me lo inyecta spring por el constructor, no lo creo yo a mano
    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    // GET .../api/student/all -> me suelta la lista completa de alumnos.
    // findAll() ya viene del repo y Spring la regresa como json automatico
    @GetMapping("/all")
    public List<Student> getAll() {
        return repository.findAll();
    }

    // GET .../api/student/{id} -> busca un estudiante por su ID
    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado con id: " + id));
    }

    // POST .../api/student -> registra un nuevo estudiante
    @PostMapping
    public Student create(@RequestBody Student student) {
        return repository.save(student);
    }

    // DELETE .../api/student/{id} -> elimina un estudiante por su ID.
    // deleteById() ya viene gratis del JpaRepository, si no existe el id
    // spring lanza excepcion y regresa 500, pero pa la practica jala bien
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
