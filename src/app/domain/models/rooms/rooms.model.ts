import { IUser } from "../users/users.model";

export interface IRoom {
  _id: string;
  name: string;
  users: IUser[];
  owner: IUser;
  createdAt: string;
  updatedAt: string;
}
