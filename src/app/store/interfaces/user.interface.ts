import { IUser } from "@/app/domain/models/users/users.model";
import { useSession } from "next-auth/react";

export interface IUserRedux extends IUser {
  isLogged: boolean;
}

export const defaultValueUser: IUserRedux = {
  _id: "",
  name: "",
  email: "",
  isLogged: false,
  createdAt: "",
  updatedAt: "",
  avatarUrl: "",
};
