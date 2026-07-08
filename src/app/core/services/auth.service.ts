import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

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
  private apiUrl = `${environment.apiUrl}/auth`;
  private perfilUrl = `${environment.apiUrl}/perfil`;

  login(credentials: { correo: string; password?: string }): Observable<LoginResponse> {
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

  registro(userData: Usuario): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.apiUrl}/registro`, userData);
  }

  obtenerPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(this.perfilUrl);
  }

  actualizarPerfil(perfil: Usuario): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(this.perfilUrl, perfil);
  }

  actualizarSesion(user: Usuario): void {
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

  getUser(): Usuario | null {
    const userStr = localStorage.getItem('fitgo_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.rol : null;
  }
}
