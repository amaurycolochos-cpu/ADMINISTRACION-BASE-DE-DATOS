package com.escuela.course;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Aqui arranca todo el micro de cursos. literal es el main que prende spring boot.
// corre en el 8080 (eso lo dejamos amarrado en el application.properties)
@SpringBootApplication
public class CourseServiceApplication {

    // este metodo es el que ejecuta Java cuando levantamos el .jar... nada raro
    public static void main(String[] args) {
        SpringApplication.run(CourseServiceApplication.class, args);
    }
}
