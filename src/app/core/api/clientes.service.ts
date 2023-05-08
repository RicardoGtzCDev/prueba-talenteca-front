import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { ICliente } from 'src/app/shared/models/api/clientes/cliente';
import { ICrearCliente } from 'src/app/shared/models/api/clientes/crear-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  token: string
  clientUrl: string = `${BASE_BACKEND_URL}/clientes`
  authHeader!: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.token = this.authService.getToken();
    this.authHeader = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.authService.token$.subscribe({
      next: (value) => {
        this.token = value;
        this.authHeader = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
      }
    });
  }

  crearCliente = (input: ICrearCliente) => {
    return this.http.post<ICliente>(this.clientUrl, input, { headers: this.authHeader });
  }

  obtenerClientes = () => {
    return this.http.get<ICliente[]>(this.clientUrl, { headers: this.authHeader });
  }

  obtenerClientePorId = (id: number) => {
    return this.http.get<ICliente>(`${this.clientUrl}/${id}`, { headers: this.authHeader });
  }

  actualizarClientePorId = (id: number, input: Partial<ICrearCliente>) => {
    return this.http.patch<ICliente>(`${this.clientUrl}/${id}`, input, { headers: this.authHeader });
  }

  eliminarClientePorId = (id: number) => {
    return this.http.delete(`${this.clientUrl}/${id}`, { headers: this.authHeader });
  }

}
