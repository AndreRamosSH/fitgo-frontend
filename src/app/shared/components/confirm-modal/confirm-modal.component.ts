import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService, ConfirmConfig } from '../../../core/services/confirm.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  private confirmService = inject(ConfirmService);
  private subscription!: Subscription;

  visible = false;
  config: ConfirmConfig = {
    titulo: '',
    mensaje: '',
    textoConfirmar: 'Confirmar',
    textoCancelar: 'Cancelar'
  };

  ngOnInit(): void {
    this.subscription = this.confirmService.confirm$.subscribe(config => {
      this.config = {
        ...config,
        textoConfirmar: config.textoConfirmar || 'Confirmar',
        textoCancelar: config.textoCancelar || 'Cancelar',
        ocultarCancelar: config.ocultarCancelar || false
      };
      this.visible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  aceptar(): void {
    this.visible = false;
    this.confirmService.responder(true);
  }

  cancelar(): void {
    this.visible = false;
    this.confirmService.responder(false);
  }
}
