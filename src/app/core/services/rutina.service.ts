import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RutinaEjercicioPayload {
  ejercicioId: string;
  nombre: string;
  series: number;
  reps: number;
  peso: string;
  descanso: number;
}

export interface RutinaPayload {
  nombre: string;
  dias: string;
  ejercicios: RutinaEjercicioPayload[];
}

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private http = inject(HttpClient);
  private rutinasApiUrl = `${environment.apiUrl}/rutinas`;
  private entrenoApiUrl = `${environment.apiUrl}/miembro/entrenamientos`;
  private entrenadorApiUrl = `${environment.apiUrl}/entrenador`;

  // --- Operaciones de Rutinas ---

  getRutinas(): Observable<any[]> {
    return this.http.get<any[]>(this.rutinasApiUrl);
  }

  crearRutina(payload: RutinaPayload): Observable<any> {
    return this.http.post<any>(this.rutinasApiUrl, payload);
  }

  editarRutina(id: string, payload: RutinaPayload): Observable<any> {
    return this.http.put<any>(`${this.rutinasApiUrl}/${id}`, payload);
  }

  eliminarRutina(id: string): Observable<any> {
    return this.http.delete<any>(`${this.rutinasApiUrl}/${id}`);
  }

  asignarRutinaAMiembros(rutinaId: string, miembroIds: (number | string)[]): Observable<any> {
    return this.http.post<any>(`${this.rutinasApiUrl}/${rutinaId}/asignar`, { miembroIds });
  }

  getMiembrosDelEntrenador(): Observable<any> {
    return this.http.get<any>(`${this.entrenadorApiUrl}/miembros`);
  }

  // --- Operaciones de Entrenamiento Activo ---

  registrarEntrenamiento(payload: any): Observable<any> {
    return this.http.post<any>(`${this.entrenoApiUrl}/registrar`, payload);
  }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.entrenoApiUrl}/historial`);
  }
}
