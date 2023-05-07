export interface ILogin {
  user: string;
  pass: string;
}

export class Login implements ILogin {
  constructor(
    public user: string,
    public pass: string,
  ) {
    this.user = user;
    this.pass = pass;
  }
}
