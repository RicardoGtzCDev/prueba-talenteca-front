import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BASE_BACKEND_URL } from 'src/app/core/constants';
import { IArticulo } from 'src/app/shared/models/api/articulos/articulo';
import { ICrearArticulo } from 'src/app/shared/models/api/articulos/crear-articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  token: string
  artUrl: string = `${BASE_BACKEND_URL}/articulos`
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

  crearArticulo = (input: ICrearArticulo) => {
    return this.http.post<IArticulo>(this.artUrl, input, { headers: this.authHeader });
  }

  obtenerArticulos = () => {
    return this.http.get<IArticulo[]>(this.artUrl, { headers: this.authHeader });
  }

  obtenerArticuloPorId = (id: number) => {
    return this.http.get<IArticulo>(`${this.artUrl}/${id}`, { headers: this.authHeader });
  }

  actualizarArticuloPorId = (id: number, input: Partial<ICrearArticulo>) => {
    return this.http.patch<IArticulo>(`${this.artUrl}/${id}`, input, { headers: this.authHeader });
  }

  eliminarArticuloPorId = (id: number) => {
    return this.http.delete(`${this.artUrl}/${id}`, { headers: this.authHeader });
  }
}
