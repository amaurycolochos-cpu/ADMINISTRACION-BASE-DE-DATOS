package com.abd.eurekaserver;

import java.util.logging.Logger;

public class EurekaRegistrationLogExample {

    private static final Logger logger = Logger.getLogger(EurekaRegistrationLogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Simulando registro de microservicio en Eureka");
        logger.info("Instancia STUDENT registrada con status UP");
        logger.info("Instancia COURSE registrada con status UP");
    }
}
