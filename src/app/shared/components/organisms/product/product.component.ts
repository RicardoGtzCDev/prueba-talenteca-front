import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ArticulosService } from 'src/app/core/api/articulos.service';
import { IArticulo } from 'src/app/shared/models/api/articulos/articulo';
import { ITiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/tienda-articulo';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnChanges {
  @Input() tiendaArticulo!: ITiendaArticulo;
  @Output() addToCart = new EventEmitter<IArticulo>();

  articulo!: IArticulo;

  constructor(
    private artService: ArticulosService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tiendaArticulo']) {
      const newValue: IArticulo = changes['tiendaArticulo'].currentValue;
      const oldValue: IArticulo = changes['tiendaArticulo'].previousValue;
      if (newValue !== oldValue) {
        this.obtenerTiendaArticulo();
      }
    }
  }

  obtenerTiendaArticulo = () => {
    this.artService.obtenerArticuloPorId(this.tiendaArticulo.articulo.id).subscribe({
      next: (response) => { this.articulo = response; },
      error: () => {}, 
    });
  }

  add = (articulo: IArticulo) => {
    this.addToCart.emit(articulo);
  }
}
