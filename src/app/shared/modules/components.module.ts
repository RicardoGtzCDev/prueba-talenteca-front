import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { LoginBannerComponent } from 'src/app/shared/components/molecules/login-banner/login-banner.component';
import { LoginFormComponent } from 'src/app/shared/components/molecules/login-form/login-form.component';
import { XDividerComponent } from 'src/app/shared/components/atoms/x-divider/x-divider.component';
import { ProductComponent } from 'src/app/shared/components/organisms/product/product.component';

@NgModule({
  imports: [
    // default modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // custom module
    MaterialModule
  ],
  declarations: [
    // atoms
    AlertComponent,
    XDividerComponent,
    // molecules
    LoginBannerComponent,
    LoginFormComponent,
    // organisms
    ProductComponent,
  ],
  exports: [
    // atoms
    AlertComponent,
    XDividerComponent,
    // molecules
    LoginBannerComponent,
    LoginFormComponent,
    // organisms
    ProductComponent,
  ],
})
export class ComponentsModule { }
