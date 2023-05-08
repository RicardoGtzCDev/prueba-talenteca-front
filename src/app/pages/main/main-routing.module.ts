import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { MainComponent } from 'src/app/pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: MainComponent },
  {
    path: 'admin',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'store',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./modules/store/store.module').then((m) => m.StoreModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
