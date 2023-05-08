import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/articulos/articulos.component';
import { CrudArticuloComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/crud-articulo/crud-articulo.component';

const routes: Routes = [
  { path: '', component: ArticulosComponent },
  { path: ':id', component: CrudArticuloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }
