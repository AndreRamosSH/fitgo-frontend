import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmService } from '../../../core/services/confirm.service';
import { LayoutComponent } from '../../../shared/components/layout/layout.component';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';
import { EJERCICIOS_BASE, EjercicioBase } from '../../../shared/data/ejercicios-base';

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
    nombre: string;
    series: number;
    reps: number;
    peso: string;
    descanso: number;
  }[];
  expanded: boolean;
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
    cuadriceps: false, femorales: false, gluteos: false, pantorrillas: false, aductores: false, abductores: false
  };

  tiposSeleccionados: Record<string, boolean> = {
    'Poleas': false,
    'Smith': false,
    'Maquina libre': false,
    'Peso Corporal': false
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

  ngOnInit(): void {
    this.cargarRutinasMock();
  }

  ngOnDestroy(): void {
  }

  cargarRutinasMock(): void {
    this.rutinasDelEntrenador = [
      {
        id: 'r1',
        nombre: 'Rutina Hipertrofia Pecho y Tríceps',
        dias: 'Lun · Mié · Vie',
        autor: 'Entrenador Carlos',
        tipo: 'ASIGNADA',
        ejerciciosCount: 4,
        expanded: false,
        ejercicios: [
          { nombre: 'Press de banca (Bench Press)', series: 4, reps: 10, peso: '60kg', descanso: 90 },
          { nombre: 'Aperturas en polea (Cable Fly)', series: 3, reps: 12, peso: '15kg', descanso: 60 },
          { nombre: 'Flexiones de pecho (Push Up)', series: 3, reps: 15, peso: 'Corporal', descanso: 45 },
          { nombre: 'Extensión de tríceps en polea', series: 4, reps: 12, peso: '20kg', descanso: 60 }
        ]
      },
      {
        id: 'r2',
        nombre: 'Fuerza Espalda y Bíceps',
        dias: 'Mar · Jue',
        autor: 'Entrenador Carlos',
        tipo: 'ASIGNADA',
        ejerciciosCount: 3,
        expanded: false,
        ejercicios: [
          { nombre: 'Jalón al pecho (Lat Pulldown)', series: 4, reps: 8, peso: '50kg', descanso: 90 },
          { nombre: 'Remo con barra (Barbell Row)', series: 4, reps: 8, peso: '55kg', descanso: 90 },
          { nombre: 'Curl de bíceps con mancuernas', series: 3, reps: 10, peso: '14kg', descanso: 60 }
        ]
      }
    ];

    this.rutinasPropias = [
      {
        id: 'rp1',
        nombre: 'Mi Rutina de Pierna Intensa',
        dias: 'Sáb',
        autor: 'Yo',
        tipo: 'PROPIA',
        ejerciciosCount: 2,
        expanded: false,
        ejercicios: [
          { nombre: 'Sentadillas con barra (Squat)', series: 4, reps: 10, peso: '80kg', descanso: 120 },
          { nombre: 'Prensa de piernas (Leg Press)', series: 4, reps: 12, peso: '120kg', descanso: 90 }
        ]
      }
    ];
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
      const ejBase = this.ejerciciosBase.find(eb => eb.nombre === e.nombre) || {
        id: 'custom',
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

  async eliminarRutina(rutina: Rutina): Promise<void> {
    const confirmado = await this.confirmService.confirmar({
      titulo: 'Eliminar Rutina',
      mensaje: `¿Estás seguro de que deseas eliminar la rutina "${rutina.nombre}"?`,
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    });

    if (confirmado) {
      this.rutinasPropias = this.rutinasPropias.filter(r => r.id !== rutina.id);
      this.rutinasDelEntrenador = this.rutinasDelEntrenador.filter(r => r.id !== rutina.id);
    }
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
    return this.ejerciciosBase.filter(ej => {
      // Filtro por nombre
      if (this.filtroNombre && !ej.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) && !ej.musculo.toLowerCase().includes(this.filtroNombre.toLowerCase())) {
        return false;
      }

      // Filtro por Músculo
      const musculosActivos = Object.keys(this.filtrosMusculo).filter(m => (this.filtrosMusculo as any)[m]);
      if (musculosActivos.length > 0 && !musculosActivos.includes(ej.musculo.toLowerCase())) {
        return false;
      }

      // Filtro por Tipo
      const tiposActivos = Object.keys(this.filtrosTipo).filter(t => (this.filtrosTipo as any)[t]);
      if (tiposActivos.length > 0) {
        const tipoNormalizado = ej.tipo.toLowerCase().replace(/\s+/g, '');
        const coincide = tiposActivos.some(t => tipoNormalizado.includes(t.toLowerCase()));
        if (!coincide) return false;
      }

      return true;
    });
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
      nombre: ea.ejercicio.nombre,
      series: ea.series,
      reps: ea.reps,
      peso: ea.peso,
      descanso: ea.descanso
    }));

    if (this.rutinaEditandoId) {
      // Modo Edición
      const rutinaOriginal = [...this.rutinasPropias, ...this.rutinasDelEntrenador].find(r => r.id === this.rutinaEditandoId);
      if (rutinaOriginal) {
        rutinaOriginal.nombre = this.nuevoNombre.trim();
        rutinaOriginal.dias = diasTexto;
        rutinaOriginal.ejerciciosCount = ejerciciosParaRutina.length;
        rutinaOriginal.ejercicios = ejerciciosParaRutina;
      }
    } else {
      // Modo Crear Nueva
      const nuevaRutinaObj: Rutina = {
        id: 'rp_' + Date.now(),
        nombre: this.nuevoNombre.trim(),
        dias: diasTexto,
        autor: 'Yo',
        tipo: 'PROPIA',
        ejerciciosCount: ejerciciosParaRutina.length,
        expanded: false,
        ejercicios: ejerciciosParaRutina
      };
      this.rutinasPropias.unshift(nuevaRutinaObj);
    }

    this.vista = 'LISTA';
  }

  iniciarEntreno(rutina: Rutina): void {
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
