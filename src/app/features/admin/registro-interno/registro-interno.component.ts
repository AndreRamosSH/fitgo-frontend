import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-registro-interno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-interno.component.html',
  styleUrl: './registro-interno.component.scss'
})
export class RegistroInternoComponent {
  private adminService = inject(AdminService);
  private router = inject(Router);

  nombre = '';
  apellido = '';
  correo = '';
  telefono = '';
  password = '';
  rol = '';
  turno = 'MANANA';
  experienciaAnios = 0;

  error = '';
  exito = '';

  onSubmit(): void {
    this.error = '';
    this.exito = '';

    const payload: any = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      password: this.password,
      rol: this.rol
    };

    if (this.rol === 'ENTRENADOR') {
      payload.turno = this.turno;
      payload.experienciaAnios = this.experienciaAnios;
    }

    this.adminService.registrarUsuario(payload).subscribe({
      next: () => {
        this.exito = 'Usuario registrado con éxito';
        setTimeout(() => {
          this.router.navigate(['/admin/resumen']);
        }, 1500);
      },
      error: (err: any) => {
        this.error = err.error?.error || 'Error al registrar el usuario';
      }
    });
  }
}
