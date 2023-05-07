import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { LOCAL_STOTAGE_ITEMS } from './core/constants';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'talenteca-test';

  @HostListener('window:storage')
  onStorageChange() {
    const token = this.lsService.getItem(LOCAL_STOTAGE_ITEMS.token);
    if (token) {
      this.authService.setToken(token);
    }
  }

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private authService: AuthService,
    private lsService: LocalStorageService,
  ) {
    try {
      const token = this.lsService.getItem(LOCAL_STOTAGE_ITEMS.token);
      if (token) {
        this.authService.setSession(token);
      } else {
        this.authService.logout();
        this.router.navigate(['login'], { relativeTo: this.aRoute });
      }
    } catch (error) {
      this.authService.logout();
      this.router.navigate(['login'], { relativeTo: this.aRoute });
    }
  }
}
