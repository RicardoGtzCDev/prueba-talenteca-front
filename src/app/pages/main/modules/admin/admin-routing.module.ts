import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent },
  {
    path: 'clients',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./modules/clientes/clientes.module').then((m) => m.ClientesModule)
  },
  {
    path: 'stores',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./modules/tiendas/tiendas.module').then((m) => m.TiendasModule)
  },
  {
    path: 'articles',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./modules/articulos/articulos.module').then((m) => m.ArticulosModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
