import { IArticulo } from "src/app/shared/models/api/articulos/articulo";
import { ITienda } from "src/app/shared/models/api/tiendas/tienda";

export interface ITiendaArticulo {
    id: number,
    tienda: ITienda,
    articulo: IArticulo,
    fecha: Date,
}
