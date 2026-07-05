import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MetricasService, Metricas} from '../../../core/services/metricas.service';
@Component({
    selector: 'app-metricas',
    standalone: true, 
    imports: [CommonModule, FormsModule], 
    templateUrl: './metricas.component.html',
    styleUrl: './metricas.component.scss' 
})
export class MetricasComponent implements OnInit {

    peso: number = 0;
    altura: number = 0; // Se ingresará en centímetros en la UI (ej: 175) y se transformará a metros
    imc: number = 0;
    estadoImc: string = 'Sin datos';

    mensaje: string = '';

    constructor(private metricasService: MetricasService) { }

    ngOnInit(): void {
        this.cargarMetricasActuales();
    }

    cargarMetricasActuales() {
        this.metricasService.getUltimasMetricas().subscribe({
            next: (res: Metricas) => {
                this.peso = res.peso;
                this.altura = res.altura * 100; // Convertimos metros de la BD a cm para el input (1.75 -> 175)
                this.calcularIMC();
            },
            error: (err) => console.error('Error al cargar métricas', err)
        });
    }

    // Calculadora en tiempo real
    calcularIMC() {
        if (this.peso > 0 && this.altura > 0) {
            const alturaMetros = this.altura / 100;
            this.imc = this.peso / (alturaMetros * alturaMetros);
            this.clasificarIMC(this.imc);
        } else {
            this.imc = 0;
            this.estadoImc = 'Sin datos';
        }
    }

    clasificarIMC(imc: number) {
        if (imc < 18.5) {
            this.estadoImc = 'Bajo peso';
        } else if (imc >= 18.5 && imc < 25) {
            this.estadoImc = 'Normal / Saludable';
        } else if (imc >= 25 && imc < 30) {
            this.estadoImc = 'Sobrepeso';
        } else {
            this.estadoImc = 'Obesidad';
        }
    }

    guardarMetricas() {
        const datosEnviar: Metricas = {
            peso: this.peso,
            altura: this.altura / 100 // Enviamos a la BD en metros (ej: 1.75)
        };

        this.metricasService.registrarMetricas(datosEnviar).subscribe({
            next: (res) => {
                this.mensaje = '¡Progreso y métricas actualizadas correctamente!';
                setTimeout(() => this.mensaje = '', 4000);
            },
            error: (err) => {
                this.mensaje = 'Error al guardar los datos.';
                console.error(err);
            }
        });
    }
}