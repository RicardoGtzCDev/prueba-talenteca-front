import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent},
  {
    path: 'clients',
    loadChildren: () => import('./modules/clientes/clientes.module').then((m) => m.ClientesModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./modules/tiendas/tiendas.module').then((m) => m.TiendasModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./modules/articulos/articulos.module').then((m) => m.ArticulosModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
