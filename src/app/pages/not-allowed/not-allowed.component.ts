import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styles: [
  ],
})
export class NotAllowedComponent {
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,

  ) {}

  irAlInicio = () => {
    this.router.navigate([''], { relativeTo: this.aRoute });
  };
}
