import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ADMIN_ID } from 'src/app/core/constants';
import { IJwtUserInfo } from 'src/app/shared/models/jwt-user-info';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent {

  user: IJwtUserInfo;
  adminId = ADMIN_ID;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
    this.authService.user$.subscribe({
      next: (value) => { this.user = value; }
    });
    if (this.user.id !== ADMIN_ID) {
      this.router.navigate(['store'])
    }
  }

  goToAdmin = (route: string) => {
    this.router.navigate(['admin', route])
  }

  goToStore = () => {
    this.router.navigate(['store'])
  }
}

// validar si es el usuario adm (harcodeado en algun lado)y eb caso que si,
// aqui se van a mostrar 2 opciones entrar a la tienda a los crud de administracion
// de lo contrario redirigir directamente a la tienda
// en la pagina del crud igual validad que sea admin y si no redirigir