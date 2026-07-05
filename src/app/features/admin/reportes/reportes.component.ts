import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  activeTab: 'asistencias' | 'membresias' | 'entrenadores' = 'asistencias';
  mesSeleccionado: string = 'enero-2025';
  miembroSeleccionado: string = 'todos';

  meses = [
    { valor: 'enero-2025', texto: 'Enero 2025' }
  ];

  miembros = [
    { valor: 'todos', texto: 'Todos los miembros' }
  ];

  kpis = [
    { titulo: 'Total ingresos', valor: '187', etiqueta: 'Este mes', destacado: true },
    { titulo: 'Promedio diario', valor: '9', etiqueta: 'Personas por día', destacado: false },
    { titulo: 'Día más concurrido', valor: 'Lun', etiqueta: '28 ingresos', destacado: false },
    { titulo: 'Miembros ausentes', valor: '2', etiqueta: 'Sin asistir este mes', destacado: true }
  ];

  kpisReportes = [
    { titulo: 'Activas', valor: '7', etiqueta: 'Con membresía vigente', destacado: true },
    { titulo: 'Por vencer (7 días)', valor: '2', etiqueta: 'Requieren renovación', destacado: false },
    { titulo: 'Vencidas', valor: '1', etiqueta: 'Sin renovar', destacado: false },
    { titulo: 'Plan más popular', valor: 'Premium', etiqueta: '4 miembros', destacado: false }
  ];

  distribucionPlan = [
    { nombre: 'Premium', miembros: 4, porcentaje: 58, color: '#F97316' },
    { nombre: 'Estándar', miembros: 3, porcentaje: 20, color: '#10B981' },
    { nombre: 'Básico', miembros: 2, porcentaje: 22, color: '#3B82F6' }
  ];

  proximasVencer = [
    { miembro: 'Sofia Gomez', plan: 'Estándar', vence: '28 ene', dias: '3 días', estado: 'por-vencer' },
    { miembro: 'Josué Ramos', plan: 'Premium', vence: '30 ene', dias: '5 días', estado: 'por-vencer' },
    { miembro: 'María Vega', plan: '—', vence: '—', dias: 'Vencida', estado: 'vencida' }
  ];

  kpisEntrenadores = [
    { titulo: 'Total entrenadores', valor: '3', etiqueta: 'Activos', destacado: true },
    { titulo: 'Total rutinas creadas', valor: '9', etiqueta: 'Entre todos', destacado: false },
    { titulo: 'Más miembros', valor: 'Carlos R.', etiqueta: '5 alumnos', destacado: false },
    { titulo: 'Promedio alumnos', valor: '4', etiqueta: 'Por entrenador', destacado: false }
  ];

  comparativaEntrenadores = [
    { entrenador: 'Carlos Ríos', especialidad: 'Musculación', miembros: 5, rutinas: 3, membresiasActivas: '80%', estadoMembresia: 'bueno', carga: 50, colorCarga: '#F97316' },
    { entrenador: 'Ana Torres', especialidad: 'Cardio', miembros: 3, rutinas: 2, membresiasActivas: '100%', estadoMembresia: 'excelente', carga: 30, colorCarga: '#10B981' },
    { entrenador: 'Jorge Mendoza', especialidad: 'CrossFit', miembros: 4, rutinas: 4, membresiasActivas: '75%', estadoMembresia: 'regular', carga: 40, colorCarga: '#3B82F6' }
  ];

  ingresosPorDia = [
    { dia: 'L1', valor: 8, destacado: false },
    { dia: 'M1', valor: 11, destacado: true },
    { dia: 'J1', valor: 7, destacado: false },
    { dia: 'V1', valor: 9, destacado: false },
    { dia: 'L2', valor: 13, destacado: true },
    { dia: 'M2', valor: 6, destacado: false },
    { dia: 'J2', valor: 10, destacado: false },
    { dia: 'V2', valor: 14, destacado: true },
    { dia: 'L3', valor: 8, destacado: false },
    { dia: 'M3', valor: 12, destacado: true }
  ];

  asistenciasPorDiaSemana = [
    { dia: 'Lunes', valor: 28, porcentaje: 100 },
    { dia: 'Martes', valor: 24, porcentaje: 85 },
    { dia: 'Miércoles', valor: 19, porcentaje: 67 },
    { dia: 'Jueves', valor: 22, porcentaje: 78 },
    { dia: 'Viernes', valor: 27, porcentaje: 96 },
    { dia: 'Sábado', valor: 14, porcentaje: 50 }
  ];

  maxIngresosDia: number = 14;

  setActiveTab(tab: 'asistencias' | 'membresias' | 'entrenadores') {
    this.activeTab = tab;
  }
}
