import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/miembro';

  getResumen(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen`);
  }

  getProgreso(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/progreso`);
  }

  getMembresia(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/membresia`);
  }

  getEntrenadores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entrenadores`);
  }

  elegirEntrenador(entrenadorId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entrenadores/elegir`, { entrenadorId });
  }
}
