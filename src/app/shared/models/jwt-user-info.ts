export interface IJwtUserInfo {
  id: number,
  email: string,
  nombreCompleto: string,
  exp: number,
}

export class JwtUserInfo implements IJwtUserInfo {
  constructor(
    public id = 0,
    public email = '',
    public nombreCompleto = '',
    public exp = 0,
  ) { }
}
