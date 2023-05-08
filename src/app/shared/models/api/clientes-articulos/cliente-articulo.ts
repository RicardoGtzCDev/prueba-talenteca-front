import { IArticulo } from "src/app/shared/models/api/articulos/articulo";
import { ICliente } from "src/app/shared/models/api/clientes/cliente";

export interface IClienteArticulo {
    id: number,
    cliente: ICliente,
    articulo: IArticulo,
    fecha: Date,
}
