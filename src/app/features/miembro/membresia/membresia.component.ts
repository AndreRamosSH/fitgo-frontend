import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-membresia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss'
})
export class MembresiaComponent implements OnInit {
  private miembroService = inject(MiembroService);
  membresia: any = null;

  ngOnInit(): void {
    this.miembroService.getMembresia().subscribe({
      next: (res: any) => {
        this.membresia = res.membresia !== 'Sin membresia activa' ? res.membresia : null;
      },
      error: (err: any) => console.error(err)
    });
  }

  get nombrePlan(): string {
    return this.membresia?.plan ? this.membresia.plan.nombre : 'Sin plan';
  }

  get detalleSuscripcion(): string {
    if (this.membresia?.fechaFin) {
      return 'Válido hasta: ';
    }
    return 'No tienes una suscripción activa';
  }

  get fechaFin(): Date | null {
    return this.membresia?.fechaFin || null;
  }

  get tieneFechaFin(): boolean {
    return !!this.membresia?.fechaFin;
  }
}
