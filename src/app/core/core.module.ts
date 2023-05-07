import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../shared/modules/components.module';
import { MaterialModule } from '../shared/modules/material.module';
import { PagesModule } from '../shared/modules/pages.module';

@NgModule({
  declarations: [],
  imports: [
    // default modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // custom modules
    PagesModule,
    ComponentsModule,
    MaterialModule,
  ],
})
export class CoreModule { }
