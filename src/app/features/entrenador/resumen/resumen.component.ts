import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrenadorService, ResumenEntrenador, MemberAsistenciaHoy } from '../../../core/services/entrenador.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-entrenador-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedLucideIconsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);

  totalMiembros = 0;
  asistieronHoyCount = 0;
  totalRutinasCreadas = 0;
  rutinasAsignadasCount = 0;
  miembrosAsistencia: MemberAsistenciaHoy[] = [];

  miembroSeleccionadoCorreo = '';
  miembroSeleccionadoTexto = '';
  mostrarDropdownMiembros = false;
  filtroMiembro = '';
  miembrosFiltrados: MemberAsistenciaHoy[] = [];

  mensajeExito = '';
  mensajeError = '';
  registrando = false;

  fechaHoyTexto = '';

  ngOnInit(): void {
    this.formatFechaHoy();
    this.cargarResumen();
  }

  formatFechaHoy(): void {
    const hoy = new Date();
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    this.fechaHoyTexto = `Hoy · ${hoy.toLocaleDateString('es-ES', opciones)}`;
  }

  cargarResumen(): void {
    this.entrenadorService.getResumen().subscribe({
      next: (res: ResumenEntrenador) => {
        this.totalMiembros = res.totalMiembros || 0;
        this.asistieronHoyCount = res.asistieronHoyCount || 0;
        this.totalRutinasCreadas = res.totalRutinasCreadas || 0;
        this.rutinasAsignadasCount = res.rutinasAsignadasCount || 0;
        this.miembrosAsistencia = res.miembros || [];
        this.filtrarMiembrosDropdown();
      },
      error: (err: any) => console.error('Error al cargar resumen:', err)
    });
  }

  toggleDropdownMiembros(): void {
    this.mostrarDropdownMiembros = !this.mostrarDropdownMiembros;
    if (this.mostrarDropdownMiembros) {
      this.filtroMiembro = '';
      this.filtrarMiembrosDropdown();
    }
  }

  filtrarMiembrosDropdown(): void {
    if (!this.filtroMiembro || this.filtroMiembro.trim() === '') {
      this.miembrosFiltrados = [...this.miembrosAsistencia];
      return;
    }
    const q = this.filtroMiembro.toLowerCase().trim();
    this.miembrosFiltrados = this.miembrosAsistencia.filter(m =>
      m.nombre.toLowerCase().includes(q) ||
      m.apellido.toLowerCase().includes(q) ||
      m.correo.toLowerCase().includes(q)
    );
  }

  seleccionarMiembro(m: MemberAsistenciaHoy): void {
    this.miembroSeleccionadoCorreo = m.correo;
    this.miembroSeleccionadoTexto = `${m.nombre} ${m.apellido}`;
    this.mostrarDropdownMiembros = false;
  }

  registrarIngreso(): void {
    if (!this.miembroSeleccionadoCorreo) {
      this.mensajeError = 'Selecciona un miembro para registrar su ingreso.';
      return;
    }

    this.registrando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.entrenadorService.registrarAsistencia({ correo: this.miembroSeleccionadoCorreo }).subscribe({
      next: (res) => {
        this.mensajeExito = res.mensaje || 'Asistencia registrada con éxito.';
        this.registrando = false;
        this.miembroSeleccionadoCorreo = '';
        this.miembroSeleccionadoTexto = '';
        this.cargarResumen();
        setTimeout(() => this.mensajeExito = '', 4000);
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al registrar la asistencia.';
        this.registrando = false;
      }
    });
  }
}
