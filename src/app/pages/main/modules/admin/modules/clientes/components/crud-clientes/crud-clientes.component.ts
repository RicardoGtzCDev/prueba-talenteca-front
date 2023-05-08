import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/core/api/clientes.service';
import { URL_PARAMS } from 'src/app/core/constants';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ICrearCliente } from 'src/app/shared/models/api/clientes/crear-cliente';

@Component({
  selector: 'app-crud-clientes',
  templateUrl: './crud-clientes.component.html',
  styles: [
  ]
})
export class CrudClientesComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  urlClientId: number;

  clienteForm = this.fb.group({
    email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] },),
    nombre: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    apellidoPaterno: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    apellidoMaterno: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    direccion: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });

  passwordForm = this.fb.control('', { nonNullable: true });

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientesService
  ) {
    this.urlClientId = Number(this.aRoute.snapshot.params[URL_PARAMS.id]);
    if (isNaN(this.urlClientId)) {
      this.router.navigate(['../'], { relativeTo: this.aRoute });
    }
    if (this.urlClientId !== 0) {
      this.clientService.obtenerClientePorId(this.urlClientId).subscribe({
        next: (response) => {
          const { id, ...formValues } = response;
          this.clienteForm.setValue(formValues);
        },
        error: () => { this.alert.triggerError('Algo ha salido mal') }
      })
    }
  }

  crearCliente = () => {
    const data: ICrearCliente = {
      ...this.clienteForm.getRawValue(),
      contraseña: this.passwordForm.getRawValue(),
    };
    this.clientService.crearCliente(data).subscribe({
      next: () => { this.router.navigate(['../'], { relativeTo: this.aRoute })},
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  actualizarCliente = () => {
    const data: Partial<ICrearCliente> = this.clienteForm.getRawValue();
    this.clientService.actualizarClientePorId(this.urlClientId, data).subscribe({
      next: (response) => {
        const { id, ...formValues } = response;
        this.clienteForm.setValue(formValues);
        this.alert.triggerSuccess('Actualizado Correctamente')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarCliente = () => {
    this.clientService.eliminarClientePorId(this.urlClientId).subscribe({
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
