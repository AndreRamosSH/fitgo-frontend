import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { ConfirmService } from '../../../core/services/confirm.service';
import { SharedLucideIconsModule } from '../../../shared/icons/lucide-icons.module';

@Component({
  selector: 'app-admin-miembros',
  standalone: true,
  imports: [CommonModule, SharedLucideIconsModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiembrosComponent implements OnInit {
  private adminService = inject(AdminService);
  private confirmService = inject(ConfirmService);
  private cdr = inject(ChangeDetectorRef);

  miembros: any[] = [];
  resumen: any = null;

  paginaActual = 1;
  limitePorPagina = 6;

  ngOnInit(): void {
    this.cargarMiembros();
  }

  get totalPaginas(): number {
    return Math.ceil(this.miembros.length / this.limitePorPagina);
  }

  get miembrosPaginados(): any[] {
    const inicio = (this.paginaActual - 1) * this.limitePorPagina;
    return this.miembros.slice(inicio, inicio + this.limitePorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cdr.markForCheck();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.cdr.markForCheck();
    }
  }

  irAPagina(p: number): void {
    if (p >= 1 && p <= this.totalPaginas) {
      this.paginaActual = p;
      this.cdr.markForCheck();
    }
  }

  cargarMiembros(): void {
    this.adminService.getMiembros().subscribe({
      next: (res: any) => {
        this.miembros = res.miembros || [];
        this.resumen = res.resumen;
        this.paginaActual = 1;
        this.cdr.markForCheck();
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
