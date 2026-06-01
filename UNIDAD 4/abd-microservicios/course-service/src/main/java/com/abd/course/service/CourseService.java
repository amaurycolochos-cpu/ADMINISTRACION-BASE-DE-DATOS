package com.abd.course.service;

import com.abd.course.model.Course;
import com.abd.course.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseService.class);
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<Course> getAll() {
        log.info("Obteniendo cursos");
        return repo.findAll();
    }

    public Course save(Course c) {
        log.info("Guardando curso: {}", c.getNombre());
        return repo.save(c);
    }

    public Course findById(Long id) {
        return repo.findById(id).orElseThrow(() -> {
            log.error("Curso no encontrado id={}", id);
            return new RuntimeException("No encontrado");
        });
    }
}
