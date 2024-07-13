import { IUser } from "../users/users.model";

export interface ICreateConversation {
  owner: IUser;
  recipient: IUser;
  _id: string;
  createdAt: string;
  updatedAt: string;
  last_message?: string;
}
export interface IPayloadConversation {
  owner: string;
  recipient: string;
}
