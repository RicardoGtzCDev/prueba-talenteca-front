import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendasService } from 'src/app/core/api/tiendas.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ADMIN_ID } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ITienda } from 'src/app/shared/models/api/tiendas/tienda';
import { IJwtUserInfo } from 'src/app/shared/models/jwt-user-info';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styles: [
  ]
})
export class SelectStoreComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  tiendas: ITienda[] = [];

  user: IJwtUserInfo;
  adminId = ADMIN_ID;

  constructor (
    private router: Router,
    private aRoute: ActivatedRoute,
    private authService: AuthService,
    private tiendaService: TiendasService,
  ) {
    this.user = this.authService.getUser();
    this.authService.user$.subscribe({
      next: (value) => { this.user = value; }
    });
    this.obtenerTiendas();
  }

  obtenerTiendas = () => {
    this.tiendaService.obtenerTiendas().subscribe({
      next: (response) => { this.tiendas = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  goToStore = (id: number) => {
    this.router.navigate([id], { relativeTo: this.aRoute });
  }

  goToMenu = () => {
    this.router.navigate(['']);
  }
}
