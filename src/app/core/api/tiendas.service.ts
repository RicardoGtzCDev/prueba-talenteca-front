import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { ICrearClient } from 'src/app/shared/models/api/clientes/crear-cliente';
import { IJwtUserInfo } from 'src/app/shared/models/jwt-user-info';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  user: IJwtUserInfo;
  clientUrl: string = `${BASE_BACKEND_URL}/tiendas`

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
    this.authService.user$.subscribe({
      next: (value) => {this.user = value},
    });
  }

  crearCliente = (input: ICrearClient) => {
    return this.http.post(this.clientUrl, input);
  }

  obtenerClientes = () => {
    return this.http.get(this.clientUrl);
  }

  obtenerClientePorId = (id: number) => {
    return this.http.get(`${this.clientUrl}/id`);
  }

  actualizarClientePorId = (id: number, input: Partial<ICrearClient>) => {
    return this.http.patch(`${this.clientUrl}/id`, input);
  }

  eliminarClientePoId = (id: number) => {
    return this.http.delete(`${this.clientUrl}/id`);
  }
}
