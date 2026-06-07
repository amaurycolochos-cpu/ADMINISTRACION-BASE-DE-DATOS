package com.escuela.course.controller;

import com.escuela.course.model.Course;
import com.escuela.course.repository.CourseRepository;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// este es el controlador, o sea la "puerta" por donde entra el angular.
// El @CrossOrigin con * es para que el front no me lo bloquee el navegador
// por el tema de CORS. para la practica con * va de sobra, en algo real
// uno lo dejaria solo al dominio del front pero bueno aqui no importa
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/course")
public class CourseController {

    // Me traigo el repo por el constructor (inyeccion de dependencias)
    private final CourseRepository repository;

    public CourseController(CourseRepository repository) {
        this.repository = repository;
    }

    // el unico endpoint que ocupo: GET .../api/course/all
    // Basicamente devuelve TODOS los cursos en una lista y spring lo vuelve json solito
    @GetMapping("/all")
    public List<Course> getAll() {
        return repository.findAll();
    }

    // GET .../api/course/{id} -> busca un curso por su ID
    @GetMapping("/{id}")
    public Course getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
    }

    // POST .../api/course -> crea un curso nuevo y lo regresa con su ID generado
    @PostMapping
    public Course create(@RequestBody Course course) {
        return repository.save(course);
    }
}
