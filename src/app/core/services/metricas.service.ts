import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Metricas } from '../models/metricas.model';

@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/miembro/metricas`;

  getUltimasMetricas(): Observable<Metricas> {
    return this.http.get<Metricas>(`${this.apiUrl}/ultimo`);
  }

  registrarMetricas(metricas: Metricas): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/registrar`, metricas);
  }
}