import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', loadComponent: () => import('./features/admin/resumen/resumen.component').then(m => m.ResumenComponent) },
      { path: 'miembros', loadComponent: () => import('./features/admin/miembros/miembros.component').then(m => m.MiembrosComponent) },
      { path: 'entrenadores', loadComponent: () => import('./features/admin/entrenadores/entrenadores.component').then(m => m.EntrenadoresComponent) },
      { path: 'membresias', loadComponent: () => import('./features/admin/membresias/membresias.component').then(m => m.MembresiasComponent) },
      { path: 'registro-interno', loadComponent: () => import('./features/admin/registro-interno/registro-interno.component').then(m => m.RegistroInternoComponent) },
      { path: 'asignar-entrenador', loadComponent: () => import('./features/admin/asignar-entrenador/asignar-entrenador.component').then(m => m.AsignarEntrenadorComponent) },
      { path: 'reportes', loadComponent: () => import('./features/admin/reportes/reportes.component').then(m => m.ReportesComponent) },
      { path: 'perfil', loadComponent: () => import('./shared/components/perfil/perfil.component').then(m => m.PerfilComponent) }
    ]
  },

  {
    path: 'entrenador',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ENTRENADOR'] },
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', loadComponent: () => import('./features/entrenador/resumen/resumen.component').then(m => m.ResumenComponent) },
      { path: 'miembros', loadComponent: () => import('./features/entrenador/miembros/miembros.component').then(m => m.MiembrosComponent) },
      { path: 'asistencia', loadComponent: () => import('./features/entrenador/asistencia/asistencia.component').then(m => m.AsistenciaComponent) },
      { path: 'horario', loadComponent: () => import('./features/entrenador/horario/horario.component').then(m => m.HorarioComponent) },
      { path: 'perfil', loadComponent: () => import('./shared/components/perfil/perfil.component').then(m => m.PerfilComponent) }
    ]
  },

  {
    path: 'miembro',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['MIEMBRO'] },
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', loadComponent: () => import('./features/miembro/resumen/resumen.component').then(m => m.ResumenComponent) },
      { path: 'rutinas', loadComponent: () => import('./features/miembro/rutinas/rutinas.component').then(m => m.RutinasComponent) },
      { path: 'progreso', loadComponent: () => import('./features/miembro/progreso/progreso.component').then(m => m.ProgresoComponent) },
      { path: 'membresia', loadComponent: () => import('./features/miembro/membresia/membresia.component').then(m => m.MembresiaComponent) },
      { path: 'entrenadores', loadComponent: () => import('./features/miembro/entrenadores/entrenadores.component').then(m => m.EntrenadoresComponent) },
      { path: 'perfil', loadComponent: () => import('./shared/components/perfil/perfil.component').then(m => m.PerfilComponent) },
      { path: 'metricas', loadComponent: () => import('./features/miembro/metricas/metricas.component').then(m => m.MetricasComponent) }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
