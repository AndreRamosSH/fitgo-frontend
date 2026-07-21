import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-admin-resumen',
  standalone: true,
  imports: [CommonModule, SharedLucideIconsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private adminService = inject(AdminService);

  totalUsuarios = 0;
  miembrosActivos = 0;
  totalEntrenadores = 0;
  membresiasPorVencer = 0;
  asistenciasHoy = 0;
  usuarios: any[] = [];

  paginaActual = 1;
  limitePorPagina = 6;

  ngOnInit(): void {
    this.cargarResumen();
  }

  get totalPaginas(): number {
    return Math.ceil(this.usuarios.length / this.limitePorPagina);
  }

  get usuariosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.limitePorPagina;
    return this.usuarios.slice(inicio, inicio + this.limitePorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  irAPagina(p: number): void {
    if (p >= 1 && p <= this.totalPaginas) {
      this.paginaActual = p;
    }
  }

  cargarResumen(): void {
    this.adminService.getResumen().subscribe({
      next: (res: any) => {
        this.totalUsuarios = res.totalUsuarios;
        this.miembrosActivos = res.miembrosActivos;
        this.totalEntrenadores = res.totalEntrenadores;
        this.membresiasPorVencer = res.membresiasPorVencer;
        this.asistenciasHoy = res.asistenciasHoy;
      },
      error: (err: any) => console.error(err)
    });

    this.adminService.getUsuarios().subscribe({
      next: (res: any) => {
        this.usuarios = res || [];
        this.paginaActual = 1;
      },
      error: (err: any) => console.error(err)
    });
  }
}
