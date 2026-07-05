import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenadorService } from '../../../core/services/entrenador.service';

@Component({
  selector: 'app-entrenador-miembros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);

  miembros: any[] = [];
  totalMiembros = 0;

  ngOnInit(): void {
    this.cargarMiembros();
  }

  cargarMiembros(): void {
    this.entrenadorService.getMiembros().subscribe({
      next: (res: any) => {
        this.miembros = res.miembros || [];
        this.totalMiembros = res.totalMiembros;
      },
      error: (err: any) => console.error(err)
    });
  }
}
