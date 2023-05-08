import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ArticulosService } from 'src/app/core/api/articulos.service';
import { ClienteArticulosService } from 'src/app/core/api/clientes-articulos.service';
import { TiendaArticulosService } from 'src/app/core/api/tiendas-articulos.service';
import { TiendasService } from 'src/app/core/api/tiendas.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { URL_PARAMS } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { IArticulo } from 'src/app/shared/models/api/articulos/articulo';
import { ICrearArticulo } from 'src/app/shared/models/api/articulos/crear-articulo';
import { ICrearClienteArticulo } from 'src/app/shared/models/api/clientes-articulos/crear-cliente-articulo';
import { ITiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/tienda-articulo';
import { ITienda } from 'src/app/shared/models/api/tiendas/tienda';
import { IJwtUserInfo } from 'src/app/shared/models/jwt-user-info';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: [
  ]
})
export class StoreComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  urlTiendatId: number;

  tienda!: ITienda;
  tiendaArticulos: ITiendaArticulo[] = [];

  cart: IArticulo[] = [];

  price: number = 0;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private authService: AuthService,
    private tiendaService: TiendasService,
    private tiendaArticulosService: TiendaArticulosService,
    private clienteArticuloService: ClienteArticulosService,
    private articuloService: ArticulosService,
  ) {
    this.urlTiendatId = Number(this.aRoute.snapshot.params[URL_PARAMS.id]);
    this.obtenerTiendaPorId();
    this.obtenerTiendaArticulos();
  }

  obtenerTiendaPorId = () => {
    this.tiendaService.obtenerTiendaPorId(this.urlTiendatId).subscribe({
      next: (response) => {
        this.tienda = response;
      },
      error: () => { },
    });
  }

  obtenerTiendaArticulos = () => {
    this.tiendaArticulosService.obtenerTiendasArticulos().subscribe({
      next: (response) => {
        this.tiendaArticulos = response.filter(ta => ta.tienda.id === this.urlTiendatId)
      },
      error: () => { }
    });
  };

  onAddToCart = (articulo: IArticulo) => {
    this.price = 0;
    this.cart.push(articulo)
    this.cart.forEach(c => {
      this.price += c.precio;
    });
  }

  buy = () => {
    const cliente: IJwtUserInfo = this.authService.getUser();
    const requests = this.cart.map(c => {
      const data: ICrearClienteArticulo = {
        clienteId: cliente.id,
        articuloId: c.id,
      }
      return this.clienteArticuloService.crearClienteArticulo(data);
    });

    forkJoin(requests).subscribe({
      next: () => {
        this.actualizaStock();
        this.alert.triggerSuccess('Compra completada')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  actualizaStock = () => {
    type STOCK = { articulo: IArticulo, cantidad: number }
    const stocks: STOCK[] = [];
    this.cart.forEach(c => {
      const stock = stocks.find(s => s.articulo.id === c.id);
      if (stock) {
        stock.cantidad += 1;
      } else {
        stocks.push({ articulo: c, cantidad: 1 })
      }
    });
    stocks.forEach(s => {
       const data: Partial<ICrearArticulo> = {
        stock: s.articulo.stock - s.cantidad,
      }
      this.articuloService.actualizarArticuloPorId(s.articulo.id, data).subscribe({
        next: () => {},
        error: () => {},
      });
    });
    this.cart = [];
    this.price = 0;
    this.obtenerTiendaArticulos();
  }

  goToMenu = () => {
    this.router.navigate(['../'], { relativeTo: this.aRoute });
  }
}
