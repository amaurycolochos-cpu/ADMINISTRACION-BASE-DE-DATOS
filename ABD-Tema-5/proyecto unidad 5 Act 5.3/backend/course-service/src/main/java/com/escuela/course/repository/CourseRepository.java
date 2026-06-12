package com.escuela.course.repository;

import com.escuela.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Este es el repo de cursos. lo bueno es que NO escribo nada de codigo aqui:
// con solo heredar de JpaRepository ya me quedan listos el findAll, findById,
// save, delete y compañia. Spring data hace toda la magia por debajo
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
