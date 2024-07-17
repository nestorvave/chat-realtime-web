export interface IMessage {
  _id: string;
  owner: string;
  recipient: string;
  message: string;
  conversation_id: string;
  createdAt: string;
  updatedAt: string;
}
