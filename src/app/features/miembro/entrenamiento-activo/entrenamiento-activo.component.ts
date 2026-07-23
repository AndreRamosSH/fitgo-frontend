import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmService } from '../../../core/services/confirm.service';
import { EJERCICIOS_BASE, obtenerImagenEjercicio } from '../../../shared/data/ejercicios-base';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';
import { RutinaService } from '../../../core/services/rutina.service';

interface SerieEntreno {
  numero: number;
  reps: number;
  peso: number;
  completada: boolean;
}

interface EjercicioEntreno {
  nombre: string;
  imagen: string;
  series: SerieEntreno[];
  descanso: number;
  completado: boolean;
}

@Component({
  selector: 'app-entrenamiento-activo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, SharedLucideIconsModule],
  templateUrl: './entrenamiento-activo.component.html',
  styleUrl: './entrenamiento-activo.component.scss'
})
export class EntrenamientoActivoComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private confirmService = inject(ConfirmService);
  private rutinaService = inject(RutinaService);

  rutinaActiva: any = null;
  get rutinaNombre(): string {
    return this.rutinaActiva?.nombre || 'Rutina Activa';
  }
  ejercicioActivoIndex = 0;
  serieActivaIndex = 0;
  tiempoSegundos = 0;
  cronometroInterval: any = null;
  entrenoCompletado = false;
  datosEntreno: EjercicioEntreno[] = [];

  // Propiedades para el control de descanso
  mostrarDescanso = false;
  tiempoDescansoRestante = 0;
  descansoInterval: any = null;

  ngOnInit(): void {
    const localSession = localStorage.getItem('active_workout_session');
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession);
        this.rutinaActiva = parsed.rutinaActiva;
        this.ejercicioActivoIndex = parsed.ejercicioActivoIndex;
        this.serieActivaIndex = parsed.serieActivaIndex;
        this.tiempoSegundos = parsed.tiempoSegundos;
        this.datosEntreno = parsed.datosEntreno;

        this.iniciarCronometro();
        return;
      } catch (e) {
        console.error('Error al restaurar sesión activa:', e);
        localStorage.removeItem('active_workout_session');
      }
    }

    const state = history.state;
    if (state && state.rutina) {
      this.rutinaActiva = state.rutina;
      this.cargarDatosEntreno(state.rutina);
    } else {
      // Rutina por defecto si se accede directamente a la URL
      const rutinaDemo = {
        id: 'demo',
        nombre: 'Rutina Hipertrofia Pecho y Tríceps',
        ejercicios: [
          { nombre: 'Press de banca (Bench Press)', series: 4, reps: 10, peso: '60kg', descanso: 90 },
          { nombre: 'Aperturas en polea (Cable Fly)', series: 3, reps: 12, peso: '15kg', descanso: 60 },
          { nombre: 'Flexiones de pecho (Push Up)', series: 3, reps: 15, peso: 'Corporal', descanso: 45 },
          { nombre: 'Extensión de tríceps en polea', series: 4, reps: 12, peso: '20kg', descanso: 60 }
        ]
      };
      this.rutinaActiva = rutinaDemo;
      this.cargarDatosEntreno(rutinaDemo);
    }

    this.iniciarCronometro();
    this.guardarSesionLocal();
  }

  ngOnDestroy(): void {
    this.detenerCronometro();
    this.detenerDescanso();
  }

  cargarDatosEntreno(rutina: any): void {
    this.ejercicioActivoIndex = 0;
    this.serieActivaIndex = 0;
    this.tiempoSegundos = 0;
    this.entrenoCompletado = false;

    // Estructurar los datos de entrenamiento exactamente con la lógica original y GIFs de la base de datos
    this.datosEntreno = (rutina.ejercicios || []).map((e: any) => {
      const ejBase = EJERCICIOS_BASE.find(eb => eb.nombre === e.nombre);
      const imagen = ejBase ? ejBase.imagen : obtenerImagenEjercicio(e.nombre);

      const seriesList: SerieEntreno[] = [];
      const seriesCount = e.series || 3;
      for (let i = 0; i < seriesCount; i++) {
        let pesoNum = parseFloat(e.peso ? e.peso.toString().replace('kg', '').trim() : '0');
        if (isNaN(pesoNum)) pesoNum = 0;

        seriesList.push({
          numero: i + 1,
          reps: e.reps || 12,
          peso: pesoNum,
          completada: false
        });
      }

      return {
        nombre: e.nombre,
        imagen: imagen,
        series: seriesList,
        descanso: e.descanso || 60,
        completado: false
      };
    });
  }

  iniciarCronometro(): void {
    this.detenerCronometro();
    this.cronometroInterval = setInterval(() => {
      this.tiempoSegundos++;
      if (this.tiempoSegundos % 5 === 0) {
        this.guardarSesionLocal();
      }
    }, 1000);
  }

  guardarSesionLocal(): void {
    const sessionData = {
      rutinaActiva: this.rutinaActiva,
      ejercicioActivoIndex: this.ejercicioActivoIndex,
      serieActivaIndex: this.serieActivaIndex,
      tiempoSegundos: this.tiempoSegundos,
      datosEntreno: this.datosEntreno
    };
    localStorage.setItem('active_workout_session', JSON.stringify(sessionData));
  }

  detenerCronometro(): void {
    if (this.cronometroInterval) {
      clearInterval(this.cronometroInterval);
      this.cronometroInterval = null;
    }
  }

  getTiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoSegundos / 60);
    const segundos = this.tiempoSegundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  getProgresoEntreno(): number {
    if (!this.datosEntreno || this.datosEntreno.length === 0) return 0;
    const completados = this.datosEntreno.filter((e: any) => e.completado).length;
    return Math.round((completados / this.datosEntreno.length) * 100);
  }

  completarSerie(): void {
    if (!this.datosEntreno || this.datosEntreno.length === 0) return;

    const ejercicioActual = this.datosEntreno[this.ejercicioActivoIndex];
    const series = ejercicioActual.series;

    // Marcar la serie actual como completada
    series[this.serieActivaIndex].completada = true;

    let finRutina = false;
    const descansoSegundos = ejercicioActual.descanso || 60;

    // Verificar si quedan más series en este ejercicio
    if (this.serieActivaIndex < series.length - 1) {
      this.serieActivaIndex++;
    } else {
      // Ejercicio completado
      ejercicioActual.completado = true;

      // Verificar si hay más ejercicios
      if (this.ejercicioActivoIndex < this.datosEntreno.length - 1) {
        this.ejercicioActivoIndex++;
        this.serieActivaIndex = 0;
      } else {
        // Rutina completada
        finRutina = true;
        this.detenerCronometro();
        this.entrenoCompletado = true;
        this.registrarEntrenamientoFinal();
      }
    }

    this.guardarSesionLocal();

    if (!finRutina) {
      this.iniciarDescanso(descansoSegundos);
    }
  }

  // Métodos de control del descanso
  iniciarDescanso(segundos: number): void {
    this.detenerDescanso();
    this.tiempoDescansoRestante = segundos;
    this.mostrarDescanso = true;

    this.descansoInterval = setInterval(() => {
      if (this.tiempoDescansoRestante > 0) {
        this.tiempoDescansoRestante--;
      } else {
        this.detenerDescanso();
      }
    }, 1000);
  }

  agregar15Segundos(): void {
    this.tiempoDescansoRestante += 15;
  }

  omitirDescanso(): void {
    this.detenerDescanso();
  }

  detenerDescanso(): void {
    if (this.descansoInterval) {
      clearInterval(this.descansoInterval);
      this.descansoInterval = null;
    }
    this.mostrarDescanso = false;
    this.tiempoDescansoRestante = 0;
  }

  getTiempoDescansoFormateado(): string {
    const minutos = Math.floor(this.tiempoDescansoRestante / 60);
    const segundos = this.tiempoDescansoRestante % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  retrocederSerie(): void {
    if (!this.datosEntreno || this.datosEntreno.length === 0) return;

    // Si ya estamos en la primera serie del primer ejercicio, no hacemos nada
    if (this.ejercicioActivoIndex === 0 && this.serieActivaIndex === 0) return;

    // Si estamos en medio del ejercicio, retrocedemos la serie
    if (this.serieActivaIndex > 0) {
      this.serieActivaIndex--;
      this.datosEntreno[this.ejercicioActivoIndex].series[this.serieActivaIndex].completada = false;
    } else {
      // Si estamos en la primera serie de un ejercicio (que no sea el primero),
      // retrocedemos al ejercicio anterior y a su última serie.
      this.ejercicioActivoIndex--;
      const ejercicioAnterior = this.datosEntreno[this.ejercicioActivoIndex];
      ejercicioAnterior.completado = false;
      this.serieActivaIndex = ejercicioAnterior.series.length - 1;
      ejercicioAnterior.series[this.serieActivaIndex].completada = false;
    }
    this.guardarSesionLocal();
  }

  pararEntreno(): void {
    this.confirmService.confirmar({
      titulo: 'Terminar Entrenamiento',
      mensaje: '¿De verdad quieres terminar la rutina? Tu progreso actual no se guardará.',
      textoConfirmar: 'Terminar',
      textoCancelar: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.detenerCronometro();
        localStorage.removeItem('active_workout_session');
        this.router.navigate(['/miembro/rutinas']);
      }
    });
  }

  registrarEntrenamientoFinal(): void {
    const totalSeries = this.getSeriesTotales();
    const ejerciciosCount = this.datosEntreno.length;
    let volumenTotal = 0;

    const detallesPayload: any[] = [];
    this.datosEntreno.forEach(ej => {
      const ejBase = EJERCICIOS_BASE.find(eb => eb.nombre === ej.nombre);
      const ejercicioId = ejBase ? ejBase.id : 'custom';

      ej.series.forEach(s => {
        volumenTotal += s.reps * s.peso;
        detallesPayload.push({
          ejercicioId: ejercicioId,
          ejercicioNombre: ej.nombre,
          serieNumero: s.numero,
          reps: s.reps,
          peso: s.peso
        });
      });
    });

    const payload = {
      rutinaId: this.rutinaActiva?.id || null,
      rutinaNombre: this.rutinaNombre,
      duracionSegundos: this.tiempoSegundos,
      ejerciciosCompletados: ejerciciosCount,
      totalSeriesCompletadas: totalSeries,
      volumenTotalKg: volumenTotal,
      detalles: detallesPayload
    };

    this.rutinaService.registrarEntrenamiento(payload).subscribe({
      next: (res) => {
        console.log('Entrenamiento registrado exitosamente:', res);
        localStorage.removeItem('active_workout_session');
      },
      error: (err) => {
        console.error('Error al registrar entrenamiento:', err);
        localStorage.removeItem('active_workout_session');
      }
    });
  }

  finalizarEntrenoExito(): void {
    this.detenerCronometro();
    this.router.navigate(['/miembro/rutinas']);
    this.entrenoCompletado = false;
  }

  getFechaHoy(): string {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = meses[hoy.getMonth()];
    return `Hoy ${dia} de ${mes}`;
  }

  getSeriesTotales(): number {
    return this.datosEntreno.reduce((total, ej) => total + ej.series.length, 0);
  }

  obtenerRepsResumen(ej: EjercicioEntreno): string {
    if (!ej.series || ej.series.length === 0) return '0';
    const reps = ej.series.map(s => s.reps);
    const min = Math.min(...reps);
    const max = Math.max(...reps);
    return min === max ? `${min}` : `${min}-${max}`;
  }

  obtenerPesoResumen(ej: EjercicioEntreno): string {
    if (!ej.series || ej.series.length === 0) return 'Corporal';
    const pesos = ej.series.map(s => s.peso);
    const min = Math.min(...pesos);
    const max = Math.max(...pesos);
    if (max === 0) return 'Corporal';
    return min === max ? `${min} kg` : `${min}-${max} kg`;
  }

  verProgreso(): void {
    this.detenerCronometro();
    this.router.navigate(['/miembro/progreso']);
  }

  volverAlInicio(): void {
    this.detenerCronometro();
    this.router.navigate(['/miembro/rutinas']);
  }
}
