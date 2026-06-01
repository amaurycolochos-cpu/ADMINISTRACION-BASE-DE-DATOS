package com.abd.student;

import java.util.logging.Logger;

public class ErrorLogExample {

    private static final Logger logger = Logger.getLogger(ErrorLogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Iniciando prueba");

        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            logger.severe("Error: " + e.getMessage());
            logger.info("Continua la ejecucion");
        }
    }
}
