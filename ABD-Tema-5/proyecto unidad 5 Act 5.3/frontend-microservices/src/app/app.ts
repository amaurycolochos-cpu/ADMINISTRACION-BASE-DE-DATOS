import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// componente raiz de la app, o sea el "cascaron" donde vive todo lo demas.
// Trae el RouterOutlet (donde se pintan las paginas) y los RouterLink del menu
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Titulo q sale arriba en la barra. lo dejo en un signal aunq no cambie,
  // pero asi ya queda listo x si despues lo quiero hacer dinamico
  protected readonly title = signal('Frontend · Microservicios');
}
