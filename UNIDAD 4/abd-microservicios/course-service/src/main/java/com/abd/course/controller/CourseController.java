package com.abd.course.controller;

import com.abd.course.model.Course;
import com.abd.course.service.CourseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private static final Logger log = LoggerFactory.getLogger(CourseController.class);
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAll() {
        log.info("GET /api/course/all");
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody Course c) {
        return ResponseEntity.ok(service.save(c));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}
