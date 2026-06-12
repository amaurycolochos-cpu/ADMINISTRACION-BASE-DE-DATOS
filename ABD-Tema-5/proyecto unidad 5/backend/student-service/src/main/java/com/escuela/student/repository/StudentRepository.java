package com.escuela.student.repository;

import com.escuela.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// el repo de estudiantes. Mismo truco que el de cursos: heredando de
// JpaRepository ya me vienen gratis el findAll(), findById(), save(),
// deleteById() y todos esos sobre la tabla student. Cero codigo manual
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
