import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private miembroService = inject(MiembroService);

  usuario: any = null;
  rachaActual = 0;
  pesoActual = 0;
  membresia: any = null;
  entrenadores: any[] = [];
  filtro = '';

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.miembroService.getResumen().subscribe({
      next: (res: any) => {
        this.usuario = res.usuario;
        this.rachaActual = res.rachaActual;
        this.pesoActual = res.pesoActual;
        this.membresia = res.membresia;
        this.entrenadores = res.entrenadores || [];
      },
      error: (err: any) => console.error(err)
    });
  }

  get entrenadoresFiltrados(): any[] {
    if (!this.filtro.trim()) return this.entrenadores;
    const f = this.filtro.toLowerCase();
    return this.entrenadores.filter(e => 
      e.usuario.nombre.toLowerCase().includes(f) ||
      e.usuario.apellido.toLowerCase().includes(f) ||
      e.turno.toLowerCase().includes(f)
    );
  }

  get nombreUsuario(): string {
    return this.usuario?.nombre || 'Usuario';
  }

  get pesoFormateado(): string {
    return this.pesoActual > 0 ? this.pesoActual + ' kg' : '-- kg';
  }

  get fechaProximoPago(): Date | null {
    return this.membresia?.fechaFin || null;
  }

  get planActivo(): string {
    return this.membresia?.plan ? 'Plan ' + this.membresia.plan.nombre : 'Sin plan activo';
  }
}
