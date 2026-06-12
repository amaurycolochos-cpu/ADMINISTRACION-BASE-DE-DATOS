package com.escuela.course.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

// esta clase es el Curso en si. con @Entity le digo a JPA que la convierta
// en una tabla. Los campos (id, name, description) son los mismos que tiene
// la interface Course alla en el angular, x eso encajan cuando regresa el json
@Entity
@Table(name = "course")
public class Course {

    // El id ahora usa una secuencia de Oracle para autogenerarse al hacer POST
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_seq")
    @SequenceGenerator(name = "course_seq", sequenceName = "course_seq", allocationSize = 1)
    private Long id;

    // el nombre NO puede ir vacio, x eso el nullable false
    @Column(nullable = false)
    private String name;

    // La descripcion si la dejo opcional, no pasa nada si va en blanco
    private String description;

    // constructor vacio... JPA lo pide aunque uno no lo use directo
    public Course() {
    }

    // De aqui pa abajo son puros getters y setters, lo tipico para
    // leer/escribir cada campo. nada que explicar la verdad
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
