import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, Entrenador } from '../models/usuario.model';
import { Asistencia } from '../models/asistencia.model';

export interface ResumenEntrenador {
  miembros: Usuario[];
  totalMiembros: number;
  asistencias: Asistencia[];
}

export interface MiembrosEntrenadorRespuesta {
  miembros: Usuario[];
  totalMiembros: number;
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

  getHorario(): Observable<Entrenador> {
    return this.http.get<Entrenador>(`${this.apiUrl}/horario`);
  }

  getPerfil(): Observable<PerfilEntrenadorRespuesta> {
    return this.http.get<PerfilEntrenadorRespuesta>(`${this.apiUrl}/perfil`);
  }

  registrarAsistencia(asistencia: Asistencia): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/asistencia`, asistencia);
  }
}
