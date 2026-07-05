import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metricas {
    peso: number;
    altura: number;
    imc?: number;
}

@Injectable({
    providedIn: 'root'
})
export class MetricasService {
    private apiUrl = 'http://localhost:8080/api/miembro/metricas';

    constructor(private http: HttpClient) { }

    getUltimasMetricas(): Observable<Metricas> {
        return this.http.get<Metricas>(`${this.apiUrl}/ultimo`);
    }

    registrarMetricas(metricas: Metricas): Observable<any> {
        return this.http.post(`${this.apiUrl}/registrar`, metricas);
    }
}