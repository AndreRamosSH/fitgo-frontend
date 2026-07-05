import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmService } from '../../../core/services/confirm.service';

@Component({
  selector: 'app-admin-entrenadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.scss'
})
export class EntrenadoresComponent implements OnInit {
  private adminService = inject(AdminService);
  private confirmService = inject(ConfirmService);

  entrenadores: any[] = [];
  totalEntrenadores = 0;

  ngOnInit(): void {
    this.cargarEntrenadores();
  }

  cargarEntrenadores(): void {
    this.adminService.getEntrenadores().subscribe({
      next: (res: any) => {
        this.entrenadores = res || [];
        this.totalEntrenadores = this.entrenadores.length;
      },
      error: (err: any) => console.error(err)
    });
  }

  eliminar(id: number): void {
    this.confirmService.confirmar({
      titulo: 'Eliminar Entrenador',
      mensaje: 'Se desasignará a los miembros a su cargo. Esta acción no se puede deshacer.',
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.adminService.eliminarEntrenador(id).subscribe({
          next: () => {
            this.cargarEntrenadores();
          },
          error: (err: any) => console.error(err)
        });
      }
    });
  }
}
