import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { ArticulosComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/articulos/articulos.component';
import { CrudArticuloComponent } from 'src/app/pages/main/modules/admin/modules/articulos/components/crud-articulo/crud-articulo.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: ArticulosComponent
  },
  {
    path: ':id',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: CrudArticuloComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }
