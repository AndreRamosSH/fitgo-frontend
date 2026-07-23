import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, Entrenador } from '../models/usuario.model';
import { Asistencia } from '../models/asistencia.model';

export interface MemberAsistenciaHoy {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  initials: string;
  asistioHoy: boolean;
  horaIngreso?: string | null;
}

export interface ResumenEntrenador {
  totalMiembros: number;
  asistieronHoyCount: number;
  totalRutinasCreadas: number;
  rutinasAsignadasCount: number;
  miembros: MemberAsistenciaHoy[];
}

export interface MiembroTarjetaDTO {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  initials: string;
  estadoMembresia: string;
  membresiaTexto: string;
  rutinaAsignada: string;
  asistenciasEsteMes: number;
  ultimoPeso: number;
}

export interface MiembrosEntrenadorRespuesta {
  miembros: MiembroTarjetaDTO[];
  totalMiembros: number;
}

export interface MiembroDetalleDTO {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  initials: string;
  planNombre: string;
  estadoMembresia: string;
  venceTexto: string;
  asistenciasEsteMes: number;
  pesoActual: number;
  cambioPeso: number;
  imcActual: number;
  imcClasificacion: string;
  calendarioAsistencia: Array<{ dia: number; asistio: boolean }>;
  entrenosPorSemana: number[];
  metricasFisicas: {
    peso: number;
    cambioPeso: number;
    masaMuscular: number;
    cambioMasaMuscular: number;
    grasaCorporal: number;
    cambioGrasaCorporal: number;
    imc: number;
    imcClasificacion: string;
  };
  rutinaAsignada: {
    id: number | null;
    nombre: string;
    dias: string;
    ejerciciosCount: number;
    estado: string;
  };
}

export interface PerfilEntrenadorRespuesta {
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  turno: string;
  experienciaAnios: number;
  maxMiembros: number;
  totalMiembrosAsignados: number;
}

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/entrenador`;

  getResumen(): Observable<ResumenEntrenador> {
    return this.http.get<ResumenEntrenador>(`${this.apiUrl}/resumen`);
  }

  getMiembros(): Observable<MiembrosEntrenadorRespuesta> {
    return this.http.get<MiembrosEntrenadorRespuesta>(`${this.apiUrl}/miembros`);
  }

  getDetalleMiembro(id: number): Observable<MiembroDetalleDTO> {
    return this.http.get<MiembroDetalleDTO>(`${this.apiUrl}/miembros/${id}/detalle`);
  }

  getHorario(): Observable<Entrenador> {
    return this.http.get<Entrenador>(`${this.apiUrl}/horario`);
  }

  getPerfil(): Observable<PerfilEntrenadorRespuesta> {
    return this.http.get<PerfilEntrenadorRespuesta>(`${this.apiUrl}/perfil`);
  }

  registrarAsistencia(asistencia: { correo: string }): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/asistencia`, asistencia);
  }
}
