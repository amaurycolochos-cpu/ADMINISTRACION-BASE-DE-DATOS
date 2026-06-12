package com.abd.student.controller;

import com.abd.student.model.Student;
import com.abd.student.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private static final Logger log = LoggerFactory.getLogger(StudentController.class);
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAll() {
        log.info("GET /api/student/all");
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Student> create(@RequestBody Student s) {
        return ResponseEntity.ok(service.save(s));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}
