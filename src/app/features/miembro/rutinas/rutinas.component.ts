import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmService } from '../../../core/services/confirm.service';
import { LayoutComponent } from '../../../shared/components/layout/layout.component';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';
import { EJERCICIOS_BASE, EjercicioBase } from '../../../shared/data/ejercicios-base';
import { RutinaService } from '../../../core/services/rutina.service';

interface EjercicioAgregado {
  ejercicio: EjercicioBase;
  series: number;
  reps: number;
  peso: string;
  descanso: number;
}

interface Rutina {
  id: string;
  nombre: string;
  dias: string;
  autor: string;
  tipo: 'ASIGNADA' | 'PROPIA';
  ejerciciosCount: number;
  ejercicios: {
    id?: string;
    ejercicioId?: string;
    nombre: string;
    series: number;
    reps: number;
    peso: string;
    descanso: number;
  }[];
  expanded: boolean;
}

function quitarAcentos(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

@Component({
  selector: 'app-miembro-rutinas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgOptimizedImage,
    SharedLucideIconsModule
  ],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent implements OnInit, OnDestroy {
  private confirmService = inject(ConfirmService);
  private router = inject(Router);
  private layout = inject(LayoutComponent, { optional: true });
  private rutinaService = inject(RutinaService);
  vista: 'LISTA' | 'CREAR' = 'LISTA';
  rutinaEditandoId: string | null = null;

  // Rutinas en memoria
  rutinasDelEntrenador: Rutina[] = [];
  rutinasPropias: Rutina[] = [];

  // Formulario de Nueva Rutina
  nuevoNombre = '';
  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  nuevosDias: string[] = [];
  ejerciciosAgregados: EjercicioAgregado[] = [];

  // Buscador de Ejercicios
  filtroNombre = '';
  ejerciciosBase: EjercicioBase[] = EJERCICIOS_BASE;

  // Filtros de Búsqueda
  mostrarModalMusculo = false;
  mostrarModalTipo = false;
  filtroTrenSuperior = false;
  filtroTrenInferior = false;
  subMusculos: Record<string, boolean> = {
    pecho: false, espalda: false, biceps: false, triceps: false, antebrazos: false, hombros: false,
    cuadriceps: false, femorales: false, gluteos: false, pantorrillas: false, aductores: false, abductores: false, abs: false
  };

  tiposSeleccionados: Record<string, boolean> = {
    'Poleas': false,
    'Smith': false,
    'Maquina libre': false,
    'Peso Corporal': false,
    'Pesos Libres': false
  };

  filtrosMusculo = {
    pecho: false,
    espalda: false,
    piernas: false,
    hombros: false,
    biceps: false,
    triceps: false
  };

  filtrosTipo = {
    poleas: false,
    smith: false,
    maquinaLibre: false,
    pesoCorporal: false
  };

  // Edición de Ejercicio Agregado Modal
  mostrarModalEditar = false;
  ejercicioEditandoIndex: number | null = null;
  edicionSeries = 3;
  edicionReps = 12;
  edicionPeso = '15kg';
  edicionDescanso = 60;

  // Toast de Validación
  toastVisible = false;
  toastMensaje = '';
  yaEntrenoHoy = false;

  ngOnInit(): void {
    this.cargarRutinas();
    this.validarHistorialHoy();
  }

  validarHistorialHoy(): void {
    this.rutinaService.getHistorial().subscribe({
      next: (historial) => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        const hoyStr = `${yyyy}-${mm}-${dd}`;

        this.yaEntrenoHoy = (historial || []).some((item: any) => {
          if (!item.fecha) return false;
          return item.fecha.startsWith(hoyStr);
        });
      },
      error: (err) => console.error('Error al validar historial de hoy:', err)
    });
  }

  ngOnDestroy(): void {
  }

  cargarRutinas(): void {
    this.rutinaService.getRutinas().subscribe({
      next: (rutinas) => {
        this.rutinasDelEntrenador = rutinas.filter(r => r.tipo === 'ASIGNADA');
        this.rutinasPropias = rutinas.filter(r => r.tipo === 'PROPIA');
      },
      error: (err) => {
        console.error('Error al cargar rutinas:', err);
        this.mostrarToast('Error al cargar las rutinas desde el servidor.');
      }
    });
  }

  toggleRutina(rutina: Rutina): void {
    rutina.expanded = !rutina.expanded;
  }

  irACrear(): void {
    this.rutinaEditandoId = null;
    this.nuevoNombre = '';
    this.nuevosDias = [];
    this.ejerciciosAgregados = [];
    this.vista = 'CREAR';
  }

  editarRutina(rutina: Rutina): void {
    this.rutinaEditandoId = rutina.id;
    this.nuevoNombre = rutina.nombre;

    // Mapear días
    const diasArray = rutina.dias.split('·').map(d => d.trim());
    this.nuevosDias = [...diasArray];

    // Mapear ejercicios agregados
    this.ejerciciosAgregados = (rutina.ejercicios || []).map(e => {
      const ejBase = this.ejerciciosBase.find(eb => eb.id === e.ejercicioId || eb.nombre === e.nombre) || {
        id: e.ejercicioId || 'custom',
        nombre: e.nombre,
        musculo: 'General',
        tipo: 'Libre',
        imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-cross-over-variation.gif'
      };
      return {
        ejercicio: ejBase,
        series: e.series,
        reps: e.reps,
        peso: e.peso,
        descanso: e.descanso
      };
    });

    this.vista = 'CREAR';
  }

  eliminarRutina(rutina: Rutina): void {
    this.confirmService.confirmar({
      titulo: 'Eliminar Rutina',
      mensaje: `¿Estás seguro de que deseas eliminar la rutina "${rutina.nombre}"?`,
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.rutinaService.eliminarRutina(rutina.id).subscribe({
          next: () => {
            this.cargarRutinas();
          },
          error: (err) => {
            console.error('Error al eliminar rutina:', err);
            this.mostrarToast('Error al eliminar la rutina. No tienes permisos.');
          }
        });
      }
    });
  }

  cancelarCreacion(): void {
    this.vista = 'LISTA';
  }

  toggleDia(dia: string): void {
    const idx = this.nuevosDias.indexOf(dia);
    if (idx > -1) {
      this.nuevosDias.splice(idx, 1);
    } else {
      this.nuevosDias.push(dia);
    }
  }

  diaSeleccionado(dia: string): boolean {
    return this.nuevosDias.includes(dia);
  }

  get ejerciciosFiltrados(): EjercicioBase[] {
    const musculosActivos = Object.keys(this.subMusculos).filter(m => this.subMusculos[m]);
    const tiposActivos = Object.keys(this.tiposSeleccionados).filter(t => this.tiposSeleccionados[t]);

    const tieneFiltros = this.filtroNombre.trim() !== '' ||
                         musculosActivos.length > 0 ||
                         tiposActivos.length > 0;

    const list = this.ejerciciosBase.filter(ej => {
      // Filtro por nombre o músculo en caja de texto
      if (this.filtroNombre.trim()) {
        const q = quitarAcentos(this.filtroNombre.toLowerCase().trim());
        const coincideNombre = quitarAcentos(ej.nombre.toLowerCase()).includes(q);
        const coincideMusculo = quitarAcentos(ej.musculo.toLowerCase()).includes(q);
        if (!coincideNombre && !coincideMusculo) {
          return false;
        }
      }

      // Filtro por Músculo seleccionado en Modal
      if (musculosActivos.length > 0) {
        if (!musculosActivos.includes(ej.musculo.toLowerCase())) {
          return false;
        }
      }

      // Filtro por Tipo de equipamiento seleccionado en Modal
      if (tiposActivos.length > 0) {
        if (!tiposActivos.includes(ej.tipo)) {
          return false;
        }
      }

      return true;
    });

    return tieneFiltros ? list : list.slice(0, 5);
  }

  agregarEjercicio(ejercicio: EjercicioBase): void {
    this.ejerciciosAgregados.push({
      ejercicio,
      series: 3,
      reps: 12,
      peso: '15kg',
      descanso: 60
    });
  }

  eliminarEjercicio(index: number): void {
    this.ejerciciosAgregados.splice(index, 1);
  }

  abrirEdicion(index: number): void {
    this.ejercicioEditandoIndex = index;
    const item = this.ejerciciosAgregados[index];
    this.edicionSeries = item.series;
    this.edicionReps = item.reps;
    this.edicionPeso = item.peso;
    this.edicionDescanso = item.descanso;
    this.mostrarModalEditar = true;
  }

  guardarEdicion(): void {
    if (this.ejercicioEditandoIndex !== null) {
      this.ejerciciosAgregados[this.ejercicioEditandoIndex] = {
        ...this.ejerciciosAgregados[this.ejercicioEditandoIndex],
        series: this.edicionSeries,
        reps: this.edicionReps,
        peso: this.edicionPeso,
        descanso: this.edicionDescanso
      };
      this.ejercicioEditandoIndex = null;
    }
    this.mostrarModalEditar = false;
  }

  mostrarToast(mensaje: string): void {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3500);
  }

  guardarRutina(): void {
    if (!this.nuevoNombre.trim()) {
      this.mostrarToast('Por favor, ingresa el nombre de la rutina.');
      return;
    }

    if (this.nuevosDias.length === 0) {
      this.mostrarToast('Selecciona al menos un día para realizar la rutina.');
      return;
    }

    if (this.ejerciciosAgregados.length === 0) {
      this.mostrarToast('Agrega al menos un ejercicio a la rutina.');
      return;
    }

    const diasTexto = this.diasSemana
      .filter(d => this.nuevosDias.includes(d))
      .join(' · ');

    const ejerciciosParaRutina = this.ejerciciosAgregados.map(ea => ({
      ejercicioId: ea.ejercicio.id,
      nombre: ea.ejercicio.nombre,
      series: ea.series,
      reps: ea.reps,
      peso: ea.peso,
      descanso: ea.descanso
    }));

    const payload = {
      nombre: this.nuevoNombre.trim(),
      dias: diasTexto,
      ejercicios: ejerciciosParaRutina
    };

    if (this.rutinaEditandoId) {
      // Modo Edición
      this.rutinaService.editarRutina(this.rutinaEditandoId, payload).subscribe({
        next: () => {
          this.cargarRutinas();
          this.vista = 'LISTA';
        },
        error: (err) => {
          console.error('Error al editar rutina:', err);
          this.mostrarToast('Error al actualizar la rutina.');
        }
      });
    } else {
      // Modo Crear Nueva
      this.rutinaService.crearRutina(payload).subscribe({
        next: () => {
          this.cargarRutinas();
          this.vista = 'LISTA';
        },
        error: (err) => {
          console.error('Error al crear rutina:', err);
          this.mostrarToast('Error al guardar la rutina.');
        }
      });
    }
  }

  iniciarEntreno(rutina: Rutina): void {
    if (this.yaEntrenoHoy) {
      this.confirmService.confirmar({
        titulo: 'Entrenamiento Realizado',
        mensaje: '¡Ya has completado un entrenamiento hoy! Te recomendamos descansar hoy para permitir la correcta recuperación muscular.',
        textoConfirmar: 'Entendido',
        ocultarCancelar: true
      }).subscribe();
      return;
    }
    this.router.navigate(['/miembro/rutinas/entreno', rutina.id], {
      state: { rutina }
    });
  }

  toggleSidebar(): void {
    if (this.layout) {
      this.layout.sidebarAbierto = !this.layout.sidebarAbierto;
    }
  }
}
