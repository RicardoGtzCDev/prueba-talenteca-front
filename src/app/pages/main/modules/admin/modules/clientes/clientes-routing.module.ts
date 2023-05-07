import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/clientes/clientes.component';
import { CrudClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/crud-clientes/crud-clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: ':id', component: CrudClientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
