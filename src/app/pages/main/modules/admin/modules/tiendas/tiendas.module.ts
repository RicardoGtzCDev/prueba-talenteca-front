import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendasRoutingModule } from './tiendas-routing.module';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { CrudTiendasComponent } from './components/crud-tiendas/crud-tiendas.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TiendasRoutingModule
  ]
})
export class TiendasModule { }
