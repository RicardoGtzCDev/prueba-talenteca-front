import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from 'src/app/core/api/articulos.service';
import { TiendaArticulosService } from 'src/app/core/api/tiendas-articulos.service';
import { TiendasService } from 'src/app/core/api/tiendas.service';
import { URL_PARAMS } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { IArticulo } from 'src/app/shared/models/api/articulos/articulo';
import { ICrearTiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/crear-tienda-articulo';
import { ITiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/tienda-articulo';
import { ICrearTienda } from 'src/app/shared/models/api/tiendas/crear-tienda';

@Component({
  selector: 'app-crud-tiendas',
  templateUrl: './crud-tiendas.component.html',
  styles: [
  ]
})
export class CrudTiendasComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  urlTiendatId: number;

  tiendaForm = this.fb.group({
    sucursal: this.fb.control('', { nonNullable: true, validators: [Validators.required] },),
    direccion: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });

  articulos: IArticulo[] = [];
  tiendasArticulos: ITiendaArticulo[] = [];

  mostrarTiendaArticulos: boolean = false;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tiendaService: TiendasService,
    private artService: ArticulosService,
    private tiendaArticuloService: TiendaArticulosService,
  ) {
    this.urlTiendatId = Number(this.aRoute.snapshot.params[URL_PARAMS.id]);
    if (isNaN(this.urlTiendatId)) {
      this.router.navigate(['../'], { relativeTo: this.aRoute });
    }
    if (this.urlTiendatId !== 0) {
      this.tiendaService.obtenerTiendaPorId(this.urlTiendatId).subscribe({
        next: (response) => {
          const { id, ...formValues } = response;
          this.tiendaForm.setValue(formValues);
        },
        error: () => { this.alert.triggerError('Algo ha salido mal') }
      })
    }
    this.obtenerArticulos();
    this.obtenerTiendasArticulos();
  }

  crearTienda = () => {
    const data: ICrearTienda = this.tiendaForm.getRawValue();
    this.tiendaService.crearTienda(data).subscribe({
      next: () => { this.router.navigate(['../'], { relativeTo: this.aRoute }) },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  actualizarTienda = () => {
    const data: Partial<ICrearTienda> = this.tiendaForm.getRawValue();
    this.tiendaService.actualizarTiendaPorId(this.urlTiendatId, data).subscribe({
      next: (response) => {
        const { id, ...formValues } = response;
        this.tiendaForm.setValue(formValues);
        this.alert.triggerSuccess('Actualizado Correctamente')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarTienda = () => {
    this.tiendaService.eliminarTiendaPorId(this.urlTiendatId).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.aRoute });
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  cancelar = () => {
    this.router.navigate(['../'], { relativeTo: this.aRoute });
  }

  obtenerArticulos = () => {
    this.artService.obtenerArticulos().subscribe({
      next: (response) => { this.articulos = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  obtenerTiendasArticulos = () => {
    this.tiendaArticuloService.obtenerTiendasArticulos().subscribe({
      next: (response) => { this.tiendasArticulos = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  isRelated(idArticulo: number) {
    let related: boolean = false;
    console.log(this.tiendasArticulos, idArticulo);
    related = this.tiendasArticulos.some(ta => ta.articulo.id === idArticulo && ta.tienda.id === this.urlTiendatId)
    return related;
  }

  onChangeCheck(idArticulo: number, checked: boolean) {
    if (checked) {
      const data: ICrearTiendaArticulo = {
        tiendaId: this.urlTiendatId,
        articuloId: idArticulo
      }
      this.tiendaArticuloService.crearTiendaArticulo(data).subscribe({
        next: () => {
          this.obtenerTiendasArticulos();
          this.alert.triggerSuccess('Actualizado Correctamente')
        },
        error: () => { this.alert.triggerError('Algo ha salido mal'); }
      });
    } else {
      const tiendaArticulo = this.tiendasArticulos
        .find(ta => ta.articulo.id === idArticulo && ta.tienda.id === this.urlTiendatId);
      if (tiendaArticulo) {
        this.tiendaArticuloService.eliminarTiendaArticuloPorId(tiendaArticulo.id).subscribe({
          next: () => {
            this.obtenerTiendasArticulos();
            this.alert.triggerSuccess('Actualizado Correctamente')
          },
          error: () => { this.alert.triggerError('Algo ha salido mal'); }
        });
      } else {
        this.alert.triggerError('Algo ha salido mal');
      }

    }
  }
}
