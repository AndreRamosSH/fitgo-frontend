import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Ejercicio {
  id: string;
  nombre: string;
  musculo: string; // biceps, triceps, pecho, etc.
  tipo: string; // Poleas, Smith, Maquina libre, Peso Corporal
  imagen: string; // URL de la imagen en CDN
}

interface EjercicioAgregado {
  ejercicio: Ejercicio;
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
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent implements OnInit {
  vista: 'LISTA' | 'CREAR' = 'LISTA';

  // Rutinas en memoria
  rutinasDelEntrenador: Rutina[] = [];
  rutinasPropias: Rutina[] = [];

  // Formulario de Nueva Rutina
  nuevoNombre = '';
  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  nuevosDias: string[] = [];
  ejerciciosAgregados: EjercicioAgregado[] = [];

  // Buscador de Ejercicios (Estático / API Mock)
  filtroNombre = '';
  ejerciciosBase: Ejercicio[] = [
    {
      id: 'bench-press',
      nombre: 'Press de banca (Bench Press)',
      musculo: 'pecho',
      tipo: 'Maquina libre',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/barbell-bench-press.thumb.webp'
    },
    {
      id: 'cable-fly',
      nombre: 'Aperturas en polea (Cable Fly)',
      musculo: 'pecho',
      tipo: 'Poleas',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-cross-over-variation.thumb.webp'
    },
    {
      id: 'push-up',
      nombre: 'Flexiones de pecho (Push Up)',
      musculo: 'pecho',
      tipo: 'Peso Corporal',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/push-up.thumb.webp'
    },
    {
      id: 'dumbbell-curl',
      nombre: 'Curl de bíceps con mancuernas',
      musculo: 'biceps',
      tipo: 'Maquina libre',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-alternate-biceps-curl.thumb.webp'
    },
    {
      id: 'squat',
      nombre: 'Sentadilla libre con barra',
      musculo: 'cuadriceps',
      tipo: 'Maquina libre',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/barbell-squat.thumb.webp'
    },
    {
      id: 'leg-press',
      nombre: 'Prensa de piernas (Leg Press)',
      musculo: 'cuadriceps',
      tipo: 'Maquina libre',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/leg-press.thumb.webp'
    },
    {
      id: 'triceps-pushdown',
      nombre: 'Tríceps en polea alta',
      musculo: 'triceps',
      tipo: 'Poleas',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-pushdown.thumb.webp'
    },
    {
      id: 'pull-up',
      nombre: 'Dominadas libres (Pull Up)',
      musculo: 'espalda',
      tipo: 'Peso Corporal',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/pull-up.thumb.webp'
    },
    {
      id: 'smith-squat',
      nombre: 'Sentadillas en máquina Smith',
      musculo: 'cuadriceps',
      tipo: 'Smith',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/smith-squad.thumb.webp'
    },
    {
      id: 'calf-raise',
      nombre: 'Elevación de pantorrillas',
      musculo: 'pantorrillas',
      tipo: 'Peso Corporal',
      imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/standing-calf-raise.thumb.webp'
    }
  ];

  // Modales de Filtro y sus variables
  mostrarModalMusculo = false;
  mostrarModalTipo = false;

  filtroTrenSuperior = false;
  filtroTrenInferior = false;
  subMusculos: { [key: string]: boolean } = {
    biceps: false, triceps: false, antebrazos: false, hombros: false, pecho: false, espalda: false,
    cuadriceps: false, femorales: false, gluteos: false, pantorrillas: false, aductores: false, abductores: false
  };

  tiposSeleccionados: { [key: string]: boolean } = {
    'Poleas': false,
    'Smith': false,
    'Maquina libre': false,
    'Peso Corporal': false
  };

  // Modal de Edición de Ejercicio Agregado
  mostrarModalEditar = false;
  ejercicioEnEdicionIndex: number | null = null;
  edicionSeries = 4;
  edicionReps = 12;
  edicionPeso = '20';
  edicionDescanso = 60;

  ngOnInit(): void {
    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.rutinasDelEntrenador = [
      {
        id: '1',
        nombre: 'Rutina Piernas — Carlos Ríos',
        dias: 'Lun · Mié · Vie',
        autor: 'Carlos Ríos',
        tipo: 'ASIGNADA',
        ejerciciosCount: 4,
        expanded: true,
        ejercicios: [
          { nombre: 'Sentadilla', series: 4, reps: 12, peso: '60kg', descanso: 60 },
          { nombre: 'Prensa de piernas', series: 3, reps: 15, peso: '80kg', descanso: 45 },
          { nombre: 'Extensión cuádriceps', series: 3, reps: 12, peso: '40kg', descanso: 60 },
          { nombre: 'Curl femoral', series: 3, reps: 12, peso: '35kg', descanso: 60 }
        ]
      }
    ];

    this.rutinasPropias = [
      {
        id: '2',
        nombre: 'Cardio mañanero',
        dias: 'Mar · Jue',
        autor: 'Propia',
        tipo: 'PROPIA',
        ejerciciosCount: 3,
        expanded: false,
        ejercicios: [
          { nombre: 'Cinta de correr', series: 1, reps: 20, peso: '--', descanso: 0 },
          { nombre: 'Elíptica', series: 1, reps: 15, peso: '--', descanso: 0 },
          { nombre: 'Remo', series: 3, reps: 10, peso: '20kg', descanso: 45 }
        ]
      }
    ];
  }

  toggleRutina(rutina: Rutina): void {
    rutina.expanded = !rutina.expanded;
  }

  // --- LÓGICA DE CREACIÓN ---
  irACrear(): void {
    this.vista = 'CREAR';
    this.nuevoNombre = '';
    this.nuevosDias = [];
    this.ejerciciosAgregados = [];
    this.filtroNombre = '';
    this.limpiarFiltros();
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

  // Filtros de búsqueda
  limpiarFiltros(): void {
    this.filtroTrenSuperior = false;
    this.filtroTrenInferior = false;
    Object.keys(this.subMusculos).forEach(k => this.subMusculos[k] = false);
    Object.keys(this.tiposSeleccionados).forEach(k => this.tiposSeleccionados[k] = false);
  }

  get ejerciciosFiltrados(): Ejercicio[] {
    let result = this.ejerciciosBase;

    // Filtro por nombre o músculo ingresado en la caja
    if (this.filtroNombre.trim()) {
      const query = this.filtroNombre.toLowerCase();
      result = result.filter(ex => 
        ex.nombre.toLowerCase().includes(query) || 
        ex.musculo.toLowerCase().includes(query)
      );
    }

    // Filtro por Musculos seleccionados en el modal
    const musculosActivos = Object.keys(this.subMusculos).filter(k => {
      // Solo filtrar por submusculos si el tren padre está activo
      const esSuperior = ['biceps', 'triceps', 'antebrazos', 'hombros', 'pecho', 'espalda'].includes(k);
      const esInferior = ['cuadriceps', 'femorales', 'gluteos', 'pantorrillas', 'aductores', 'abductores'].includes(k);
      if (esSuperior && !this.filtroTrenSuperior) return false;
      if (esInferior && !this.filtroTrenInferior) return false;
      return this.subMusculos[k];
    });

    if (musculosActivos.length > 0) {
      result = result.filter(ex => musculosActivos.includes(ex.musculo));
    }

    // Filtro por Tipos seleccionados en el modal
    const tiposActivos = Object.keys(this.tiposSeleccionados).filter(k => this.tiposSeleccionados[k]);
    if (tiposActivos.length > 0) {
      result = result.filter(ex => tiposActivos.includes(ex.tipo));
    }

    // Limitar al máximo 4 de ejemplo para no romper la pantalla, como solicitó el usuario
    return result.slice(0, 4);
  }

  // Ejercicios agregados
  agregarEjercicio(ej: Ejercicio): void {
    // Si ya está agregado, podemos agregarlo nuevamente para poder configurar otro set
    this.ejerciciosAgregados.push({
      ejercicio: ej,
      series: 4,
      reps: 12,
      peso: '20kg',
      descanso: 60
    });
  }

  eliminarEjercicio(idx: number): void {
    this.ejerciciosAgregados.splice(idx, 1);
  }

  // Edición del ejercicio agregado
  abrirEdicion(index: number): void {
    this.ejercicioEnEdicionIndex = index;
    const ejAg = this.ejerciciosAgregados[index];
    this.edicionSeries = ejAg.series;
    this.edicionReps = ejAg.reps;
    
    // Quitar "kg" del peso para editar solo el número
    this.edicionPeso = ejAg.peso.replace('kg', '').replace(' ', '');
    this.edicionDescanso = ejAg.descanso;
    this.mostrarModalEditar = true;
  }

  guardarEdicion(): void {
    if (this.ejercicioEnEdicionIndex !== null) {
      const ejAg = this.ejerciciosAgregados[this.ejercicioEnEdicionIndex];
      ejAg.series = this.edicionSeries;
      ejAg.reps = this.edicionReps;
      
      // Agregar "kg" si el peso es numérico o dejarlo como "Peso cuerpo" si es 0
      const pesoNum = parseFloat(this.edicionPeso);
      if (isNaN(pesoNum) || pesoNum === 0) {
        ejAg.peso = 'Peso cuerpo';
      } else {
        ejAg.peso = `${pesoNum}kg`;
      }
      ejAg.descanso = this.edicionDescanso;
    }
    this.mostrarModalEditar = false;
    this.ejercicioEnEdicionIndex = null;
  }

  guardarRutina(): void {
    if (!this.nuevoNombre.trim()) {
      alert('Por favor, ingresa un nombre para la rutina');
      return;
    }

    if (this.nuevosDias.length === 0) {
      alert('Por favor, selecciona al menos un día de la semana');
      return;
    }

    if (this.ejerciciosAgregados.length === 0) {
      alert('Por favor, agrega al menos un ejercicio a la rutina');
      return;
    }

    // Ordenar los días seleccionados según la semana para que se vea ordenado (Lun -> Dom)
    const ordenSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const diasOrdenados = [...this.nuevosDias].sort((a, b) => ordenSemana.indexOf(a) - ordenSemana.indexOf(b));

    const nuevaRutina: Rutina = {
      id: Date.now().toString(),
      nombre: this.nuevoNombre,
      dias: diasOrdenados.join(' · '),
      autor: 'Propia',
      tipo: 'PROPIA',
      ejerciciosCount: this.ejerciciosAgregados.length,
      expanded: false,
      ejercicios: this.ejerciciosAgregados.map(ea => ({
        nombre: ea.ejercicio.nombre,
        series: ea.series,
        reps: ea.reps,
        peso: ea.peso,
        descanso: ea.descanso
      }))
    };

    // Añadir a las rutinas propias
    this.rutinasPropias.push(nuevaRutina);

    // Redirigir a lista
    this.vista = 'LISTA';
  }
}
