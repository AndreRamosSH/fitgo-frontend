import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-entrenadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.scss'
})
export class EntrenadoresComponent implements OnInit {
  private miembroService = inject(MiembroService);

  usuario: any = null;
  entrenadores: any[] = [];
  filtro = '';

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

  get entrenadoresFiltrados(): any[] {
    if (!this.filtro.trim()) return this.entrenadores;
    const f = this.filtro.toLowerCase();
    return this.entrenadores.filter(e => 
      e.usuario.nombre.toLowerCase().includes(f) ||
      e.usuario.apellido.toLowerCase().includes(f)
    );
  }

  esCoachActual(entrenadorId: number): boolean {
    return this.usuario?.entrenador && this.usuario.entrenador.id === entrenadorId;
  }
}
