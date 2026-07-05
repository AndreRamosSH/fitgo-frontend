import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroService } from '../../../core/services/miembro.service';

@Component({
  selector: 'app-miembro-progreso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso.component.html',
  styleUrl: './progreso.component.scss'
})
export class ProgresoComponent implements OnInit {
  private miembroService = inject(MiembroService);
  pesoActual = 0;

  ngOnInit(): void {
    this.miembroService.getProgreso().subscribe({
      next: (res: any) => {
        this.pesoActual = res.pesoActual;
      },
      error: (err: any) => console.error(err)
    });
  }
}
