import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { ClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/clientes/clientes.component';
import { CrudClientesComponent } from 'src/app/pages/main/modules/admin/modules/clientes/components/crud-clientes/crud-clientes.component';

const routes: Routes = [
  {
    path: '', canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],

    component: ClientesComponent
  },
  {
    path: ':id',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: CrudClientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
