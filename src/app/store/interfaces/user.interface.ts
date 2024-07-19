import { IUser } from "@/app/domain/models/users/users.model";

export interface IUserRedux extends IUser {
  isLogged: boolean;
}

export const defaultValueUser: IUserRedux = {
  _id: "",
  name: "",
  email: "",
  isLogged: true,
  createdAt: "",
  updatedAt: "",
};
