import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/entrenador';

  getResumen(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen`);
  }

  getMiembros(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/miembros`);
  }

  getHorario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/horario`);
  }

  getPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`);
  }

  registrarAsistencia(asistencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asistencia`, asistencia);
  }
}
