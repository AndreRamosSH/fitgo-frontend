import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);

  user: Usuario | null = null;
  initials: string = 'U';

  editando: boolean = false;
  editandoPassword: boolean = false;

  mensajeExito: string = '';
  mensajeError: string = '';

  perfilForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern('^[+0-9\\s]{7,15}$')])
  });

  passwordForm = new FormGroup({
    actual: new FormControl('', [Validators.required]),
    nuevo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmar: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.authService.obtenerPerfil().subscribe({
      next: (data) => {
        this.user = data;
        this.actualizarIniciales();
      },
      error: () => {
        this.user = this.authService.getUser();
        this.actualizarIniciales();
      }
    });
  }

  actualizarIniciales(): void {
    if (this.user) {
      const firstInitial = this.user.nombre ? this.user.nombre.charAt(0).toUpperCase() : '';
      const lastInitial = this.user.apellido ? this.user.apellido.charAt(0).toUpperCase() : '';
      this.initials = `${firstInitial}${lastInitial}` || 'U';
    }
  }

  getRoleBadgeClass(): string {
    return this.user?.rol?.toLowerCase() || 'miembro';
  }

  activarEdicion(): void {
    if (this.user) {
      this.perfilForm.patchValue({
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        correo: this.user.correo,
        telefono: this.user.telefono || ''
      });
      this.editando = true;
      this.mensajeExito = '';
      this.mensajeError = '';
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
  }

  guardarEdicion(): void {
    if (this.perfilForm.invalid) {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
      return;
    }

    const editData: Usuario = {
      nombre: this.perfilForm.value.nombre!,
      apellido: this.perfilForm.value.apellido!,
      correo: this.perfilForm.value.correo!,
      telefono: this.perfilForm.value.telefono || undefined,
      rol: this.user?.rol!
    };

    this.authService.actualizarPerfil(editData).subscribe({
      next: (response) => {
        this.mensajeExito = response.mensaje || 'Perfil actualizado exitosamente';
        this.mensajeError = '';
        if (this.user) {
          this.user.nombre = editData.nombre;
          this.user.apellido = editData.apellido;
          this.user.correo = editData.correo;
          this.user.telefono = editData.telefono;
          this.authService.actualizarSesion(this.user);
          this.actualizarIniciales();
        }
        this.editando = false;
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al actualizar el perfil';
        this.mensajeExito = '';
      }
    });
  }

  activarEdicionPassword(): void {
    this.passwordForm.reset();
    this.editandoPassword = true;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  cancelarEdicionPassword(): void {
    this.editandoPassword = false;
  }

  guardarPassword(): void {
    if (this.passwordForm.invalid) {
      this.mensajeError = 'Todos los campos son obligatorios y la contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.passwordForm.value.nuevo !== this.passwordForm.value.confirmar) {
      this.mensajeError = 'La confirmación no coincide con la nueva contraseña';
      return;
    }

    const payload: Usuario = {
      nombre: this.user?.nombre!,
      apellido: this.user?.apellido!,
      correo: this.user?.correo!,
      telefono: this.user?.telefono || undefined,
      rol: this.user?.rol!,
      password: this.passwordForm.value.nuevo!,
      passwordActual: this.passwordForm.value.actual!
    };

    this.authService.actualizarPerfil(payload).subscribe({
      next: () => {
        this.mensajeExito = 'Contraseña cambiada exitosamente';
        this.mensajeError = '';
        this.editandoPassword = false;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al cambiar la contraseña';
        this.mensajeExito = '';
      }
    });
  }
}
