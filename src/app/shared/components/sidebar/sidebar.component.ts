import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SharedLucideIconsModule } from '../../icons/lucide-icons.module';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SharedLucideIconsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() closeSidebar = new EventEmitter<void>();
  private authService = inject(AuthService);
  private router = inject(Router);

  role: string | null = null;
  sections: { title: string; items: NavItem[] }[] = [];

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.initNavigation();
  }

  initNavigation(): void {
    if (this.role === 'ADMIN') {
      this.sections = [
        {
          title: 'Gestión',
          items: [
            { label: 'Panel general', route: '/admin/resumen' },
            { label: 'Miembros', route: '/admin/miembros' },
            { label: 'Entrenadores', route: '/admin/entrenadores' },
            { label: 'Membresías', route: '/admin/membresias' }
          ]
        },
        {
          title: 'Operaciones',
          items: [
            { label: 'Registrar Usuario', route: '/admin/registro-interno' },
            { label: 'Asignar Entrenador', route: '/admin/asignar-entrenador' },
            { label: 'Reportes', route: '/admin/reportes' }
          ]
        },
        {
          title: 'Cuenta',
          items: [
            { label: 'Perfil', route: '/admin/perfil' }
          ]
        }
      ];
    } else if (this.role === 'ENTRENADOR') {
      this.sections = [
        {
          title: 'Gestión',
          items: [
            { label: 'Inicio', route: '/entrenador/resumen' },
            { label: 'Mis Miembros', route: '/entrenador/miembros' },
            { label: 'Asistencia', route: '/entrenador/asistencia' },
            { label: 'Horario', route: '/entrenador/horario' }
          ]
        },
        {
          title: 'Cuenta',
          items: [
            { label: 'Perfil', route: '/entrenador/perfil' }
          ]
        }
      ];
    } else if (this.role === 'MIEMBRO') {
      this.sections = [
        {
          title: 'Entrenamiento',
          items: [
            { label: 'Mi zona', route: '/miembro/resumen' },
            { label: 'Mis Rutinas', route: '/miembro/rutinas'},
            { label: 'Mis Metricas', route: '/miembro/metricas'},
            { label: 'Progreso', route: '/miembro/progreso' },
            { label: 'Mi Membresía', route: '/miembro/membresia' },
            { label: 'Coaches', route: '/miembro/entrenadores' }
          ]
        },
        {
          title: 'Cuenta',
          items: [
            { label: 'Perfil', route: '/miembro/perfil' }
          ]
        }
      ];
    }
  }

  closeSidebarEvent(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
