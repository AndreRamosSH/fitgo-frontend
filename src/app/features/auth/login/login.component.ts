import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedLucideIconsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  error = '';
  verContrasena = false;

  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor, introduce credenciales válidas.';
      return;
    }

    this.error = '';
    const credentials = {
      correo: this.loginForm.value.correo!,
      password: this.loginForm.value.password!
    };

    this.authService.login(credentials).subscribe({
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
