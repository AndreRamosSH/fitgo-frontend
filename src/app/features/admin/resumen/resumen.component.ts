import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-resumen',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit(): void {
    this.cargarResumen();
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
      },
      error: (err: any) => console.error(err)
    });
  }
}
