import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/core/api/clientes.service';
import { ICliente } from 'src/app/shared/models/api/clientes/cliente';
import { ICrearClient } from 'src/app/shared/models/api/clientes/crear-cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent {
  clientes: ICliente[] = [];
  cliente!: ICliente;

  clienteForm = this.fb.group({
    email: this.fb.control('', { nonNullable: true }),
    contraseña: this.fb.control('', { nonNullable: true }),
    nombre: this.fb.control('', { nonNullable: true }),
    apellidoPaterno: this.fb.control('', { nonNullable: true }),
    apellidoMaterno: this.fb.control('', { nonNullable: true }),
    direccion: this.fb.control('', { nonNullable: true }),
  });

  constructor(
    private fb: FormBuilder,
    private clientService: ClientesService
  ) {
    this.obtenerClientes();
  }

  obtenerClientes = () => {
    this.clientService.obtenerClientes().subscribe({
      next: (response) => { this.clientes = response; }
    });
  }

  otenerClientePorId = (id: number) => {
    this.clientService.obtenerClientePorId(id).subscribe({
      next: (response) => { this.cliente = response; }
    });
  }

  actualizarClientePorId = (id: number) => {
    const data: Partial<ICrearClient> = this.clienteForm.getRawValue();

    this.clientService.actualizarClientePorId(id, data).subscribe({
      next: (response) => { this.cliente = response; }
    });
  }
}
