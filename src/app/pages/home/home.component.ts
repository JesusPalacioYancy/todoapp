import { Component, computed, signal, effect, inject, Injector } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { tareas } from '../../models/tareas.models'; // 
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // arrya de tareas tipo interfaz
  tareas =  signal<tareas[]>([]);

  // controlador de formilarios
  nuevaTareaCtrl = new FormControl('',{
    nonNullable : true,
    validators : [
      Validators.required
    ]
  });

  // señal del efecto de filtardo
  filter = signal<'all' | 'completed' | 'pending'>('all');

  // computed con los esstados de filtro y tareas.
  mostradoTareasFilter = computed(()=>{
  const filter = this.filter()
  const tareas = this.tareas()

  if (filter === 'pending'){
    return tareas.filter(tarea => !tarea.completado)
  };

  if (filter === 'completed'){
    return tareas.filter(tarea => tarea.completado)
  };

  return tareas
});

injector = inject(Injector)

ngOnInit() {
  const storage = localStorage.getItem('tareas');
  if (storage) {
    const tareas = JSON.parse(storage);
    this.tareas.set(tareas);
  };
  this.traqueartareas();
};

traqueartareas(){
  effect(()=>{
    const tareas = this.tareas()
    console.log(tareas)
    localStorage.setItem('tareas', JSON.stringify(tareas))
  },{injector: this.injector} );
};



// para capturar el valor y pasarlo al agregartarea
  chengeTarea(){
    if(this.nuevaTareaCtrl.valid){
      const value = this.nuevaTareaCtrl.value.trim();
      if(value !== ''){
        this.agregarTarea(value);
        this.nuevaTareaCtrl.setValue('')
      };
    };
  };

  
// Funcion que resive el string 
agregarTarea(titulo: string){
  const nuevaTarea = {
    id : Date.now(),
    titulo,
    completado : false
  };
  this.tareas.update((tareas) => [...tareas, nuevaTarea]);
};



// para eliminar valores del array.
  borrarTarea(index: number){
    this.tareas.update((tareas)=>tareas.filter((tareas,posicion)=> posicion !== index));
  };

// Para cambiar el estado de la tarea
  cambiarEstado(index : number){
    this.tareas.update((tareas)=>{
      return tareas.map((tarea, posicion)=>{
        if (posicion === index)
        return{
          ...tarea,
          completado : !tarea.completado
        };
        return tarea;
      });
    });
  };

// cambiando el esatdo es editado de la tarea 
cambiarEstadoEdicion(index: number){
  this.tareas.update((tareas)=>{
    return tareas.map((tarea, posicion)=>{
      if(posicion === index)
      return{
        ...tarea,
        editing: true,
      };
      return{
        ...tarea,
        editing: false
      }
    });
  });
};

// guardado el valor que se edita
editarTareatexto(index: number, evento : Event){
  const input = evento.target as HTMLInputElement;
  const nuevoValor = input.value;
  this.tareas.update((tareas)=>{
    return tareas.map((tarea, posicion)=>{
      if(posicion === index)
          return{ 
          ...tarea,
          titulo : nuevoValor,
          editing: false
      };
      return tarea
    });
  });
};

// Funcion que resibe el parametro del filtro y mostralo
chanseFilter(filter : 'all' | 'completed' | 'pending'){
  this.filter.set(filter);
};
};