export type Rol = 'ADMIN' | 'ENTRENADOR' | 'MIEMBRO';
export type Turno = 'MANANA' | 'TARDE' | 'NOCHE';

export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: Rol;
  telefono?: string;
  turno?: Turno;
  experienciaAnios?: number;
  password?: string;
  passwordActual?: string;
}

export interface Entrenador {
  id?: number;
  usuario?: Usuario;
  turno: Turno;
  experienciaAnios: number;
  maxMiembros: number;
}
