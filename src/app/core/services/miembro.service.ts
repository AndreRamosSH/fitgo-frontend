import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, Entrenador } from '../models/usuario.model';
import { Membresia } from '../models/membresia.model';

export interface ResumenMiembro {
  usuario: {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    entrenador: string | { id: number; nombre: string };
  };
  rachaActual: number;
  pesoActual: number | null;
  membresia: Membresia | null;
  entrenadores: Entrenador[];
}

@Injectable({
  providedIn: 'root'
})
export class MiembroService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/miembro`;

  getResumen(): Observable<ResumenMiembro> {
    return this.http.get<ResumenMiembro>(`${this.apiUrl}/resumen`);
  }

  getProgreso(mes?: string): Observable<any> {
    const url = mes ? `${this.apiUrl}/progreso?mes=${mes}` : `${this.apiUrl}/progreso`;
    return this.http.get<any>(url);
  }

  getMembresia(): Observable<{ membresia: Membresia | string }> {
    return this.http.get<{ membresia: Membresia | string }>(`${this.apiUrl}/membresia`);
  }

  getEntrenadores(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(`${this.apiUrl}/entrenadores`);
  }

  elegirEntrenador(entrenadorId: number): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/entrenadores/elegir`, { entrenadorId });
  }
}
