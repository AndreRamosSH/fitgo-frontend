import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  correo = '';
  password = '';
  error = '';
  verContrasena = false;

  onSubmit(): void {
    this.error = '';
    this.authService.login({ correo: this.correo, password: this.password }).subscribe({
      next: (res) => {
        const rol = res.rol;
        if (rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (rol === 'ENTRENADOR') {
          this.router.navigate(['/entrenador']);
        } else {
          this.router.navigate(['/miembro']);
        }
      },
      error: (err) => {
        this.error = err.error?.error || 'Correo o contraseña incorrectos';
      }
    });
  }

  alternarContrasena(): void {
    this.verContrasena = !this.verContrasena;
  }
}
