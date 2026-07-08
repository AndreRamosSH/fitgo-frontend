import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  
  user: User | null = null;
  initials: string = 'U';
  
  editando: boolean = false;
  editandoPassword: boolean = false;
  
  editUser: any = { nombre: '', apellido: '', correo: '', telefono: '' };
  passwordForm: any = { actual: '', nuevo: '', confirmar: '' };
  
  mensajeExito: string = '';
  mensajeError: string = '';

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
      this.editUser = {
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        correo: this.user.correo,
        telefono: this.user.telefono || ''
      };
      this.editando = true;
      this.mensajeExito = '';
      this.mensajeError = '';
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
  }

  guardarEdicion(): void {
    this.authService.actualizarPerfil(this.editUser).subscribe({
      next: (response) => {
        this.mensajeExito = response.mensaje || 'Perfil actualizado exitosamente';
        this.mensajeError = '';
        if (this.user) {
          this.user.nombre = this.editUser.nombre;
          this.user.apellido = this.editUser.apellido;
          this.user.correo = this.editUser.correo;
          this.user.telefono = this.editUser.telefono;
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
    this.passwordForm = { actual: '', nuevo: '', confirmar: '' };
    this.editandoPassword = true;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  cancelarEdicionPassword(): void {
    this.editandoPassword = false;
  }

  guardarPassword(): void {
    if (!this.passwordForm.actual || !this.passwordForm.nuevo || !this.passwordForm.confirmar) {
      this.mensajeError = 'Todos los campos de contraseña son obligatorios';
      return;
    }
    if (this.passwordForm.nuevo.length < 6) {
      this.mensajeError = 'La nueva contraseña debe tener al menos 6 caracteres';
      return;
    }
    if (this.passwordForm.nuevo !== this.passwordForm.confirmar) {
      this.mensajeError = 'La confirmación no coincide con la nueva contraseña';
      return;
    }

    const payload = {
      nombre: this.user?.nombre,
      apellido: this.user?.apellido,
      correo: this.user?.correo,
      telefono: this.user?.telefono,
      password: this.passwordForm.nuevo,
      passwordActual: this.passwordForm.actual
    };

    this.authService.actualizarPerfil(payload).subscribe({
      next: (response) => {
        this.mensajeExito = 'Contraseña cambiada exitosamente';
        this.mensajeError = '';
        this.editandoPassword = false;
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al cambiar la contraseña';
        this.mensajeExito = '';
      }
    });
  }
}
