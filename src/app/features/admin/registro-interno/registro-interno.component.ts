import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Usuario, Rol, Turno } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-admin-registro-interno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-interno.component.html',
  styleUrl: './registro-interno.component.scss'
})
export class RegistroInternoComponent {
  private adminService = inject(AdminService);
  private router = inject(Router);

  error = '';
  exito = '';

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern('^[+0-9\\s]{7,15}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rol: new FormControl('', [Validators.required]),
    turno: new FormControl('MANANA'),
    experienciaAnios: new FormControl(0, [Validators.min(0), Validators.max(50)])
  });

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.error = 'Por favor, completa los campos obligatorios correctamente.';
      return;
    }

    this.error = '';
    this.exito = '';

    const payload: Usuario = {
      nombre: this.registroForm.value.nombre!,
      apellido: this.registroForm.value.apellido!,
      correo: this.registroForm.value.correo!,
      telefono: this.registroForm.value.telefono || undefined,
      password: this.registroForm.value.password!,
      rol: this.registroForm.value.rol as Rol
    };

    if (payload.rol === 'ENTRENADOR') {
      payload.turno = this.registroForm.value.turno as Turno;
      payload.experienciaAnios = this.registroForm.value.experienciaAnios!;
    }

    this.adminService.registrarUsuario(payload).subscribe({
      next: () => {
        this.exito = 'Usuario registrado con éxito';
        setTimeout(() => {
          this.router.navigate(['/admin/resumen']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar el usuario';
      }
    });
  }
}
