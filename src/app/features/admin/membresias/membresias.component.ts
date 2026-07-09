import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmService } from '../../../core/services/confirm.service';

@Component({
  selector: 'app-admin-membresias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.scss'
})
export class MembresiasComponent implements OnInit {
  private adminService = inject(AdminService);
  private confirmService = inject(ConfirmService);

  pestanaActiva = 'planes';
  planes: any[] = [];
  membresias: any[] = [];
  elegibles: any[] = [];

  planIdEditando: number | null = null;
  planNombre = '';
  planPrecio = 0;
  planDuracion = 30;
  planDescripcion = '';

  usuarioSeleccionadoId: number | null = null;
  planSeleccionadoId: number | null = null;

  error = '';
  exito = '';

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    forkJoin({
      membresiasData: this.adminService.getMembresias(),
      elegiblesData: this.adminService.getElegiblesMembresia()
    }).subscribe({
      next: (res: any) => {
        this.planes = res.membresiasData.planes || [];
        this.membresias = res.membresiasData.membresias || [];
        this.elegibles = res.elegiblesData || [];
      },
      error: (err: any) => console.error('Error al cargar datos de membresías', err)
    });
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActiva = pestana;
    this.error = '';
    this.exito = '';
    this.limpiarFormularioPlan();
  }

  onSubmitPlan(): void {
    this.error = '';
    this.exito = '';

    const planData = {
      nombre: this.planNombre,
      precio: this.planPrecio,
      duracionDias: this.planDuracion,
      descripcion: this.planDescripcion
    };

    if (this.planIdEditando !== null) {
      this.adminService.actualizarPlan(this.planIdEditando, planData).subscribe({
        next: () => {
          this.exito = 'Plan actualizado con éxito';
          this.cargarDatos();
          this.limpiarFormularioPlan();
        },
        error: (err: any) => {
          this.error = err.error?.error || 'Error al actualizar el plan';
        }
      });
    } else {
      this.adminService.crearPlan(planData).subscribe({
        next: () => {
          this.exito = 'Plan creado con éxito';
          this.cargarDatos();
          this.limpiarFormularioPlan();
        },
        error: (err: any) => {
          this.error = err.error?.error || 'Error al crear el plan';
        }
      });
    }
  }

  editarPlan(plan: any): void {
    this.planIdEditando = plan.id;
    this.planNombre = plan.nombre;
    this.planPrecio = plan.precio;
    this.planDuracion = plan.duracionDias;
    this.planDescripcion = plan.descripcion;
  }

  eliminarPlan(id: number): void {
    this.confirmService.confirmar({
      titulo: 'Eliminar Plan',
      mensaje: 'Se eliminará este plan de entrenamiento. Verifique que no esté asignado a membresías activas.',
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.adminService.eliminarPlan(id).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (err: any) => {
            this.error = err.error?.error || 'Error al eliminar el plan';
          }
        });
      }
    });
  }

  limpiarFormularioPlan(): void {
    this.planIdEditando = null;
    this.planNombre = '';
    this.planPrecio = 0;
    this.planDuracion = 30;
    this.planDescripcion = '';
  }

  onAsignarMembresia(): void {
    this.error = '';
    this.exito = '';

    if (!this.usuarioSeleccionadoId || !this.planSeleccionadoId) {
      this.error = 'Debes seleccionar un usuario y un plan';
      return;
    }

    const payload = {
      usuarioId: this.usuarioSeleccionadoId,
      planId: this.planSeleccionadoId
    };

    this.adminService.asignarMembresia(payload).subscribe({
      next: () => {
        this.exito = 'Membresía asignada con éxito';
        this.usuarioSeleccionadoId = null;
        this.planSeleccionadoId = null;
        this.cargarDatos();
      },
      error: (err: any) => {
        this.error = err.error?.error || 'Error al asignar la membresía';
      }
    });
  }
}
