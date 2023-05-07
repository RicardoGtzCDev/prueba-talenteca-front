import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LOCAL_STOTAGE_ITEMS } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ILogin } from 'src/app/shared/models/login';
import { CurrentPageService } from 'src/app/shared/services/current-page.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
})
export class LoginComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  loading = true;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private authService: AuthService,
    private currentPageService: CurrentPageService,
    private lsService: LocalStorageService,
  ) {
    this.loading = false;
  }

  onLogin = (event: ILogin) => {
    this.loading = true;
    this.authService.login(event.user, event.pass).subscribe({
      next: () => {
        this.currentPageService.setCurrentUrl(['Inicio']);
        this.lsService.setItem(LOCAL_STOTAGE_ITEMS.currentPage, 'Inicio');
        this.loading = false;
        this.router.navigate(['../'], { relativeTo: this.aRoute });
      },
      error: () => {
        this.alert.triggerError(
          'No hemos podido iniciar tu sesión.',
        );
        this.loading = false;
      },
    });
  };
}
