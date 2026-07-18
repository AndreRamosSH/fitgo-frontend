import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private miembroService = inject(MiembroService);

  usuario: any = null;
  rachaActual = 0;
  pesoActual = 0;
  membresia: any = null;
  mostrarAlertaVencimiento = false;
  mostrarAlertaGracia = false;
  diasRestantes = 0;

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.miembroService.getResumen().subscribe({
      next: (res: any) => {
        this.usuario = res.usuario;
        this.rachaActual = res.rachaActual;
        this.pesoActual = res.pesoActual;
        this.membresia = res.membresia;
        this.calcularAlertas();
      },
      error: (err: any) => console.error(err)
    });
  }

  calcularAlertas(): void {
    if (!this.membresia) {
      this.mostrarAlertaVencimiento = false;
      this.mostrarAlertaGracia = false;
      return;
    }

    const hoy = new Date();
    const hoyUTC = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    const parts = this.membresia.fechaFin.split('-');
    const fFinUTC = Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

    const diffTime = fFinUTC - hoyUTC;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (this.membresia.estado === 'POR_VENCER') {
      this.mostrarAlertaVencimiento = true;
      this.mostrarAlertaGracia = false;
      this.diasRestantes = diffDays >= 0 ? diffDays : 0;
    } else if (this.membresia.estado === 'VENCIDA') {
      this.mostrarAlertaVencimiento = false;
      const diasPasados = -diffDays;
      const graciaRestante = 5 - diasPasados;
      if (graciaRestante >= 0) {
        this.mostrarAlertaGracia = true;
        this.diasRestantes = graciaRestante;
      } else {
        this.mostrarAlertaGracia = false;
      }
    } else {
      this.mostrarAlertaVencimiento = false;
      this.mostrarAlertaGracia = false;
    }
  }

  get nombreUsuario(): string {
    return this.usuario?.nombre || 'Usuario';
  }
}
