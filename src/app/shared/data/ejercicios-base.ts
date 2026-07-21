export interface EjercicioBase {
  id: string;
  nombre: string;
  musculo: string; // 'pecho', 'espalda', 'hombros', 'biceps', 'triceps', 'antebrazos', 'cuadriceps', 'femorales', 'gluteos', 'pantorrillas', 'aductores', 'abductores', 'abs'
  tipo: string;    // 'Pesos Libres', 'Poleas', 'Smith', 'Maquina libre', 'Peso Corporal'
  imagen: string;
}

export function obtenerImagenEjercicio(nombre: string): string {
  const ej = EJERCICIOS_BASE.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
  if (ej) return ej.imagen;
  return 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-standing-fly.gif';
}

export const EJERCICIOS_BASE: EjercicioBase[] = [
  // --- PECHO ---
  {
    id: 'pectorals/barbell-bench-press',
    nombre: 'Press de banca con barra (Bench Press)',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/barbell-bench-press.gif'
  },
  {
    id: 'pectorals/barbell-incline-bench-press',
    nombre: 'Press de banca inclinado con barra',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/barbell-incline-bench-press.gif'
  },
  {
    id: 'pectorals/dumbbell-bench-press',
    nombre: 'Press de banca con mancuernas',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-bench-press.gif'
  },
  {
    id: 'pectorals/dumbbell-incline-bench-press',
    nombre: 'Press inclinado con mancuernas',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-incline-bench-press.gif'
  },
  {
    id: 'pectorals/cable-standing-fly',
    nombre: 'Aperturas en polea de pie (Cable Fly)',
    musculo: 'pecho',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-standing-fly.gif'
  },
  {
    id: 'pectorals/lever-seated-fly',
    nombre: 'Contractora / Pec Deck en máquina',
    musculo: 'pecho',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/lever-seated-fly.gif'
  },
  {
    id: 'pectorals/chest-dip',
    nombre: 'Fondos en paralelas para pecho',
    musculo: 'pecho',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/chest-dip.gif'
  },
  {
    id: 'pectorals/dumbbell-fly',
    nombre: 'Aperturas planas con mancuernas',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-fly.gif'
  },
  {
    id: 'pectorals/dumbbell-incline-fly',
    nombre: 'Aperturas inclinadas con mancuernas',
    musculo: 'pecho',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-incline-fly.gif'
  },
  {
    id: 'pectorals/cable-low-fly',
    nombre: 'Aperturas en polea baja',
    musculo: 'pecho',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-low-fly.gif'
  },
  {
    id: 'pectorals/smith-bench-press',
    nombre: 'Press de banca en máquina Smith',
    musculo: 'pecho',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/smith-bench-press.gif'
  },
  {
    id: 'pectorals/smith-incline-bench-press',
    nombre: 'Press inclinado en máquina Smith',
    musculo: 'pecho',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/smith-incline-bench-press.gif'
  },
  {
    id: 'pectorals/lever-chest-press',
    nombre: 'Press de pecho en máquina',
    musculo: 'pecho',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/lever-chest-press.gif'
  },
  {
    id: 'pectorals/push-up',
    nombre: 'Flexiones de pecho (Push-up)',
    musculo: 'pecho',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/push-up.gif'
  },

  // --- ESPALDA ---
  {
    id: 'lats/pull-up',
    nombre: 'Dominadas pronas (Pull-up)',
    musculo: 'espalda',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/pull-up.gif'
  },
  {
    id: 'lats/chin-up',
    nombre: 'Dominadas supinas (Chin-up)',
    musculo: 'espalda',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/chin-up.gif'
  },
  {
    id: 'lats/cable-pulldown',
    nombre: 'Jalón al pecho en polea (Lat Pulldown)',
    musculo: 'espalda',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-pulldown.gif'
  },
  {
    id: 'upper-back/cable-seated-row',
    nombre: 'Remo sentado en polea (Gironda)',
    musculo: 'espalda',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/cable-seated-row.gif'
  },
  {
    id: 'upper-back/barbell-bent-over-row',
    nombre: 'Remo con barra (Bent Over Row)',
    musculo: 'espalda',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/barbell-bent-over-row.gif'
  },
  {
    id: 'upper-back/dumbbell-one-arm-bent-over-row',
    nombre: 'Remo unilateral con mancuerna',
    musculo: 'espalda',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/dumbbell-one-arm-bent-over-row.gif'
  },
  {
    id: 'upper-back/lever-t-bar-row',
    nombre: 'Remo en T en máquina',
    musculo: 'espalda',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/lever-t-bar-row.gif'
  },
  {
    id: 'lats/cable-straight-arm-pulldown',
    nombre: 'Pullover en polea alta con brazos rectos',
    musculo: 'espalda',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-straight-arm-pulldown.gif'
  },
  {
    id: 'upper-back/lever-seated-row',
    nombre: 'Remo en máquina',
    musculo: 'espalda',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/lever-seated-row.gif'
  },
  {
    id: 'lats/assisted-pull-up',
    nombre: 'Dominadas asistidas en máquina',
    musculo: 'espalda',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/assisted-pull-up.gif'
  },
  {
    id: 'upper-back/dumbbell-incline-row',
    nombre: 'Remo apoyado en banco inclinado con mancuernas',
    musculo: 'espalda',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/upper-back/dumbbell-incline-row.gif'
  },
  {
    id: 'traps/barbell-shrug',
    nombre: 'Encogimientos con barra (Trapecios)',
    musculo: 'espalda',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/traps/barbell-shrug.gif'
  },
  {
    id: 'traps/dumbbell-shrug',
    nombre: 'Encogimientos con mancuernas (Trapecios)',
    musculo: 'espalda',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/traps/dumbbell-shrug.gif'
  },
  {
    id: 'spine/hyperextension',
    nombre: 'Hiperextensiones lumbares',
    musculo: 'espalda',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/spine/hyperextension.gif'
  },

  // --- HOMBROS ---
  {
    id: 'delts/dumbbell-seated-shoulder-press',
    nombre: 'Press militar sentado con mancuernas',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-seated-shoulder-press.gif'
  },
  {
    id: 'delts/barbell-seated-overhead-press',
    nombre: 'Press militar con barra',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/barbell-seated-overhead-press.gif'
  },
  {
    id: 'delts/dumbbell-lateral-raise',
    nombre: 'Elevaciones laterales con mancuernas',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-lateral-raise.gif'
  },
  {
    id: 'delts/cable-lateral-raise',
    nombre: 'Elevaciones laterales en polea',
    musculo: 'hombros',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/cable-lateral-raise.gif'
  },
  {
    id: 'delts/dumbbell-reverse-fly',
    nombre: 'Elevaciones posteriores / Pájaros con mancuernas',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-reverse-fly.gif'
  },
  {
    id: 'delts/cable-rear-delt-row-with-rope',
    nombre: 'Face pull en polea con cuerda',
    musculo: 'hombros',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/cable-rear-delt-row-with-rope.gif'
  },
  {
    id: 'delts/dumbbell-arnold-press',
    nombre: 'Press Arnold con mancuernas',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-arnold-press.gif'
  },
  {
    id: 'delts/lever-shoulder-press',
    nombre: 'Press de hombros en máquina',
    musculo: 'hombros',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/lever-shoulder-press.gif'
  },
  {
    id: 'delts/smith-shoulder-press',
    nombre: 'Press militar en máquina Smith',
    musculo: 'hombros',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/smith-shoulder-press.gif'
  },
  {
    id: 'delts/lever-seated-reverse-fly',
    nombre: 'Deltoides posterior en máquina (Pec Deck invertido)',
    musculo: 'hombros',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/lever-seated-reverse-fly.gif'
  },
  {
    id: 'delts/dumbbell-front-raise',
    nombre: 'Elevaciones frontales con mancuernas',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-front-raise.gif'
  },
  {
    id: 'delts/barbell-upright-row',
    nombre: 'Remo al mentón con barra',
    musculo: 'hombros',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/barbell-upright-row.gif'
  },

  // --- BÍCEPS ---
  {
    id: 'biceps/barbell-curl',
    nombre: 'Curl de bíceps con barra recta',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-curl.gif'
  },
  {
    id: 'biceps/ez-barbell-curl',
    nombre: 'Curl de bíceps con barra Z',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/ez-barbell-curl.gif'
  },
  {
    id: 'biceps/dumbbell-alternate-biceps-curl',
    nombre: 'Curl alterno con mancuernas',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-alternate-biceps-curl.gif'
  },
  {
    id: 'biceps/dumbbell-hammer-curl',
    nombre: 'Curl martillo con mancuernas',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-hammer-curl.gif'
  },
  {
    id: 'biceps/dumbbell-incline-biceps-curl',
    nombre: 'Curl inclinado con mancuernas',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-incline-biceps-curl.gif'
  },
  {
    id: 'biceps/cable-curl',
    nombre: 'Curl de bíceps en polea',
    musculo: 'biceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/cable-curl.gif'
  },
  {
    id: 'biceps/ez-barbell-close-grip-preacher-curl',
    nombre: 'Curl predicador con barra Z (Banco Scott)',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/ez-barbell-close-grip-preacher-curl.gif'
  },
  {
    id: 'biceps/dumbbell-concentration-curl',
    nombre: 'Curl concentrado con mancuerna',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-concentration-curl.gif'
  },
  {
    id: 'biceps/cable-hammer-curl-with-rope',
    nombre: 'Curl martillo en polea con cuerda',
    musculo: 'biceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/cable-hammer-curl-with-rope.gif'
  },
  {
    id: 'biceps/lever-preacher-curl',
    nombre: 'Curl predicador de bíceps en máquina',
    musculo: 'biceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/lever-preacher-curl.gif'
  },
  {
    id: 'biceps/ez-barbell-spider-curl',
    nombre: 'Curl araña con barra Z',
    musculo: 'biceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/ez-barbell-spider-curl.gif'
  },

  // --- TRÍCEPS ---
  {
    id: 'triceps/cable-pushdown-with-rope-attachment',
    nombre: 'Extensión de tríceps en polea con cuerda',
    musculo: 'triceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-pushdown-with-rope-attachment.gif'
  },
  {
    id: 'triceps/cable-triceps-pushdown-v-bar',
    nombre: 'Jalón de tríceps en polea con barra V',
    musculo: 'triceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-triceps-pushdown-v-bar.gif'
  },
  {
    id: 'triceps/barbell-lying-triceps-extension-skull-crusher',
    nombre: 'Press francés con barra Z (Skullcrusher)',
    musculo: 'triceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/barbell-lying-triceps-extension-skull-crusher.gif'
  },
  {
    id: 'triceps/cable-overhead-triceps-extension-rope-attachment',
    nombre: 'Extensión tras nuca en polea con cuerda',
    musculo: 'triceps',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-overhead-triceps-extension-rope-attachment.gif'
  },
  {
    id: 'triceps/dumbbell-seated-triceps-extension',
    nombre: 'Copa a dos manos con mancuerna (Tras nuca)',
    musculo: 'triceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/dumbbell-seated-triceps-extension.gif'
  },
  {
    id: 'triceps/triceps-dip',
    nombre: 'Fondos para tríceps en paralelas',
    musculo: 'triceps',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/triceps-dip.gif'
  },
  {
    id: 'triceps/barbell-close-grip-bench-press',
    nombre: 'Press de banca agarre cerrado',
    musculo: 'triceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/barbell-close-grip-bench-press.gif'
  },
  {
    id: 'triceps/bench-dip-knees-bent',
    nombre: 'Fondos entre bancos para tríceps',
    musculo: 'triceps',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/bench-dip-knees-bent.gif'
  },
  {
    id: 'triceps/dumbbell-kickback',
    nombre: 'Patada de tríceps con mancuerna',
    musculo: 'triceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/dumbbell-kickback.gif'
  },
  {
    id: 'triceps/lever-seated-dip',
    nombre: 'Fondos de tríceps en máquina',
    musculo: 'triceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/lever-seated-dip.gif'
  },

  // --- ANTEBRAZOS ---
  {
    id: 'forearms/barbell-palms-up-wrist-curl-over-a-bench',
    nombre: 'Curl de muñeca con barra sobre banco',
    musculo: 'antebrazos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/forearms/barbell-palms-up-wrist-curl-over-a-bench.gif'
  },
  {
    id: 'forearms/barbell-reverse-wrist-curl',
    nombre: 'Curl de muñeca invertido con barra',
    musculo: 'antebrazos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/forearms/barbell-reverse-wrist-curl.gif'
  },
  {
    id: 'forearms/dumbbell-one-arm-wrist-curl',
    nombre: 'Curl de muñeca unilateral con mancuerna',
    musculo: 'antebrazos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/forearms/dumbbell-one-arm-wrist-curl.gif'
  },

  // --- CUÁDRICEPS ---
  {
    id: 'glutes/barbell-full-squat',
    nombre: 'Sentadilla trasera con barra (Back Squat)',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-full-squat.gif'
  },
  {
    id: 'glutes/sled-45-leg-press',
    nombre: 'Prensa de piernas 45°',
    musculo: 'cuadriceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/sled-45-leg-press.gif'
  },
  {
    id: 'quads/lever-leg-extension',
    nombre: 'Extensiones de cuádriceps en máquina',
    musculo: 'cuadriceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/lever-leg-extension.gif'
  },
  {
    id: 'quads/dumbbell-single-leg-split-squat',
    nombre: 'Sentadilla búlgara con mancuernas',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/dumbbell-single-leg-split-squat.gif'
  },
  {
    id: 'glutes/barbell-front-squat',
    nombre: 'Sentadilla frontal con barra (Front Squat)',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-front-squat.gif'
  },
  {
    id: 'glutes/sled-hack-squat',
    nombre: 'Sentadilla Hack en máquina',
    musculo: 'cuadriceps',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/sled-hack-squat.gif'
  },
  {
    id: 'glutes/smith-squat',
    nombre: 'Sentadilla en máquina Smith',
    musculo: 'cuadriceps',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/smith-squat.gif'
  },
  {
    id: 'quads/dumbbell-goblet-squat',
    nombre: 'Sentadilla Goblet con mancuerna',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/dumbbell-goblet-squat.gif'
  },
  {
    id: 'glutes/dumbbell-lunge',
    nombre: 'Zancadas / Desplantes con mancuernas',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/dumbbell-lunge.gif'
  },
  {
    id: 'glutes/dumbbell-step-up',
    nombre: 'Subidas al banco con mancuernas (Step-up)',
    musculo: 'cuadriceps',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/dumbbell-step-up.gif'
  },

  // --- FEMORALES ---
  {
    id: 'hamstrings/lever-lying-leg-curl',
    nombre: 'Curl femoral tumbado en máquina',
    musculo: 'femorales',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/lever-lying-leg-curl.gif'
  },
  {
    id: 'hamstrings/lever-seated-leg-curl',
    nombre: 'Curl femoral sentado en máquina',
    musculo: 'femorales',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/lever-seated-leg-curl.gif'
  },
  {
    id: 'glutes/barbell-romanian-deadlift',
    nombre: 'Peso muerto rumano con barra (RDL)',
    musculo: 'femorales',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-romanian-deadlift.gif'
  },
  {
    id: 'glutes/dumbbell-romanian-deadlift',
    nombre: 'Peso muerto rumano con mancuernas',
    musculo: 'femorales',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/dumbbell-romanian-deadlift.gif'
  },
  {
    id: 'hamstrings/barbell-straight-leg-deadlift',
    nombre: 'Peso muerto piernas rígidas',
    musculo: 'femorales',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/barbell-straight-leg-deadlift.gif'
  },
  {
    id: 'hamstrings/glute-ham-raise',
    nombre: 'Glute Ham Raise (GHR)',
    musculo: 'femorales',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/glute-ham-raise.gif'
  },
  {
    id: 'hamstrings/lever-kneeling-leg-curl',
    nombre: 'Curl femoral unilateral de pie en máquina',
    musculo: 'femorales',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/lever-kneeling-leg-curl.gif'
  },

  // --- GLÚTEOS ---
  {
    id: 'glutes/barbell-glute-bridge',
    nombre: 'Hip Thrust con barra',
    musculo: 'gluteos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-glute-bridge.gif'
  },
  {
    id: 'glutes/barbell-deadlift',
    nombre: 'Peso muerto convencional con barra',
    musculo: 'gluteos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-deadlift.gif'
  },
  {
    id: 'glutes/cable-standing-hip-extension',
    nombre: 'Patada de glúteo en polea baja',
    musculo: 'gluteos',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/cable-standing-hip-extension.gif'
  },
  {
    id: 'glutes/barbell-sumo-deadlift',
    nombre: 'Peso muerto sumo con barra',
    musculo: 'gluteos',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/barbell-sumo-deadlift.gif'
  },
  {
    id: 'glutes/smith-deadlift',
    nombre: 'Hip Thrust / Peso muerto en máquina Smith',
    musculo: 'gluteos',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/smith-deadlift.gif'
  },
  {
    id: 'glutes/low-glute-bridge-on-floor',
    nombre: 'Puente de glúteo en suelo',
    musculo: 'gluteos',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/low-glute-bridge-on-floor.gif'
  },
  {
    id: 'glutes/cable-pull-through-with-rope',
    nombre: 'Pull through en polea con cuerda',
    musculo: 'gluteos',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/cable-pull-through-with-rope.gif'
  },

  // --- PANTORRILLAS ---
  {
    id: 'calves/lever-standing-calf-raise',
    nombre: 'Elevación de talones de pie en máquina',
    musculo: 'pantorrillas',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/lever-standing-calf-raise.gif'
  },
  {
    id: 'calves/lever-seated-calf-raise',
    nombre: 'Elevación de talones sentado en máquina',
    musculo: 'pantorrillas',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/lever-seated-calf-raise.gif'
  },
  {
    id: 'calves/sled-calf-press-on-leg-press',
    nombre: 'Elevación de pantorrillas en prensa',
    musculo: 'pantorrillas',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/sled-calf-press-on-leg-press.gif'
  },
  {
    id: 'calves/dumbbell-single-leg-calf-raise',
    nombre: 'Elevación de pantorrilla unilateral con mancuerna',
    musculo: 'pantorrillas',
    tipo: 'Pesos Libres',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/dumbbell-single-leg-calf-raise.gif'
  },
  {
    id: 'calves/smith-standing-leg-calf-raise',
    nombre: 'Elevación de pantorrillas en máquina Smith',
    musculo: 'pantorrillas',
    tipo: 'Smith',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/smith-standing-leg-calf-raise.gif'
  },
  {
    id: 'calves/donkey-calf-raise',
    nombre: 'Elevación de pantorrilla burro',
    musculo: 'pantorrillas',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/donkey-calf-raise.gif'
  },

  // --- ADUCTORES Y ABDUCTORES ---
  {
    id: 'abductors/lever-seated-hip-abduction',
    nombre: 'Abducción de cadera en máquina (Abductores)',
    musculo: 'abductores',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abductors/lever-seated-hip-abduction.gif'
  },
  {
    id: 'adductors/lever-seated-hip-adduction',
    nombre: 'Aducción de cadera en máquina (Aductores)',
    musculo: 'aductores',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/adductors/lever-seated-hip-adduction.gif'
  },
  {
    id: 'adductors/cable-hip-adduction',
    nombre: 'Aducción de cadera en polea',
    musculo: 'aductores',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/adductors/cable-hip-adduction.gif'
  },

  // --- CORE (ABDOMINALES) ---
  {
    id: 'abs/hanging-leg-raise',
    nombre: 'Elevación de piernas colgado',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/hanging-leg-raise.gif'
  },
  {
    id: 'abs/cable-kneeling-crunch',
    nombre: 'Crunch en polea alta con cuerda',
    musculo: 'abs',
    tipo: 'Poleas',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/cable-kneeling-crunch.gif'
  },
  {
    id: 'abs/captains-chair-straight-leg-raise',
    nombre: 'Elevación de rodillas en silla romana',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/captains-chair-straight-leg-raise.gif'
  },
  {
    id: 'abs/wheel-rollerout',
    nombre: 'Rueda abdominal (Ab Wheel)',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/wheel-rollerout.gif'
  },
  {
    id: 'abs/crunch-floor',
    nombre: 'Crunch abdominal tradicional en suelo',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/crunch-floor.gif'
  },
  {
    id: 'abs/weighted-front-plank',
    nombre: 'Plancha abdominal (Plank)',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/weighted-front-plank.gif'
  },
  {
    id: 'abs/russian-twist',
    nombre: 'Giros rusos (Russian Twist)',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/russian-twist.gif'
  },
  {
    id: 'abs/decline-sit-up',
    nombre: 'Crunches en banco reclinado',
    musculo: 'abs',
    tipo: 'Peso Corporal',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/decline-sit-up.gif'
  },
  {
    id: 'abs/lever-seated-crunch',
    nombre: 'Crunch abdominal en máquina',
    musculo: 'abs',
    tipo: 'Maquina libre',
    imagen: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/lever-seated-crunch.gif'
  }
];
