import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/crud-tiendas/crud-tiendas.component';
import { TiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/tiendas/tiendas.component';

const routes: Routes = [
  { path: '', component: TiendasComponent },
  { path: ':id', component: CrudTiendasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendasRoutingModule { }
