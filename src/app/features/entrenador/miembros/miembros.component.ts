import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrenadorService, MiembroTarjetaDTO, MiembroDetalleDTO } from '../../../core/services/entrenador.service';
import { RutinaService } from '../../../core/services/rutina.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-entrenador-miembros',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedLucideIconsModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent implements OnInit {
  private entrenadorService = inject(EntrenadorService);
  private rutinaService = inject(RutinaService);

  vista: 'LISTA' | 'DETALLE' = 'LISTA';

  miembros: MiembroTarjetaDTO[] = [];
  miembrosFiltrados: MiembroTarjetaDTO[] = [];
  totalMiembros = 0;
  busqueda = '';


  detalleMiembro: MiembroDetalleDTO | null = null;
  cargandoDetalle = false;


  mostrarModalRutina = false;
  rutinasPlantillas: any[] = [];
  rutinaSeleccionadaId: string | null = null;
  asignandoRutina = false;

  ngOnInit(): void {
    this.cargarMiembros();
  }

  cargarMiembros(): void {
    this.entrenadorService.getMiembros().subscribe({
      next: (res) => {
        this.miembros = res.miembros || [];
        this.totalMiembros = res.totalMiembros || 0;
        this.filtrarMiembros();
      },
      error: (err) => console.error('Error al cargar miembros:', err)
    });
  }

  filtrarMiembros(): void {
    if (!this.busqueda || this.busqueda.trim() === '') {
      this.miembrosFiltrados = [...this.miembros];
      return;
    }

    const q = this.busqueda.toLowerCase().trim();
    this.miembrosFiltrados = this.miembros.filter(m =>
      m.nombre.toLowerCase().includes(q) ||
      m.apellido.toLowerCase().includes(q) ||
      m.correo.toLowerCase().includes(q)
    );
  }

  verDetalleMiembro(miembroId: number): void {
    this.cargandoDetalle = true;
    this.vista = 'DETALLE';

    this.entrenadorService.getDetalleMiembro(miembroId).subscribe({
      next: (data) => {
        this.detalleMiembro = data;
        this.cargandoDetalle = false;
      },
      error: (err) => {
        console.error('Error al cargar detalle del miembro:', err);
        this.cargandoDetalle = false;
      }
    });
  }

  volverALista(): void {
    this.vista = 'LISTA';
    this.detalleMiembro = null;
    this.cargarMiembros();
  }

  abrirModalCambiarRutina(): void {
    this.rutinaService.getRutinas().subscribe({
      next: (rutinas) => {
        this.rutinasPlantillas = rutinas || [];
        this.rutinaSeleccionadaId = null;
        this.mostrarModalRutina = true;
      },
      error: (err) => console.error('Error al cargar rutinas:', err)
    });
  }

  cerrarModalRutina(): void {
    this.mostrarModalRutina = false;
    this.rutinaSeleccionadaId = null;
  }

  confirmarAsignacionRutina(): void {
    if (!this.rutinaSeleccionadaId || !this.detalleMiembro) return;

    this.asignandoRutina = true;
    this.rutinaService.asignarRutinaAMiembros(this.rutinaSeleccionadaId, [this.detalleMiembro.id]).subscribe({
      next: () => {
        this.asignandoRutina = false;
        this.cerrarModalRutina();
        if (this.detalleMiembro) {
          this.verDetalleMiembro(this.detalleMiembro.id);
        }
      },
      error: (err) => {
        console.error('Error al asignar rutina:', err);
        this.asignandoRutina = false;
      }
    });
  }
}
