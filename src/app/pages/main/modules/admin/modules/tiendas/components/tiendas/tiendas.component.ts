import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendasService } from 'src/app/core/api/tiendas.service';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ITienda } from 'src/app/shared/models/api/tiendas/tienda';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styles: [
  ]
})
export class TiendasComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  tiendas: ITienda[] = [];
  tienda!: ITienda;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private tiendaService: TiendasService
  ) {
    this.obtenerTiendas();
  }

  obtenerTiendas = () => {
    this.tiendaService.obtenerTiendas().subscribe({
      next: (response) => { this.tiendas = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarTiendaPorId = (id: number) => {
    this.tiendaService.eliminarTiendaPorId(id).subscribe({
      next: () => {
        this.obtenerTiendas();
        this.alert.triggerSuccess('Se ha eliminado el registro')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  gotToTienda = (id: number) => {
    this.router.navigate([id], { relativeTo: this.aRoute });
  }

  goToMenu = () => {
    this.router.navigate(['']);
  }
}
