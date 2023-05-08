import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { IClienteArticulo } from 'src/app/shared/models/api/clientes-articulos/cliente-articulo';
import { ICrearClienteArticulo } from 'src/app/shared/models/api/clientes-articulos/crear-cliente-articulo';

@Injectable({
  providedIn: 'root'
})
export class ClienteArticulosService {
  token: string
  clienteArticuloUrl: string = `${BASE_BACKEND_URL}/clientesarticulos`
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

  crearClienteArticulo = (input: ICrearClienteArticulo) => {
    return this.http.post<IClienteArticulo>(this.clienteArticuloUrl, input, { headers: this.authHeader });
  }

  obtenerClienteArticulos = () => {
    return this.http.get<IClienteArticulo[]>(this.clienteArticuloUrl, { headers: this.authHeader });
  }

  obtenerClienteArticuloPorId = (id: number) => {
    return this.http.get<IClienteArticulo>(`${this.clienteArticuloUrl}/${id}`, { headers: this.authHeader });
  }

  eliminarClienteArticuloPorId = (id: number) => {
    return this.http.delete(`${this.clienteArticuloUrl}/${id}`, { headers: this.authHeader });
  }
}
