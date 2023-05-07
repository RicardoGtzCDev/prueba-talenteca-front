import { NgModule } from '@angular/core';
//
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
//
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [],
  imports: [
    // angular material
    MatProgressSpinnerModule,
    MatCardModule,
    // otros
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    // angular material
    MatProgressSpinnerModule,
    MatCardModule,
    // otros
    SweetAlert2Module
  ],
})
export class MaterialModule { }
