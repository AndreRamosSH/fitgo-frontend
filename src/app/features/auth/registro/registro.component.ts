import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  error = '';
  exito = '';
  verContrasena = false;

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern('^[+0-9\\s]{7,15}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.error = 'Por favor, completa los campos obligatorios correctamente.';
      return;
    }

    this.error = '';
    this.exito = '';

    const userData: Usuario = {
      nombre: this.registroForm.value.nombre!,
      apellido: this.registroForm.value.apellido!,
      correo: this.registroForm.value.correo!,
      telefono: this.registroForm.value.telefono || undefined,
      password: this.registroForm.value.password!,
      rol: 'MIEMBRO'
    };

    this.authService.registro(userData).subscribe({
      next: () => {
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
