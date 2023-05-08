import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { CrudTiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/crud-tiendas/crud-tiendas.component';
import { TiendasComponent } from 'src/app/pages/main/modules/admin/modules/tiendas/components/tiendas/tiendas.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: TiendasComponent
  },
  {
    path: ':id',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: CrudTiendasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendasRoutingModule { }
