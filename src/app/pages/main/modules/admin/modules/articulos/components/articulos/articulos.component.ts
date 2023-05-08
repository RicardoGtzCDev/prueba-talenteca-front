import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from 'src/app/core/api/articulos.service';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { IArticulo } from 'src/app/shared/models/api/articulos/articulo';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: [
  ]
})
export class ArticulosComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  articulos: IArticulo[] = [];
  articulo!: IArticulo;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private artService: ArticulosService
  ) {
    this.obtenerArticulos();
  }

  obtenerArticulos = () => {
    this.artService.obtenerArticulos().subscribe({
      next: (response) => { this.articulos = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarArticuloPorId = (id: number) => {
    this.artService.eliminarArticuloPorId(id).subscribe({
      next: () => {
        this.obtenerArticulos();
        this.alert.triggerSuccess('Se ha eliminado el registro')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  gotToArt = (id: number) => {
    this.router.navigate([id], { relativeTo: this.aRoute });
  }

  goToMenu = () => {
    this.router.navigate(['']);
  }
}
