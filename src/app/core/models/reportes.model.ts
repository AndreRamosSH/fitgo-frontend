export interface IngresoDia {
  dia: string;
  valor: number;
  destacado: boolean;
}

export interface AsistenciaDiaSemana {
  dia: string;
  valor: number;
  porcentaje: number;
}

export interface FiltroOption {
  valor: string;
  texto: string;
}

export interface AsistenciaReport {
  totalIngresos: number;
  promedioDiario: number;
  diaMasConcurrido: string;
  miembrosAusentes: number;
  ingresosPorDia: IngresoDia[];
  asistenciasPorDiaSemana: AsistenciaDiaSemana[];
  mesesDisponibles: FiltroOption[];
  miembrosDisponibles: FiltroOption[];
}

export interface DistribucionPlan {
  nombre: string;
  miembros: number;
  porcentaje: number;
  color: string;
}

export interface ProximaVencer {
  miembro: string;
  plan: string;
  vence: string;
  dias: string;
  estado: string;
}

export interface MembresiaReport {
  activas: number;
  porVencer: number;
  vencidas: number;
  planMasPopular: string;
  distribucionPlan: DistribucionPlan[];
  proximasVencer: ProximaVencer[];
}

export interface ComparativaEntrenador {
  entrenador: string;
  miembros: number;
  rutinas: number;
  membresiasActivas: string;
  estadoMembresia: string;
  carga: number;
  colorCarga: string;
}

export interface EntrenadorReport {
  totalEntrenadores: number;
  totalRutinasCreadas: number;
  masMiembros: string;
  promedioAlumnos: number;
  comparativaEntrenadores: ComparativaEntrenador[];
}
