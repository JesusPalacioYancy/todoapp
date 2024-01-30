 // importamos el modulo 
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // llamamos al modulo 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  titulo = 'todo-app';
  subtitulo = 'Desde Angular';
  tareas = [
    'Aprender Angular',
    'Instalara Agular',
    'Crear Proyectos',
    'Crear componentes'
  ];
};
