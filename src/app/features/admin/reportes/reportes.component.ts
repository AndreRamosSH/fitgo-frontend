import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { AsistenciaReport, MembresiaReport, EntrenadorReport } from '../../../core/models/reportes.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  private adminService = inject(AdminService);

  activeTab: 'asistencias' | 'membresias' | 'entrenadores' = 'asistencias';
  mesSeleccionado: string = '';
  miembroSeleccionado: string = 'todos';
  mostrarDropdownMeses = false;
  mostrarDropdownMiembros = false;

  asistenciaReport?: AsistenciaReport;
  membresiaReport?: MembresiaReport;
  entrenadorReport?: EntrenadorReport;

  get mesSeleccionadoTexto(): string {
    if (!this.asistenciaReport?.mesesDisponibles) return '';
    const match = this.asistenciaReport.mesesDisponibles.find(m => m.valor === this.mesSeleccionado);
    return match ? match.texto : '';
  }

  get miembroSeleccionadoTexto(): string {
    if (!this.asistenciaReport?.miembrosDisponibles) return '';
    const match = this.asistenciaReport.miembrosDisponibles.find(mb => mb.valor === this.miembroSeleccionado);
    return match ? match.texto : '';
  }

  toggleDropdownMeses(): void {
    this.mostrarDropdownMeses = !this.mostrarDropdownMeses;
    if (this.mostrarDropdownMeses) {
      this.mostrarDropdownMiembros = false;
    }
  }

  toggleDropdownMiembros(): void {
    this.mostrarDropdownMiembros = !this.mostrarDropdownMiembros;
    if (this.mostrarDropdownMiembros) {
      this.mostrarDropdownMeses = false;
    }
  }

  seleccionarMes(valor: string): void {
    this.mesSeleccionado = valor;
    this.mostrarDropdownMeses = false;
    this.onFiltroChange();
  }

  seleccionarMiembro(valor: string): void {
    this.miembroSeleccionado = valor;
    this.mostrarDropdownMiembros = false;
    this.onFiltroChange();
  }

  ngOnInit() {
    this.cargarReporte();
  }

  cargarReporte() {
    if (this.activeTab === 'asistencias') {
      this.adminService.getAsistenciasReport(this.mesSeleccionado, this.miembroSeleccionado).subscribe({
        next: (data) => {
          this.asistenciaReport = data;
          if (!this.mesSeleccionado && data.mesesDisponibles && data.mesesDisponibles.length > 0) {
            this.mesSeleccionado = data.mesesDisponibles[0].valor;
          }
        }
      });
    } else if (this.activeTab === 'membresias') {
      this.adminService.getMembresiasReport().subscribe({
        next: (data) => {
          this.membresiaReport = data;
        }
      });
    } else if (this.activeTab === 'entrenadores') {
      this.adminService.getEntrenadoresReport().subscribe({
        next: (data) => {
          this.entrenadorReport = data;
        }
      });
    }
  }

  setActiveTab(tab: 'asistencias' | 'membresias' | 'entrenadores') {
    this.activeTab = tab;
    this.cargarReporte();
  }

  onFiltroChange() {
    if (this.activeTab === 'asistencias') {
      this.cargarReporte();
    }
  }

  get maxIngresosDia(): number {
    if (!this.asistenciaReport || !this.asistenciaReport.ingresosPorDia) {
      return 1;
    }
    const maxVal = Math.max(...this.asistenciaReport.ingresosPorDia.map(i => i.valor));
    return maxVal > 0 ? maxVal : 1;
  }

  getDonutStyle(): string {
    if (!this.membresiaReport || !this.membresiaReport.distribucionPlan || this.membresiaReport.distribucionPlan.length === 0) {
      return 'conic-gradient(var(--borde) 0% 100%)';
    }
    let accum = 0;
    const parts = this.membresiaReport.distribucionPlan.map(p => {
      const start = accum;
      accum += p.porcentaje;
      return `${p.color} ${start}% ${accum}%`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }
}
