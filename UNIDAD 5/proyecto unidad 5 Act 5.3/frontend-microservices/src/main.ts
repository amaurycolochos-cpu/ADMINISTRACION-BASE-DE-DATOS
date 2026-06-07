import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Este es EL arranque de toda la app de angular (standalone, sin el viejo
// AppModule). agarra el componente raiz App + la config y lo prende.
// el .catch es x si algo explota al iniciar, q al menos lo veamos en consola
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
