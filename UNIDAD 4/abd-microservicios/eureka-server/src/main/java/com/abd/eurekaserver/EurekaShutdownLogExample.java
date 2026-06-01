package com.abd.eurekaserver;

import java.util.logging.Logger;

public class EurekaShutdownLogExample {

    private static final Logger logger = Logger.getLogger(EurekaShutdownLogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Apagando Eureka Server...");
        logger.warning("Desconectando microservicios registrados");
        logger.info("Shutdown completado");
    }
}
