import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { MiembroService } from '../../../core/services/miembro.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ConfirmModalComponent, NgIf, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private miembroService = inject(MiembroService);
  private router = inject(Router);

  mostrarModalPendiente = false;
  paso2Estado: 'activo' | 'completado' = 'activo';
  paso3Estado: 'inactivo' | 'completado' = 'inactivo';
  private pollingSub?: Subscription;

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.rol === 'MIEMBRO') {
      this.verificarMembresia(true);
    }
  }

  ngOnDestroy(): void {
    this.detenerPolling();
  }

  private verificarMembresia(iniciarPollingSiFalla: boolean): void {
    this.miembroService.getResumen().subscribe({
      next: (res) => {
        if (!res.membresia) {
          this.mostrarModalPendiente = true;
          if (iniciarPollingSiFalla) {
            this.iniciarPolling();
          }
        } else {
          this.mostrarModalPendiente = false;
        }
      },
      error: (err) => {
        console.error('Error al obtener el resumen del miembro:', err);
      }
    });
  }

  private iniciarPolling(): void {
    this.detenerPolling();
    this.pollingSub = interval(5000).subscribe(() => {
      this.miembroService.getResumen().subscribe({
        next: (res) => {
          if (res.membresia) {
            this.detenerPolling();
            this.animarTransicionAcceso();
          }
        },
        error: (err) => {
          console.error('Error durante el sondeo de membresía:', err);
        }
      });
    });
  }

  private detenerPolling(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
      this.pollingSub = undefined;
    }
  }

  private animarTransicionAcceso(): void {
    // Transición secuencial interactiva
    this.paso2Estado = 'completado';
    
    setTimeout(() => {
      this.paso3Estado = 'completado';
      
      setTimeout(() => {
        this.mostrarModalPendiente = false;
      }, 1200);
    }, 600);
  }

  cerrarSesion(): void {
    this.detenerPolling();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
