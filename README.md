# FitGO - Frontend de Gestión de Gimnasio y Entrenamiento

FitGO es una plataforma web premium de gestión deportiva, diseñada específicamente para gimnasios, entrenadores y miembros. El frontend está construido utilizando **Angular 18** con componentes independientes (*standalone*), ofreciendo una interfaz de usuario fluida, moderna, de alto rendimiento y con un diseño estético oscuro (*dark mode*) optimizado para dispositivos móviles, tablets y computadoras de escritorio.

---

## 🚀 Características Principales

### 1. Panel de Entrenador
* **Control de Alumnos a Cargo:** Vista en cuadrícula de todos los miembros asignados con tarjetas detalladas que resumen su estado (plan, vencimiento de membresía, días asistidos en el mes y último peso registrado).
* **Registro de Asistencias:** Formulario interactivo dotado de un dropdown buscador en tiempo real para buscar y marcar rápidamente el ingreso diario de los alumnos.
* **Seguimiento Diario:** Visualización del estado de asistencia de hoy ("Ingresó a las HH:MM" o "Sin asistir hoy").
* **Gestión de Rutinas:** Panel flexbox avanzado para diseñar, crear y administrar plantillas de rutinas asociando ejercicios, series, repeticiones, peso y tiempos de descanso.

### 2. Panel del Miembro (Alumno)
* **Resumen de Progreso:** Gráficos interactivos de entrenamientos realizados por semana y mapa mensual de constancia (asistencias) en cuadrícula estilo GitHub.
* **Entrenamiento Activo:** Interfaz inmersiva paso a paso que guía al alumno en tiempo real durante sus sesiones de entrenamiento, incluyendo temporizadores automáticos de descanso para cada serie.
* **Mis Rutinas:** Acceso inmediato tanto a las rutinas asignadas por el entrenador como a las rutinas personalizadas creadas por el propio miembro.
* **Historial de Entrenamientos:** Historial cronológico completo de sesiones finalizadas con sus respectivas fechas y rutinas realizadas.
* **Membresía:** Detalle completo del plan contratado (precio, fecha de inicio y vencimiento).

### 3. Perfil de Usuario Unificado
* **Mi Perfil:** Gestión y actualización de datos personales, cambio seguro de contraseña, avatares con iniciales estandarizados con gradiente naranja y tags distintivos de rol en el sistema.

---

## 🛠️ Tecnologías y Librerías Utilizadas

* **Framework Principal:** Angular 18 (Standalone Components & Routing)
* **Lenguaje:** TypeScript, HTML5 y SCSS
* **Estilos:** Vanilla CSS/SCSS modularizado (variables de colores HSL, mixins responsivos y animaciones de micro-interacciones)
* **Iconos:** Lucide Icons (`lucide-angular`)

---

## 💻 Servidor de Desarrollo

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Corre el servidor de desarrollo local:
   ```bash
   ng serve
   ```

3. Abre tu navegador en [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente al detectar cambios en el código fuente.

---

## 📦 Compilación para Producción

Para generar el bundle de producción optimizado, ejecuta:
```bash
ng build
```
Los archivos compilados y listos para desplegar se guardarán en el directorio `dist/fitgo-frontend`.
