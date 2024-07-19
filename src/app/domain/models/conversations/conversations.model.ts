import { IUser } from "../users/users.model";

export interface IConversation {
  _id: string;
  createdAt: string;
  last_message?: string;
  owner: IUser;
  recipient: IUser;
  updatedAt: string;
}
export interface ICreateConversation {
  owner: string;
  recipient: string;
}


