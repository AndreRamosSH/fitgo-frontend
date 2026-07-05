import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EntrenadorService } from '../../../core/services/entrenador.service';

@Component({
  selector: 'app-entrenador-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);
  private router = inject(Router);

  miembros: any[] = [];
  correoSeleccionado = '';
  error = '';
  exito = '';

  ngOnInit(): void {
    this.cargarMiembros();
  }

  cargarMiembros(): void {
    this.entrenadorService.getMiembros().subscribe({
      next: (res: any) => {
        this.miembros = res.miembros || [];
      },
      error: (err: any) => console.error(err)
    });
  }

  onSubmit(): void {
    this.error = '';
    this.exito = '';

    if (!this.correoSeleccionado) {
      this.error = 'Debes seleccionar un miembro';
      return;
    }

    this.entrenadorService.registrarAsistencia({ correo: this.correoSeleccionado }).subscribe({
      next: (res: any) => {
        this.exito = 'Asistencia registrada con éxito';
        setTimeout(() => {
          this.router.navigate(['/entrenador/resumen']);
        }, 1500);
      },
      error: (err: any) => {
        this.error = err.error?.error || 'No se pudo registrar la asistencia';
      }
    });
  }
}
