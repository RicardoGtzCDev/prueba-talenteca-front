import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { ICrearTienda } from 'src/app/shared/models/api/tiendas/crear-tienda';
import { ITienda } from 'src/app/shared/models/api/tiendas/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  token: string
  tiendaUrl: string = `${BASE_BACKEND_URL}/tiendas`
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

  crearTienda = (input: ICrearTienda) => {
    return this.http.post<ITienda>(this.tiendaUrl, input, { headers: this.authHeader });
  }

  obtenerTiendas = () => {
    return this.http.get<ITienda[]>(this.tiendaUrl, { headers: this.authHeader });
  }

  obtenerTiendaPorId = (id: number) => {
    return this.http.get<ITienda>(`${this.tiendaUrl}/${id}`, { headers: this.authHeader });
  }

  actualizarTiendaPorId = (id: number, input: Partial<ICrearTienda>) => {
    return this.http.patch<ITienda>(`${this.tiendaUrl}/${id}`, input, { headers: this.authHeader });
  }

  eliminarTiendaPorId = (id: number) => {
    return this.http.delete(`${this.tiendaUrl}/${id}`, { headers: this.authHeader });
  }
}
