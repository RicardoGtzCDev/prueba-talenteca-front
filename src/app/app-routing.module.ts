import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAlreadyLoggedInGuard } from 'src/app/core/guard/is-already-logged-in.guard';
import { IsAuthenticatedGuard } from 'src/app/core/guard/is-authenticated.guard';
import { IsSessionExpiredGuard } from 'src/app/core/guard/is-session-expired.guard';
import { IsValidJwtGuard } from 'src/app/core/guard/is-valid-jwt.guard';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotAllowedComponent } from 'src/app/pages/not-allowed/not-allowed.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard, IsSessionExpiredGuard, IsValidJwtGuard],
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'login',
    canActivate: [IsAlreadyLoggedInGuard],
    component: LoginComponent,
  },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
