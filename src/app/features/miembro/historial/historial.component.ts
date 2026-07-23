import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutinaService } from '../../../core/services/rutina.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

interface MesOpcion {
  key: string;      // Formato "YYYY-MM"
  label: string;    // Formato "Enero 2026"
}

@Component({
  selector: 'app-miembro-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedLucideIconsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {
  private rutinaService = inject(RutinaService);

  historialCompleto: any[] = [];
  historialFiltrado: any[] = [];
  historialPaginado: any[] = [];
  cargando = true;
  mensajeError = '';

  // Selector de Mes
  mesSeleccionado = '';
  mesesDisponibles: MesOpcion[] = [];
  nombreMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 1;
  paginas: number[] = [];

  ngOnInit(): void {
    this.inicializarMeses();
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    this.mesSeleccionado = `${anio}-${mes}`;

    this.cargarHistorial();
  }

  inicializarMeses(): void {
    const hoy = new Date();
    const opciones: MesOpcion[] = [];
    
    // Generar los últimos 12 meses
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

  cargarHistorial(): void {
    this.cargando = true;
    this.rutinaService.getHistorial().subscribe({
      next: (res: any[]) => {
        this.historialCompleto = (res || []).map(item => {
          // Agrupar detalles planos del backend por nombre de ejercicio
          const groupedMap = new Map<string, any[]>();
          if (item.detalles) {
            item.detalles.forEach((det: any) => {
              const nombre = det.ejercicioNombre || 'Ejercicio';
              if (!groupedMap.has(nombre)) {
                groupedMap.set(nombre, []);
              }
              groupedMap.get(nombre)!.push({
                numero: det.serieNumero,
                reps: det.reps,
                peso: det.peso
              });
            });
          }
          
          const ejerciciosGrouped: any[] = [];
          groupedMap.forEach((series, nombre) => {
            // Ordenar las series por número
            series.sort((a, b) => a.numero - b.numero);
            ejerciciosGrouped.push({ nombre, series });
          });

          return {
            ...item,
            ejerciciosGrouped
          };
        });
        this.aplicarFiltroYControlarPaginacion();
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar historial:', err);
        this.mensajeError = 'No se pudo cargar el historial de entrenamientos.';
        this.cargando = false;
      }
    });
  }

  aplicarFiltroYControlarPaginacion(): void {
    // Filtrar por el mes seleccionado
    this.historialFiltrado = this.historialCompleto.filter(item => {
      if (!item.fecha) return false;
      return item.fecha.startsWith(this.mesSeleccionado);
    });

    // Calcular páginas
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.historialFiltrado.length / this.itemsPorPagina) || 1;
    
    this.paginas = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      this.paginas.push(i);
    }

    this.actualizarHistorialPaginado();
  }

  actualizarHistorialPaginado(): void {
    const start = (this.paginaActual - 1) * this.itemsPorPagina;
    const end = start + this.itemsPorPagina;
    this.historialPaginado = this.historialFiltrado.slice(start, end);
  }

  cambiarMes(mesKey: string): void {
    this.mesSeleccionado = mesKey;
    this.aplicarFiltroYControlarPaginacion();
  }

  navegarMes(offset: number): void {
    const parts = this.mesSeleccionado.split('-');
    const anio = parseInt(parts[0], 10);
    const mes = parseInt(parts[1], 10) - 1; // 0-indexed

    const nuevaFecha = new Date(anio, mes + offset, 1);
    const nuevoAnio = nuevaFecha.getFullYear();
    const nuevoMes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
    
    this.mesSeleccionado = `${nuevoAnio}-${nuevoMes}`;
    this.aplicarFiltroYControlarPaginacion();
  }

  toggleEntrenamiento(item: any): void {
    item.expanded = !item.expanded;
  }

  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
    this.actualizarHistorialPaginado();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarHistorialPaginado();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarHistorialPaginado();
    }
  }

  formatearDuracion(segundos: number): string {
    if (!segundos) return '0s';
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;

    let res = '';
    if (hrs > 0) res += `${hrs}h `;
    if (mins > 0) res += `${mins}m `;
    if (segs > 0 || res === '') res += `${segs}s`;
    return res.trim();
  }
}
