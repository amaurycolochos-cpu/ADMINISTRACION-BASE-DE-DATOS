package com.abd.student;

import java.util.logging.Logger;

public class LogExample {

    private static final Logger logger = Logger.getLogger(LogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Hola desde Java Logger");
        logger.warning("Advertencia de prueba");
        logger.info("Fin de ejecucion");
    }
}
