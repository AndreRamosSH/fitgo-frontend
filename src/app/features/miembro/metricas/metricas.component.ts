import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MetricasService } from '../../../core/services/metricas.service';
import { Metricas } from '../../../core/models/metricas.model';

@Component({
    selector: 'app-metricas',
    standalone: true, 
    imports: [CommonModule, FormsModule], 
    templateUrl: './metricas.component.html',
    styleUrl: './metricas.component.scss' 
})
export class MetricasComponent implements OnInit {
    private metricasService = inject(MetricasService);

    // Métricas del último registro
    peso: number = 0;
    altura: number = 0; // cm
    imc: number = 0;
    estadoImc: string = 'Sin datos';
    masaMuscular: number = 0;
    grasaCorporal: number = 0;
    fechaRegistro: string = '';

    // Metas
    pesoObjetivo: number = 70.0;
    grasaObjetivo: number = 15.0;
    editandoMetas = false;
    formPesoObjetivo: number = 70.0;
    formGrasaObjetivo: number = 15.0;

    // Cambios desde el inicio
    pesoCambioStr: string = '0 kg';
    pesoCambioClase: string = '';
    masaCambioStr: string = '0%';
    masaCambioClase: string = '';
    grasaCambioStr: string = '0%';
    grasaCambioClase: string = '';

    // Historial para gráfico
    historialPesos: any[] = [];
    pesoMaximo: number = 100; // Para escalar las barras

    // Modales y mensajes
    mostrarModalRegistro = false;
    formPeso: number | null = null;
    formAltura: number | null = null;
    mensaje: string = '';

    // Datos del usuario (sexo y fecha de nacimiento) para calcular composición corporal
    fechaNacimiento: string = '';
    sexo: string = '';

    ngOnInit(): void {
        this.cargarMetricasActuales();
        this.cargarHistorial();
    }

    cargarMetricasActuales() {
        this.metricasService.getUltimasMetricas().subscribe({
            next: (res: Metricas) => {
                if (res && res.peso > 0) {
                    this.peso = res.peso;
                    this.altura = res.altura * 100; // Metros a cm
                    this.imc = res.imc || 0;
                    this.clasificarIMC(this.imc);
                    this.fechaNacimiento = res.fechaNacimiento || '';
                    this.sexo = res.sexo || '';
                    this.pesoObjetivo = res.pesoObjetivo || 70.0;
                    this.grasaObjetivo = res.grasaObjetivo || 15.0;
                    this.formPesoObjetivo = this.pesoObjetivo;
                    this.formGrasaObjetivo = this.grasaObjetivo;
                    this.fechaRegistro = res.fechaRegistro || '';

                    // Calcular grasa y masa muscular
                    const edad = this.calcularEdad(this.fechaNacimiento);
                    this.grasaCorporal = this.calcularGrasa(this.imc, edad, this.sexo);
                    this.masaMuscular = (100 - this.grasaCorporal) * 0.7;
                }
            },
            error: (err) => console.error('Error al cargar métricas', err)
        });
    }

