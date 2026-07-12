import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-asignar-entrenador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-entrenador.component.html',
  styleUrl: './asignar-entrenador.component.scss'
})
export class AsignarEntrenadorComponent implements OnInit {
  private adminService = inject(AdminService);

  miembros: any[] = [];
  entrenadores: any[] = [];
  dropdownAbiertoMiembroId: number | null = null;

  ngOnInit(): void {
    this.cargarDatos();
  }

  toggleDropdown(miembroId: number): void {
    this.dropdownAbiertoMiembroId = this.dropdownAbiertoMiembroId === miembroId ? null : miembroId;
  }

  seleccionarEntrenador(miembroId: number, entrenadorId: number | null): void {
    this.onEntrenadorChange(miembroId, entrenadorId);
    this.dropdownAbiertoMiembroId = null;
  }

  getEntrenadorAsignadoTexto(miembro: any): string {
    return miembro.entrenador ? `${miembro.entrenador.usuario?.nombre} ${miembro.entrenador.usuario?.apellido}` : 'Sin asignar';
  }

  cargarDatos(): void {
    this.adminService.getMiembrosActivos().subscribe({
      next: (res) => {
        this.miembros = res;
      },
      error: (err) => console.error(err)
    });

    this.adminService.getEntrenadores().subscribe({
      next: (res) => {
        this.entrenadores = res;
      },
      error: (err) => console.error(err)
    });
  }

  onEntrenadorChange(miembroId: number, entrenadorId: number | null): void {
    this.adminService.asignarEntrenador(miembroId, entrenadorId).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (err) => console.error(err)
    });
  }
}
