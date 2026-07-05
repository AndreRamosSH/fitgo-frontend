import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorService } from '../../../core/services/entrenador.service';

@Component({
  selector: 'app-entrenador-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.scss'
})
export class HorarioComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);

  entrenador: any = null;

  ngOnInit(): void {
    this.entrenadorService.getHorario().subscribe({
      next: (res: any) => {
        this.entrenador = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  get turnoAsignado(): string {
    return this.entrenador?.turno || 'Sin turno';
  }

  get experienciaTexto(): string {
    return this.entrenador ? this.entrenador.experienciaAnios + ' años' : '0 años';
  }

  get capacidadMaxima(): number {
    return this.entrenador?.maxMiembros || 0;
  }
}
