import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: Usuario | null = null;
  initial = 'U';
  menuVisible = false;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user && this.user.nombre) {
      this.initial = this.user.nombre.charAt(0).toUpperCase();
    }
  }

  get rolClase(): string {
    return this.user?.rol?.toLowerCase() || 'miembro';
  }

  get rolTexto(): string {
    return this.user?.rol || 'MIEMBRO';
  }

  alternarMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  goToProfile(): void {
    const rol = this.user?.rol?.toLowerCase() || 'miembro';
    this.router.navigate([`/${rol}/perfil`]);
    this.menuVisible = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
