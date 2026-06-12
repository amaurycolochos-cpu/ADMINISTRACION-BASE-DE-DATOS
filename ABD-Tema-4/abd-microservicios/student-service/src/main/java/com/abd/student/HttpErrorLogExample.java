package com.abd.student;

import java.util.logging.Logger;

public class HttpErrorLogExample {

    private static final Logger logger = Logger.getLogger(HttpErrorLogExample.class.getName());

    public static void main(String[] args) {
        logger.info("Procesando peticion GET /api/student/all");
        logger.warning("404 NOT_FOUND: No mapping for GET /favicon.ico");
        logger.info("200 OK - Respuesta enviada correctamente");
    }
}
