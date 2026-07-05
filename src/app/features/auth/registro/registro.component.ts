import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  apellido = '';
  correo = '';
  telefono = '';
  password = '';
  error = '';
  exito = '';
  verContrasena = false;

  onSubmit(): void {
    this.error = '';
    this.exito = '';

    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      password: this.password
    };

    this.authService.registro(userData).subscribe({
      next: (res) => {
        this.exito = 'Usuario registrado exitosamente. Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'No se pudo completar el registro. Intente nuevamente.';
      }
    });
  }

  alternarContrasena(): void {
    this.verContrasena = !this.verContrasena;
  }
}
