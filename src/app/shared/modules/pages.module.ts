import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { MaterialModule } from './material.module';
import { ComponentsModule } from './components.module';
//
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotAllowedComponent } from 'src/app/pages/not-allowed/not-allowed.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { ArticulosComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/articulos/articulos.component';
import { CrudArticuloComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/crud-articulo/crud-articulo.component';
import { ClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/clientes/clientes.component';
import { CrudClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/crud-clientes/crud-clientes.component';
import { TiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/tiendas/tiendas.component';
import { CrudTiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/crud-tiendas/crud-tiendas.component';
import { SelectStoreComponent } from 'src/app/pages/main/modules/store/components/select-store/select-store.component';
import { StoreComponent } from 'src/app/pages/main/modules/store/components/store/store.component';

@NgModule({
  imports: [
    // default modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // custom module
    ComponentsModule,
    MaterialModule,
  ],
  declarations: [
    LoginComponent,
    NotAllowedComponent,
    NotFoundComponent,
    MainComponent,
    ArticulosComponent,
    CrudArticuloComponent,
    ClientesComponent,
    CrudClientesComponent,
    TiendasComponent,
    CrudTiendasComponent,
    SelectStoreComponent,
    StoreComponent,
  ],
  exports: [
    LoginComponent,
    NotAllowedComponent,
    NotFoundComponent,
    MainComponent,
    ArticulosComponent,
    CrudArticuloComponent,
    ClientesComponent,
    CrudClientesComponent,
    TiendasComponent,
    CrudTiendasComponent,
    SelectStoreComponent,
    StoreComponent,
  ],
})
export class PagesModule { }
