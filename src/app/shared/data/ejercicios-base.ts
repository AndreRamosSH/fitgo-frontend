export interface EjercicioBase {
  id: string;
  nombre: string;
  musculo: string;
  tipo: string;
  imagen: string;
}

export const EJERCICIOS_BASE: EjercicioBase[] = [
  {
    id: 'bench-press',
    nombre: 'Press de banca (Bench Press)',
    musculo: 'pecho',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/barbell-bench-press.gif'
  },
  {
    id: 'cable-fly',
    nombre: 'Aperturas en polea (Cable Fly)',
    musculo: 'pecho',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-cross-over-variation.gif'
  },
  {
    id: 'push-up',
    nombre: 'Flexiones de pecho (Push Up)',
    musculo: 'pecho',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/push-up.gif'
  },
  {
    id: 'lat-pulldown',
    nombre: 'Jalón al pecho (Lat Pulldown)',
    musculo: 'espalda',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/back/lat-pulldown.gif'
  },
  {
    id: 'barbell-row',
    nombre: 'Remo con barra (Barbell Row)',
    musculo: 'espalda',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/back/barbell-bent-over-row.gif'
  },
  {
    id: 'squat',
    nombre: 'Sentadillas con barra (Squat)',
    musculo: 'piernas',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quadriceps/barbell-squat.gif'
  },
  {
    id: 'leg-press',
    nombre: 'Prensa de piernas (Leg Press)',
    musculo: 'piernas',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quadriceps/leg-press.gif'
  },
  {
    id: 'biceps-curl',
    nombre: 'Curl de bíceps con mancuernas',
    musculo: 'biceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-biceps-curl.gif'
  },
  {
    id: 'triceps-pushdown',
    nombre: 'Extensión de tríceps en polea',
    musculo: 'triceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/triceps-pushdown.gif'
  },
  {
    id: 'shoulder-press',
    nombre: 'Press militar de hombros',
    musculo: 'hombros',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/shoulders/dumbbell-overhead-press.gif'
  }
];

export function obtenerImagenEjercicio(nombre: string): string {
  const ej = EJERCICIOS_BASE.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
  return ej ? ej.imagen : 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-cross-over-variation.gif';
}
