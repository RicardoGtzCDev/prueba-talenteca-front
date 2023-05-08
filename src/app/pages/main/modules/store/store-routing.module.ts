import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { SelectStoreComponent } from 'src/app/pages/main/modules/store/components/select-store/select-store.component';
import { StoreComponent } from 'src/app/pages/main/modules/store/components/store/store.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: SelectStoreComponent
  },
  {
    path: ':id',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    component: StoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
