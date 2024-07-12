export interface ILogin {
  _id: string;
  name: string;
  email: string;
  token: string;
}
export interface IPostLogin {
  email: string;
  password: string;
}
