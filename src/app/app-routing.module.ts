import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAlreadyLoggedInGuard } from 'src/app/core/guard/is-already-logged-in.guard';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotAllowedComponent } from 'src/app/pages/not-allowed/not-allowed.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
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
