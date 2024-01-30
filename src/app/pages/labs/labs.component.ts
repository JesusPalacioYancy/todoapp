import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { __values } from 'tslib';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  subtitulo = 'Desde Angular';
  tareas = signal([
    'Aprender Angular',
    'Instalara Agular',
    'Crear Proyectos',
    'Crear componentes'
  ]);
// designamos variables las cuales nos 
  name = signal('Jesus');
  age = signal(19);
  private id = 14669287;
  estado = true;
  imagen = "https://w3schools.com/howto/img_avatar.png";

  person = signal({
    name : 'alex',
    age : 17,
    avatar : 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCrtl = new FormControl();
  widthCrtl = new FormControl(50,{
    nonNullable: true
  });

  nameCrtl = new FormControl("jesus",{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


  constructor(){
    this.colorCrtl.valueChanges.subscribe(value =>{
      console.log(value)
    });
  };

  mostrarAlertaDelFormualrio() {
    alert("Formulario enviado correctamente");
  };

  eventoDesdeChanse(evento: Event){
    const input = evento.target as HTMLInputElement;
    const nuevoValor = input.value;
    this.name.set(nuevoValor)
  };

  ecevntosDesDeKeydown(evento:Event){
    const input = evento.target as HTMLInputElement;
    const nuevoValor = parseInt(input.value);
    this.age.set(nuevoValor);
  };


  eventoDesdeChaseObjPersonaAge(evento: Event){
    const input = evento.target as HTMLInputElement;
    const nuevoValor = input.value;
    this.person.update(estadoAnterior => {
      return{
        ...estadoAnterior,
        age : parseInt(nuevoValor, 10)
      };
    });
  };

  eventoDesdeChaseObjPersonaName(evento: Event){
    const input = evento.target as HTMLInputElement
    const nuevoValor = input.value
    this.person.update(estadoAnterior =>{
      return{
        ...estadoAnterior,
        name : nuevoValor
      };
    });
  };




};
