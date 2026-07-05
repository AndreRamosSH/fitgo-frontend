import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  telefono?: string;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  telefono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';
  private perfilUrl = 'http://localhost:8080/api/perfil';

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('fitgo_token', res.token);
          localStorage.setItem('fitgo_user', JSON.stringify({
            nombre: res.nombre,
            apellido: res.apellido,
            correo: res.correo,
            rol: res.rol,
            telefono: res.telefono
          }));
        }
      })
    );
  }

  registro(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, userData);
  }

  obtenerPerfil(): Observable<User> {
    return this.http.get<User>(this.perfilUrl);
  }

  actualizarPerfil(perfil: any): Observable<any> {
    return this.http.put<any>(this.perfilUrl, perfil);
  }

  actualizarSesion(user: User): void {
    const currentToken = localStorage.getItem('fitgo_token');
    if (currentToken) {
      localStorage.setItem('fitgo_user', JSON.stringify({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
        telefono: user.telefono
      }));
    }
  }

  logout(): void {
    localStorage.removeItem('fitgo_token');
    localStorage.removeItem('fitgo_user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('fitgo_token');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('fitgo_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.rol : null;
  }
}
