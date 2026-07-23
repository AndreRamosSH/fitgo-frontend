import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiembroService } from '../../../core/services/miembro.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

interface DiaCalendario {
  dia: number;
  entreno: boolean;
  esHoy: boolean;
}

interface ProgresoData {
  pesoActual: number | null;
  entrenosTotales: number;
  entrenosEsteMes: number;
  tiempoTotalHoras: number;
  tiempoPromedioMinutos: number;
  seriesTotales: number;
  seriesPorcentajeVariacion: number;
  rachaActual: number;
  semanas: number[];
  calendario: DiaCalendario[];
}

interface MesOpcion {
  key: string;      // Formato "YYYY-MM"
  label: string;    // Formato "Enero 2026"
}

@Component({
  selector: 'app-miembro-progreso',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedLucideIconsModule],
  templateUrl: './progreso.component.html',
  styleUrl: './progreso.component.scss'
})
export class ProgresoComponent implements OnInit {
  private miembroService = inject(MiembroService);

  mesSeleccionado = ''; // Formato "YYYY-MM"
  mesesDisponibles: MesOpcion[] = [];
  data: ProgresoData | null = null;
  cargando = false;

  nombreMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  ngOnInit(): void {
    this.inicializarMeses();
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    this.mesSeleccionado = `${anio}-${mes}`;
    
    this.cargarProgreso();
  }

  inicializarMeses(): void {
    const hoy = new Date();
    const opciones: MesOpcion[] = [];
    
    // Generar los últimos 12 meses para el selector
    for (let i = 0; i < 12; i++) {
      const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      const anio = d.getFullYear();
      const mesNum = String(d.getMonth() + 1).padStart(2, '0');
      const key = `${anio}-${mesNum}`;
      const label = `${this.nombreMeses[d.getMonth()]} ${anio}`;
      opciones.push({ key, label });
    }
    this.mesesDisponibles = opciones;
  }

  cargarProgreso(): void {
    this.cargando = true;
    this.miembroService.getProgreso(this.mesSeleccionado).subscribe({
      next: (res: ProgresoData) => {
        this.data = res;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar progreso:', err);
        this.cargando = false;
      }
    });
  }

  cambiarMes(mesKey: string): void {
    this.mesSeleccionado = mesKey;
    this.cargarProgreso();
  }

  navegarMes(offset: number): void {
    const parts = this.mesSeleccionado.split('-');
    const anio = parseInt(parts[0], 10);
    const mes = parseInt(parts[1], 10) - 1; // 0-indexed

    const nuevaFecha = new Date(anio, mes + offset, 1);
    const nuevoAnio = nuevaFecha.getFullYear();
    const nuevoMes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
    
    this.mesSeleccionado = `${nuevoAnio}-${nuevoMes}`;
    this.cargarProgreso();
  }

  obtenerNombreMesSeleccionado(): string {
    const parts = this.mesSeleccionado.split('-');
    if (parts.length < 2) return '';
    const mesIdx = parseInt(parts[1], 10) - 1;
    return this.nombreMeses[mesIdx] || '';
  }

  obtenerAlturaBarra(entrenos: number): string {
    // Si entrena un máximo de 7 días a la semana, sacamos la proporción.
    // Capped a un mínimo de 15% para que la barra no quede invisible si es 0, y 100% de alto.
    if (entrenos === 0) return '15%';
    const pct = (entrenos / 7) * 100;
    return `${Math.min(pct, 100)}%`;
  }
}
