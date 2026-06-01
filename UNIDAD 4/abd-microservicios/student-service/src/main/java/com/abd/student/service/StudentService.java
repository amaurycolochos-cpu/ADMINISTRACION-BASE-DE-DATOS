package com.abd.student.service;

import com.abd.student.model.Student;
import com.abd.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private static final Logger log = LoggerFactory.getLogger(StudentService.class);
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> getAll() {
        log.info("Consultando estudiantes");
        return repo.findAll();
    }

    public Student save(Student s) {
        log.info("Guardando estudiante: {}", s.getNombre());
        return repo.save(s);
    }

    public Student findById(Long id) {
        return repo.findById(id).orElseThrow(() -> {
            log.error("Estudiante no encontrado id={}", id);
            return new RuntimeException("No encontrado");
        });
    }
}
