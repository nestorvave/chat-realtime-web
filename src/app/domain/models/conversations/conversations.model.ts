import { IUser } from "../users/users.model";

export interface IGetConversation {
  owner: string;
  recipient: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  last_message?: string;
}
export interface ICreateConversation {
  owner: string;
  recipient: string;
}

export interface IAllConversations {
  _id: string;
  recipient: IUser;
  owner: IUser;
  last_message: string;
  createdAt: string;
  updatedAt: string;
}
