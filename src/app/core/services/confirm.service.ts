import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ConfirmConfig {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private confirmSubject = new Subject<ConfirmConfig>();
  private responseSubject = new Subject<boolean>();

  confirm$ = this.confirmSubject.asObservable();

  confirmar(config: ConfirmConfig): Observable<boolean> {
    this.confirmSubject.next(config);
    return new Observable<boolean>(observer => {
      const sub = this.responseSubject.subscribe(result => {
        observer.next(result);
        observer.complete();
        sub.unsubscribe();
      });
    });
  }

  responder(resultado: boolean): void {
    this.responseSubject.next(resultado);
  }
}
