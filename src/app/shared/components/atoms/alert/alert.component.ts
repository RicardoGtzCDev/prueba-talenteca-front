import {
  Component, ViewChild,
} from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ],
})
export class AlertComponent {
  @ViewChild('alert') private swal!: SwalComponent;

  private bgColors = {
    success: 'rgb(220, 252, 231)',
    info: 'rgb(219 234 254',
    warning: 'rgb(254 249 195)',
    error: 'rgb(254 226 226)',
  };

  constructor() { }

  triggerSuccess = (message: string) => {
    this.swal.fire();
    this.swal.background = this.bgColors.success;
    this.swal.text = message;
    this.swal.showConfirmButton = false;
    this.swal.timer = 5000;
    this.triggerAlert();
  };

  triggerInfo = (message: string) => {
    this.swal.fire();
    this.swal.background = this.bgColors.info;
    this.swal.text = message;
    this.swal.showConfirmButton = false;
    this.swal.timer = undefined;
    this.swal.confirmButtonText = 'Entendido';
    this.triggerAlert();
  };

  triggerWarning = (message: string) => {
    this.swal.fire();
    this.swal.background = this.bgColors.warning;
    this.swal.text = message;
    this.swal.showConfirmButton = false;
    this.swal.timer = undefined;
    this.swal.confirmButtonText = 'Entendido';
    this.triggerAlert();
  };

  triggerError = (message: string) => {
    this.swal.fire();
    this.swal.background = this.bgColors.error;
    this.swal.text = message;
    this.swal.showConfirmButton = false;
    this.swal.timer = undefined;
    this.swal.confirmButtonText = 'Entendido';
    this.triggerAlert();
  };

  private triggerAlert = () => {
    setTimeout(() => {
      this.swal.update();
    }, 2000);
  };
}
