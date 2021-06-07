import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  spinnerText = 'Cargando';
  constructor(private spinnerService: NgxSpinnerService,
  ) { }
  show(): void {
    this.spinnerService.show();
  }
  hide(): void {
    this.spinnerService.hide();
  }
  getSpinnerText(): string {
    return this.spinnerText;
  }
  setSpinnerText(text: string): void {
    this.spinnerText = text;
    this.show();
  }
}
