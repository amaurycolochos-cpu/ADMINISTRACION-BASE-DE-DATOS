package com.escuela.student.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// El Estudiante. esta clase termina siendo la tabla "student" en postgres.
// detalle importante: los nombres de los campos (name, lastName, email,
// courseId) son los que salen en el json, asi que tienen q ser IGUALES a los
// de la interface Student del angular. En la base las columnas van en
// snake_case (last_name, course_id) x eso uso @Column para amarrarlas
@Entity
@Table(name = "student")
public class Student {

    // aqui el id SI es autogenerado (IDENTITY), postgres le va poniendo
    // numero solito cada vez que insertamos. Distinto al de cursos jeje
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre obligatorio
    @Column(nullable = false)
    private String name;

    // el apellido en la base se llama last_name pero aqui en java lo manejo
    // como lastName, x eso el name = "last_name". Tmb es obligatorio
    @Column(name = "last_name", nullable = false)
    private String lastName;

    // El correo lo dejo opcional, no le puse nullable false a proposito
    private String email;

    // el id del curso al q pertenece el alumno (columna course_id en la bd)
    @Column(name = "course_id")
    private Integer courseId;

    // Constructor vacio que JPA siempre anda pidiendo
    public Student() {
    }

    // puros getters y setters de aqui pa bajo, lo de siempre pa cada campo
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
}
