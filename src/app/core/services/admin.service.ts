import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { Plan } from '../models/plan.model';
import { Membresia } from '../models/membresia.model';
import { AsistenciaReport, MembresiaReport, EntrenadorReport } from '../models/reportes.model';

export interface ResumenAdmin {
  totalUsuarios: number;
  miembrosActivos: number;
  totalEntrenadores: number;
  membresiasPorVencer: number;
  asistenciasHoy: number;
}

export interface MiembrosRespuesta {
  miembros: Usuario[];
  resumen: {
    activos: number;
    vencidos: number;
    porVencer: number;
  };
}

export interface MembresiasYPlanesRespuesta {
  planes: Plan[];
  membresias: Membresia[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/admin`;

  getResumen(): Observable<ResumenAdmin> {
    return this.http.get<ResumenAdmin>(`${this.apiUrl}/resumen`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  registrarUsuario(user: Usuario): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/usuarios/registro`, user);
  }

  getMiembros(): Observable<MiembrosRespuesta> {
    return this.http.get<MiembrosRespuesta>(`${this.apiUrl}/miembros`);
  }

  eliminarMiembro(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/miembros/${id}`);
  }

  getEntrenadores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/entrenadores`);
  }

  eliminarEntrenador(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/entrenadores/${id}`);
  }

  getMembresias(): Observable<MembresiasYPlanesRespuesta> {
    return this.http.get<MembresiasYPlanesRespuesta>(`${this.apiUrl}/membresias`);
  }

  crearPlan(plan: Plan): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/membresias/nuevo-plan`, plan);
  }

  getPlan(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/membresias/plan/${id}`);
  }

  actualizarPlan(id: number, plan: Plan): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.apiUrl}/membresias/plan/${id}`, plan);
  }

  eliminarPlan(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/membresias/plan/${id}`);
  }

  getElegiblesMembresia(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/membresias/asignar/elegibles`);
  }

  asignarMembresia(membresia: Membresia): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/membresias/asignar`, membresia);
  }

  getAsistenciasReport(mes?: string, usuarioId?: string): Observable<AsistenciaReport> {
    let params = '';
    const parts = [];
    if (mes) parts.push(`mes=${mes}`);
    if (usuarioId) parts.push(`usuarioId=${usuarioId}`);
    if (parts.length > 0) {
      params = '?' + parts.join('&');
    }
    return this.http.get<AsistenciaReport>(`${this.apiUrl}/reportes/asistencias${params}`);
  }

  getMembresiasReport(): Observable<MembresiaReport> {
    return this.http.get<MembresiaReport>(`${this.apiUrl}/reportes/membresias`);
  }

  getEntrenadoresReport(): Observable<EntrenadorReport> {
    return this.http.get<EntrenadorReport>(`${this.apiUrl}/reportes/entrenadores`);
  }

  getMiembrosActivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/miembros/activos`);
  }

  asignarEntrenador(miembroId: number, entrenadorId: number | null): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/miembros/asignar-entrenador`, { miembroId, entrenadorId });
  }
}