    cargarHistorial() {
        this.metricasService.getHistorialMetricas().subscribe({
            next: (res: any[]) => {
                if (res && res.length > 0) {
                    // Historial completo
                    this.historialPesos = res.map((item, index) => {
                        const date = new Date(item.fechaRegistro);
                        const labelMes = date.toLocaleDateString('es-ES', { month: 'short' });
                        // Formatear como Dic1, Dic2 si hay varios en el mismo mes
                        return {
                          peso: item.peso,
                          mes: labelMes.charAt(0).toUpperCase() + labelMes.slice(1, 3) + (index > 0 && new Date(res[index - 1].fechaRegistro).getMonth() === date.getMonth() ? (index % 2 + 1) : ''),
                          fecha: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                        };
                    });

                    // Quedarse con los últimos 5 para el gráfico de barras
                    this.historialPesos = this.historialPesos.slice(-5);

                    // Calcular peso máximo para el escalado del gráfico
                    const pesos = this.historialPesos.map(h => h.peso);
                    this.pesoMaximo = Math.max(...pesos, 100);

                    // Calcular cambios con respecto al primer registro del historial
                    const primerRegistro = res[0];
                    const ultimoRegistro = res[res.length - 1];

                    const pesoDiff = ultimoRegistro.peso - primerRegistro.peso;
                    this.pesoCambioStr = `${Math.abs(pesoDiff).toFixed(1)} kg ${pesoDiff <= 0 ? 'desde inicio' : 'ganado'}`;
                    this.pesoCambioClase = pesoDiff <= 0 ? 'positivo' : 'negativo'; // Perder peso suele ser positivo en gym

                    // Estimar grasa del primer registro
                    const edadPrimer = this.calcularEdad(this.fechaNacimiento); // aproximado
                    const imcPrimer = (primerRegistro.altura && primerRegistro.altura > 0) ? primerRegistro.peso / (primerRegistro.altura * primerRegistro.altura) : 0;
                    const grasaPrimer = this.calcularGrasa(imcPrimer, edadPrimer, this.sexo);
                    const masaPrimer = (100 - grasaPrimer) * 0.7;

                    const grasaDiff = this.grasaCorporal - grasaPrimer;
                    this.grasaCambioStr = `${Math.abs(grasaDiff).toFixed(1)}% ${grasaDiff <= 0 ? 'perdido' : 'ganado'}`;
                    this.grasaCambioClase = grasaDiff <= 0 ? 'positivo' : 'negativo';

                    const masaDiff = this.masaMuscular - masaPrimer;
                    this.masaCambioStr = `${Math.abs(masaDiff).toFixed(1)}% ${masaDiff >= 0 ? 'ganado' : 'perdido'}`;
                    this.masaCambioClase = masaDiff >= 0 ? 'positivo' : 'negativo';
                }
            },
            error: (err) => console.error('Error al cargar historial', err)
        });
    }

    calcularEdad(fechaNacimientoStr: string): number {
        if (!fechaNacimientoStr) return 25; // default
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

    clasificarIMC(imc: number) {
        if (imc < 18.5) {
            this.estadoImc = 'Bajo peso';
        } else if (imc >= 18.5 && imc < 25) {
            this.estadoImc = 'Peso normal';
        } else if (imc >= 25 && imc < 30) {
            this.estadoImc = 'Sobrepeso';
        } else {
            this.estadoImc = 'Obesidad';
        }
    }

    abrirModalRegistro() {
        this.formPeso = this.peso || null;
        this.formAltura = this.altura || null;
        this.mostrarModalRegistro = true;
    }

    guardarMetricas() {
        if (!this.formPeso || !this.formAltura) return;

        const datosEnviar: Metricas = {
            peso: this.formPeso,
            altura: this.formAltura / 100
        };

        this.metricasService.registrarMetricas(datosEnviar).subscribe({
            next: () => {
                this.mensaje = '¡Métricas actualizadas correctamente!';
                this.mostrarModalRegistro = false;
                this.cargarMetricasActuales();
                this.cargarHistorial();
                setTimeout(() => this.mensaje = '', 4000);
            },
            error: (err) => {
                this.mensaje = 'Error al guardar los datos.';
                console.error(err);
            }
        });
    }

    guardarMetas() {
        this.metricasService.guardarMetas(this.formPesoObjetivo, this.formGrasaObjetivo).subscribe({
            next: () => {
                this.pesoObjetivo = this.formPesoObjetivo;
                this.grasaObjetivo = this.formGrasaObjetivo;
                this.editandoMetas = false;
                this.mensaje = '¡Metas personales actualizadas!';
                setTimeout(() => this.mensaje = '', 4000);
            },
            error: (err) => {
                console.error(err);
                this.mensaje = 'Error al guardar metas.';
            }
        });
    }

    // Porcentajes de barra para metas
    get progresoPesoMeta(): number {
        if (this.peso <= 0 || this.pesoObjetivo <= 0) return 0;
        if (this.peso <= this.pesoObjetivo) return 100;
        return Math.min(100, Math.round((this.pesoObjetivo / this.peso) * 100));
    }

    get progresoGrasaMeta(): number {
        if (this.grasaCorporal <= 0 || this.grasaObjetivo <= 0) return 0;
        if (this.grasaCorporal <= this.grasaObjetivo) return 100;
        return Math.min(100, Math.round((this.grasaObjetivo / this.grasaCorporal) * 100));
    }
}