import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Ejercicio {
  nombre: string;
  series: number;
  reps: number;
  peso: string;
  descanso: number;
}

interface Rutina {
  id: string;
  nombre: string;
  dias: string;
  autor: string;
  tipo: 'ASIGNADA' | 'PROPIA';
  ejerciciosCount: number;
  ejercicios: Ejercicio[];
  expanded: boolean;
}

@Component({
  selector: 'app-miembro-rutinas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent implements OnInit {
  rutinasDelEntrenador: Rutina[] = [];
  rutinasPropias: Rutina[] = [];

  ngOnInit(): void {
    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.rutinasDelEntrenador = [
      {
        id: '1',
        nombre: 'Rutina Piernas — Carlos Ríos',
        dias: 'Lun · Mié · Vie',
        autor: 'Carlos Ríos',
        tipo: 'ASIGNADA',
        ejerciciosCount: 4,
        expanded: true,
        ejercicios: [
          { nombre: 'Sentadilla', series: 4, reps: 12, peso: '60kg', descanso: 60 },
          { nombre: 'Prensa de piernas', series: 3, reps: 15, peso: '80kg', descanso: 45 },
          { nombre: 'Extensión cuádriceps', series: 3, reps: 12, peso: '40kg', descanso: 60 },
          { nombre: 'Curl femoral', series: 3, reps: 12, peso: '35kg', descanso: 60 }
        ]
      }
    ];

    this.rutinasPropias = [
      {
        id: '2',
        nombre: 'Cardio mañanero',
        dias: 'Mar · Jue',
        autor: 'Propia',
        tipo: 'PROPIA',
        ejerciciosCount: 3,
        expanded: false,
        ejercicios: [
          { nombre: 'Cinta de correr', series: 1, reps: 20, peso: '--', descanso: 0 },
          { nombre: 'Elíptica', series: 1, reps: 15, peso: '--', descanso: 0 },
          { nombre: 'Remo', series: 3, reps: 10, peso: '20kg', descanso: 45 }
        ]
      }
    ];
  }

  toggleRutina(rutina: Rutina): void {
    rutina.expanded = !rutina.expanded;
  }
}
