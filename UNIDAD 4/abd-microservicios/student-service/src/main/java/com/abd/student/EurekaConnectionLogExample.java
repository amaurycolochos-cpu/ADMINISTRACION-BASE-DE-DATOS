package com.abd.student;

import java.util.logging.Logger;

public class EurekaConnectionLogExample {

    private static final Logger logger = Logger.getLogger(EurekaConnectionLogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Intentando conectar con Eureka Server en puerto 8761");

        try {
            throw new RuntimeException("Connection refused: localhost:8761");
        } catch (RuntimeException e) {
            logger.severe("Error de conexion: " + e.getMessage());
            logger.warning("Reintentando conexion...");
        }
    }
}
