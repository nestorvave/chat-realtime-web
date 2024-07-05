export interface IUser {
  _id: string;
  name: string;
  email: string;
  isLogged: boolean;
}

export const defaultValueUser: IUser = {
  _id: "",
  name: "",
  email: "",
  isLogged: true,
};
