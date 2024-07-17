export interface ILogin {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  token: string;
}

export interface IPostLogin {
  email: string;
  password: string;
}
