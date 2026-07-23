import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MiembroService } from '../../../core/services/miembro.service';
import { MetricasService } from '../../../core/services/metricas.service';
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
  private miembroService = inject(MiembroService);
  private metricasService = inject(MetricasService);

  user: Usuario | null = null;
  initials: string = 'U';

  editando: boolean = false;
  editandoPassword: boolean = false;
  editandoDatosFisicos: boolean = false;

  mensajeExito: string = '';
  mensajeError: string = '';

  metricas: any = null;
  membresiaData: any = null;

  perfilForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern('^[+0-9\\s]{7,15}$')]),
    sexo: new FormControl(''),
    fechaNacimiento: new FormControl('')
  });

  datosFisicosForm = new FormGroup({
    peso: new FormControl<number | null>(null, [Validators.required, Validators.min(10), Validators.max(500)]),
    altura: new FormControl<number | null>(null, [Validators.required, Validators.min(50), Validators.max(280)]),
    pesoObjetivo: new FormControl<number | null>(null, [Validators.required, Validators.min(10), Validators.max(500)])
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
        if (this.user.rol === 'MIEMBRO') {
          this.cargarMetricas();
          this.cargarMembresia();
        }
      },
      error: () => {
        this.user = this.authService.getUser();
        this.actualizarIniciales();
        if (this.user && this.user.rol === 'MIEMBRO') {
          this.cargarMetricas();
          this.cargarMembresia();
        }
      }
    });
  }

  cargarMetricas(): void {
    this.metricasService.getUltimasMetricas().subscribe({
      next: (m) => {
        this.metricas = m;
        if (this.user) {
          this.user.fechaNacimiento = m.fechaNacimiento;
          this.user.sexo = m.sexo;
          this.user.pesoObjetivo = m.pesoObjetivo;
          this.user.grasaObjetivo = m.grasaObjetivo;
        }
      },
      error: (err) => console.error('Error al cargar métricas:', err)
    });
  }

  cargarMembresia(): void {
    this.miembroService.getMembresia().subscribe({
      next: (res) => {
        this.membresiaData = res.membresia !== 'Sin membresia activa' ? res.membresia : null;
      },
      error: (err) => console.error('Error al cargar membresía:', err)
    });
  }

  calcularEdad(fechaNacimientoStr?: string): number {
    if (!fechaNacimientoStr) return 0;
    const nacimiento = new Date(fechaNacimientoStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
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
        telefono: this.user.telefono || '',
        sexo: this.user.sexo || '',
        fechaNacimiento: this.user.fechaNacimiento || ''
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
      rol: this.user?.rol!,
      sexo: this.perfilForm.value.sexo || undefined,
      fechaNacimiento: this.perfilForm.value.fechaNacimiento || undefined
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
          this.user.sexo = editData.sexo;
          this.user.fechaNacimiento = editData.fechaNacimiento;
          this.authService.actualizarSesion(this.user);
          this.actualizarIniciales();
        }
        this.editando = false;
        this.cargarMetricas();
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

  activarEdicionDatosFisicos(): void {
    if (this.metricas) {
      this.datosFisicosForm.patchValue({
        peso: this.metricas.peso,
        altura: this.metricas.altura ? Math.round(this.metricas.altura * 100) : null,
        pesoObjetivo: this.metricas.pesoObjetivo || this.user?.pesoObjetivo || 0
      });
    } else {
      this.datosFisicosForm.patchValue({
        peso: 70,
        altura: 170,
        pesoObjetivo: 65
      });
    }
    this.editandoDatosFisicos = true;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  cancelarEdicionDatosFisicos(): void {
    this.editandoDatosFisicos = false;
  }

  guardarDatosFisicos(): void {
    if (this.datosFisicosForm.invalid) {
      this.mensajeError = 'Por favor, ingresa los datos físicos correctamente.';
      return;
    }

    const pesoVal = this.datosFisicosForm.value.peso!;
    const alturaM = this.datosFisicosForm.value.altura! / 100;
    const pesoObjVal = this.datosFisicosForm.value.pesoObjetivo!;

    const payload = {
      peso: pesoVal,
      altura: alturaM,
      pesoObjetivo: pesoObjVal,
      fechaNacimiento: this.user?.fechaNacimiento,
      sexo: this.user?.sexo,
      grasaObjetivo: this.user?.grasaObjetivo
    };

    this.metricasService.registrarMetricas(payload).subscribe({
      next: () => {
        this.mensajeExito = 'Datos físicos actualizados con éxito';
        this.mensajeError = '';
        this.editandoDatosFisicos = false;
        this.cargarMetricas();
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al actualizar los datos físicos';
        this.mensajeExito = '';
      }
    });
  }
}
