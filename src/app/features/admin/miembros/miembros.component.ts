import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmService } from '../../../core/services/confirm.service';

@Component({
  selector: 'app-admin-miembros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent implements OnInit {
  private adminService = inject(AdminService);
  private confirmService = inject(ConfirmService);

  miembros: any[] = [];
  resumen: any = null;

  ngOnInit(): void {
    this.cargarMiembros();
  }

  cargarMiembros(): void {
    this.adminService.getMiembros().subscribe({
      next: (res: any) => {
        this.miembros = res.miembros || [];
        this.resumen = res.resumen;
      },
      error: (err: any) => console.error(err)
    });
  }

  eliminar(id: number): void {
    this.confirmService.confirmar({
      titulo: 'Eliminar Miembro',
      mensaje: 'Se borrarán sus asistencias y membresías asociadas. Esta acción no se puede deshacer.',
      textoConfirmar: 'Eliminar',
      textoCancelar: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.adminService.eliminarMiembro(id).subscribe({
          next: () => {
            this.cargarMiembros();
          },
          error: (err: any) => console.error(err)
        });
      }
    });
  }
}
