package com.escuela.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// igual que el de cursos pero este es el de Estudiantes.
// Este micro vive en el puerto 8090 (revisar application.properties)
@SpringBootApplication
public class StudentServiceApplication {

    // El main de siempre, aqui prende spring boot y ya jala el servicio
    public static void main(String[] args) {
        SpringApplication.run(StudentServiceApplication.class, args);
    }
}
