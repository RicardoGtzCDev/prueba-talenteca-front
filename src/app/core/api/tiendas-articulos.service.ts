import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { ICrearTiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/crear-tienda-articulo';
import { ITiendaArticulo } from 'src/app/shared/models/api/tiendas-articulos/tienda-articulo';

@Injectable({
  providedIn: 'root'
})
export class TiendaArticulosService {

  token: string
  tiendaArticuloUrl: string = `${BASE_BACKEND_URL}/tiendasarticulos`
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

  crearTiendaArticulo = (input: ICrearTiendaArticulo) => {
    return this.http.post<ITiendaArticulo>(this.tiendaArticuloUrl, input, { headers: this.authHeader });
  }

  obtenerTiendasArticulos = () => {
    return this.http.get<ITiendaArticulo[]>(this.tiendaArticuloUrl, { headers: this.authHeader });
  }

  obtenerTiendaArticuloPorId = (id: number) => {
    return this.http.get<ITiendaArticulo>(`${this.tiendaArticuloUrl}/${id}`, { headers: this.authHeader });
  }

  eliminarTiendaArticuloPorId = (id: number) => {
    return this.http.delete(`${this.tiendaArticuloUrl}/${id}`, { headers: this.authHeader });
  }
}
