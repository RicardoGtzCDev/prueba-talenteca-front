import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from 'src/app/core/api/articulos.service';
import { URL_PARAMS } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ICrearArticulo } from 'src/app/shared/models/api/articulos/crear-articulo';

@Component({
  selector: 'app-crud-articulo',
  templateUrl: './crud-articulo.component.html',
  styles: [
  ]
})
export class CrudArticuloComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  urlArtId: number;

  articuloForm = this.fb.group({
    codigo: this.fb.control('', { nonNullable: true, validators: [Validators.required] },),
    descripcion: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    precio: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
    imagen: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    stock: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private arttService: ArticulosService
  ) {
    this.urlArtId = Number(this.aRoute.snapshot.params[URL_PARAMS.id]);
    console.log(this.urlArtId);
    if (isNaN(this.urlArtId)) {
      this.router.navigate(['../'], { relativeTo: this.aRoute });
    }
    if (this.urlArtId !== 0) {
      this.arttService.obtenerArticuloPorId(this.urlArtId).subscribe({
        next: (response) => {
          const { id, ...formValues } = response;
          this.articuloForm.setValue(formValues);
        },
        error: () => { this.alert.triggerError('Algo ha salido mal') }
      })
    }
  }

  crearArticulo = () => {
    const data: ICrearArticulo = this.articuloForm.getRawValue();
    this.arttService.crearArticulo(data).subscribe({
      next: () => { this.router.navigate(['../'], { relativeTo: this.aRoute }) },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  actualizarArticulo = () => {
    const data: Partial<ICrearArticulo> = this.articuloForm.getRawValue();
    this.arttService.actualizarArticuloPorId(this.urlArtId, data).subscribe({
      next: (response) => {
        const { id, ...formValues } = response;
        this.articuloForm.setValue(formValues);
        this.alert.triggerSuccess('Actualizado Correctamente')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarArticulo = () => {
    this.arttService.eliminarArticuloPorId(this.urlArtId).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.aRoute });
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  cancelar = () => {
    this.router.navigate(['../'], { relativeTo: this.aRoute });
  }
}
