import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-entrenadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.scss'
})
export class EntrenadoresComponent implements OnInit {
  private miembroService = inject(MiembroService);

  usuario: any = null;
  entrenadores: any[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.miembroService.getResumen().subscribe({
      next: (res: any) => {
        this.usuario = res.usuario;
        this.entrenadores = res.entrenadores || [];
      },
      error: (err: any) => console.error(err)
    });
  }

  elegir(entrenadorId: number): void {
    this.miembroService.elegirEntrenador(entrenadorId).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (err: any) => console.error(err)
    });
  }

  esCoachActual(entrenadorId: number): boolean {
    return this.usuario?.entrenador && this.usuario.entrenador.id === entrenadorId;
  }
}
