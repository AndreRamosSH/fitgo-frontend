import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiembroService } from '../../../core/services/miembro.service';
import { MetricasService } from '../../../core/services/metricas.service';
import { Metricas } from '../../../core/models/metricas.model';

@Component({
  selector: 'app-miembro-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.scss'
})
export class ResumenComponent implements OnInit {
  private miembroService = inject(MiembroService);
  private metricasService = inject(MetricasService);

  usuario: any = null;
  rachaActual = 0;
  pesoActual = 0;
  alturaActual = 0;
  imcActual = 0;
  edadActual = 0;
  grasaActual = 0;
  masaMuscularActual = 0;
  membresia: any = null;
  mostrarAlertaVencimiento = false;
  mostrarAlertaGracia = false;
  diasRestantes = 0;


  entrenosEsteMes = 0;
  diasTotalesMes = 30;


  mostrarModalInicial = false;
  formPeso: number | null = null;
  formAltura: number | null = null;
  formPesoObjetivo: number | null = null;
  formFechaNacimiento: string = '';
  formSexo: string = '';
  modalMensaje = '';


  get previewImc(): number {
    if (this.formPeso && this.formAltura) {
      const altM = this.formAltura / 100;
      return this.formPeso / (altM * altM);
    }
    return 0;
  }

  get previewGrasa(): number {
    const imc = this.previewImc;
    if (imc > 0 && this.formFechaNacimiento && this.formSexo) {
      const edad = this.calcularEdad(this.formFechaNacimiento);
      const sexVal = this.formSexo === 'MASCULINO' ? 1 : 0;
      return (1.20 * imc) + (0.23 * edad) - (10.8 * sexVal) - 5.4;
    }
    return 0;
  }

  get previewMasaMuscular(): number {
    const grasa = this.previewGrasa;
    if (grasa > 0) {
      return (100 - grasa) * 0.7;
    }
    return 0;
  }

  get clasificacionImc(): string {
    const imc = this.imcActual;
    if (imc <= 0) return 'Sin datos';
    if (imc < 18.5) return 'Bajo peso';
    if (imc >= 18.5 && imc < 25) return 'Peso normal';
    if (imc >= 25 && imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }

  get progresoPorcentaje(): number {
    if (!this.membresia) return 0;


    const diasConsumidos = Math.max(0, 30 - this.diasRestantes);
    return Math.round((diasConsumidos / 30) * 100);
  }

  ngOnInit(): void {
    this.cargarResumen();
    this.cargarMetricas();
    this.cargarAsistencias();
  }

  cargarResumen(): void {
    this.miembroService.getResumen().subscribe({
      next: (res: any) => {
        this.usuario = res.usuario;
        this.rachaActual = res.rachaActual;
        this.membresia = res.membresia;
        this.calcularAlertas();
      },
      error: (err: any) => console.error(err)
    });
  }

  cargarMetricas(): void {
    this.metricasService.getUltimasMetricas().subscribe({
      next: (res: Metricas) => {
        if (!res || !res.peso || res.peso <= 0 || !res.altura || res.altura <= 0) {
          this.mostrarModalInicial = true;
          this.pesoActual = 0;
          this.alturaActual = 0;
          this.imcActual = 0;
          this.grasaActual = 0;
          this.masaMuscularActual = 0;
        } else {
          this.mostrarModalInicial = false;
          this.pesoActual = res.peso;
          this.alturaActual = res.altura;
          this.imcActual = res.imc || 0;
          if (res.fechaNacimiento) {
            this.edadActual = this.calcularEdad(res.fechaNacimiento);
          }
          const sexo = res.sexo || '';
          this.grasaActual = this.calcularGrasa(this.imcActual, this.edadActual, sexo);
          this.masaMuscularActual = (100 - this.grasaActual) * 0.7;
        }
      },
      error: (err: any) => {
        console.error(err);
        this.mostrarModalInicial = true;
      }
    });
  }

  cargarAsistencias(): void {
    this.miembroService.getProgreso().subscribe({
      next: (res: any) => {
        if (res) {
          this.entrenosEsteMes = res.entrenosEsteMes || 0;
          if (res.calendario && res.calendario.length > 0) {
            this.diasTotalesMes = res.calendario.length;
          }
        }
      },
      error: (err: any) => console.error(err)
    });
  }

  calcularEdad(fechaNacimientoStr: string): number {
    const nacimiento = new Date(fechaNacimientoStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  calcularGrasa(imc: number, edad: number, sexo: string): number {
    if (imc <= 0 || edad <= 0 || !sexo) return 0;
    const sexVal = sexo === 'MASCULINO' ? 1 : 0;
    return (1.20 * imc) + (0.23 * edad) - (10.8 * sexVal) - 5.4;
  }

  guardarMetricasIniciales(): void {
    if (!this.formPeso || !this.formAltura || !this.formFechaNacimiento || !this.formSexo || !this.formPesoObjetivo) {
      this.modalMensaje = 'Por favor complete todos los campos';
      return;
    }


    if (this.formPeso < 10 || this.formPeso > 500) {
      this.modalMensaje = 'El peso debe estar entre 10 kg y 500 kg';
      return;
    }


    if (this.formAltura < 50 || this.formAltura > 300) {
      this.modalMensaje = 'La talla debe estar entre 50 cm y 300 cm';
      return;
    }


    if (this.formPesoObjetivo < 10 || this.formPesoObjetivo > 500) {
      this.modalMensaje = 'El peso objetivo debe estar entre 10 kg y 500 kg';
      return;
    }


    const edad = this.calcularEdad(this.formFechaNacimiento);
    if (isNaN(edad) || edad < 0) {
      this.modalMensaje = 'La fecha de nacimiento ingresada no es válida';
      return;
    }
    if (edad < 15) {
      this.modalMensaje = 'El miembro debe tener al menos 15 años de edad';
      return;
    }
    if (edad > 110) {
      this.modalMensaje = 'La edad ingresada supera el límite permitido';
      return;
    }

    const payload: Metricas = {
      peso: this.formPeso,
      altura: this.formAltura / 100,
      fechaNacimiento: this.formFechaNacimiento,
      sexo: this.formSexo,
      pesoObjetivo: this.formPesoObjetivo
    };

    this.metricasService.registrarMetricas(payload).subscribe({
      next: () => {
        this.mostrarModalInicial = false;
        this.cargarMetricas();
        this.cargarResumen();
      },
      error: (err: any) => {
        console.error(err);
        this.modalMensaje = 'Error al registrar los datos. Inténtelo nuevamente.';
      }
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
    this.diasRestantes = diffDays >= 0 ? diffDays : 0;

    if (this.membresia.estado === 'POR_VENCER') {
      this.mostrarAlertaVencimiento = true;
      this.mostrarAlertaGracia = false;
    } else if (this.membresia.estado === 'VENCIDA') {
      this.mostrarAlertaVencimiento = false;
      const diasPasados = -diffDays;
      const graciaRestante = 5 - diasPasados;
      if (graciaRestante >= 0) {
        this.mostrarAlertaGracia = true;
        this.diasRestantes = graciaRestante;
      } else {
        this.mostrarAlertaGracia = false;
        this.diasRestantes = 0;
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
