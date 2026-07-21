import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Usuario, Rol, Turno } from '../../../core/models/usuario.model';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-admin-registro-interno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedLucideIconsModule],
  templateUrl: './registro-interno.component.html',
  styleUrl: './registro-interno.component.scss'
})
export class RegistroInternoComponent {
  private adminService = inject(AdminService);
  private router = inject(Router);

  error = '';
  exito = '';

  mostrarDropdownRol = false;
  mostrarDropdownTurno = false;

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

  get rolSeleccionadoTexto(): string {
    const val = this.registroForm.get('rol')?.value;
    if (val === 'MIEMBRO') return 'Miembro';
    if (val === 'ENTRENADOR') return 'Entrenador';
    if (val === 'ADMIN') return 'Administrador';
    return '';
  }

  get turnoSeleccionadoTexto(): string {
    const val = this.registroForm.get('turno')?.value;
    if (val === 'MANANA') return 'Mañana (6:00 - 12:00)';
    if (val === 'TARDE') return 'Tarde (12:00 - 18:00)';
    if (val === 'NOCHE') return 'Noche (18:00 - 23:00)';
    return '';
  }

  toggleDropdownRol(): void {
    this.mostrarDropdownRol = !this.mostrarDropdownRol;
  }

  toggleDropdownTurno(): void {
    this.mostrarDropdownTurno = !this.mostrarDropdownTurno;
  }

  seleccionarRol(rol: string): void {
    this.registroForm.patchValue({ rol });
    this.mostrarDropdownRol = false;
    this.registroForm.get('rol')?.markAsTouched();
  }

  seleccionarTurno(turno: string): void {
    this.registroForm.patchValue({ turno });
    this.mostrarDropdownTurno = false;
  }

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
