import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Aqui va la config global de la app. son los "providers", o sea las cosas
// que quiero tener disponibles en toda la aplicacion de un jalon
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // escucha errores globales del navegador
    provideRouter(routes),                 // prende el ruteo con mis rutas (app.routes.ts)
    // Este es el importante pa la practica: habilita el HttpClient en toda la
    // app, q es lo q me deja hacerle las peticiones http a los microservicios
    provideHttpClient(),
  ],
};
