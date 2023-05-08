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