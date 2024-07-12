export interface IUserRedux {
  _id: string;
  name: string;
  email: string;
  isLogged: boolean;
}

export const defaultValueUser: IUserRedux = {
  _id: "",
  name: "",
  email: "",
  isLogged: true,
};
