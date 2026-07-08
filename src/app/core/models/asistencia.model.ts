import { Usuario } from './usuario.model';

export interface Asistencia {
  id?: number;
  usuario?: Usuario;
  correo?: string;
  fecha?: string;
  presente?: boolean;
}
