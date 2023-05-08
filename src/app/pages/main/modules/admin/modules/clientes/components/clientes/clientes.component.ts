import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/core/api/clientes.service';
import { AlertComponent } from 'src/app/shared/components/atoms/alert/alert.component';
import { ICliente } from 'src/app/shared/models/api/clientes/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent {
  @ViewChild(AlertComponent) alert!: AlertComponent;

  clientes: ICliente[] = [];
  cliente!: ICliente;

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private clientService: ClientesService
  ) {
    this.obtenerClientes();
  }

  obtenerClientes = () => {
    this.clientService.obtenerClientes().subscribe({
      next: (response) => { this.clientes = response; },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  eliminarClientePorId = (id: number) => {
    this.clientService.eliminarClientePorId(id).subscribe({
      next: () => {
        this.obtenerClientes();
        this.alert.triggerSuccess('Se ha eliminado el registro')
      },
      error: () => { this.alert.triggerError('Algo ha salido mal') }
    });
  }

  gotToClient = (id: number) => {
    this.router.navigate([id], { relativeTo: this.aRoute });
  }

  goToMenu = () => {
    this.router.navigate(['']);
  }
}
