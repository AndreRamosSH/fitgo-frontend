import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/admin';

  getResumen(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen`);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  registrarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/registro`, user);
  }

  getMiembros(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/miembros`);
  }

  eliminarMiembro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/miembros/${id}`);
  }

  getEntrenadores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entrenadores`);
  }

  eliminarEntrenador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/entrenadores/${id}`);
  }

  getMembresias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/membresias`);
  }

  crearPlan(plan: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/membresias/nuevo-plan`, plan);
  }

  getPlan(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/membresias/plan/${id}`);
  }

  actualizarPlan(id: number, plan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/membresias/plan/${id}`, plan);
  }

  eliminarPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/membresias/plan/${id}`);
  }

  getElegiblesMembresia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/membresias/asignar/elegibles`);
  }

  asignarMembresia(membresia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/membresias/asignar`, membresia);
  }
}
