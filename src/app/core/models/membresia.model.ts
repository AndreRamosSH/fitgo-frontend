import { Usuario } from './usuario.model';
import { Plan } from './plan.model';

export type EstadoMembresia = 'ACTIVA' | 'VENCIDA' | 'PENDIENTE';

export interface Membresia {
  id?: number;
  usuario?: Usuario;
  plan?: Plan;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: EstadoMembresia;
  usuarioId?: number;
  planId?: number;
}
