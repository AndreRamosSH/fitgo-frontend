import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorService } from '../../../core/services/entrenador.service';

@Component({
  selector: 'app-entrenador-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);

  totalMiembros = 0;
  asistencias: any[] = [];

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.entrenadorService.getResumen().subscribe({
      next: (res: any) => {
        this.totalMiembros = res.totalMiembros;
        this.asistencias = res.asistencias || [];
      },
      error: (err: any) => console.error(err)
    });
  }
}
