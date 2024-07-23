import { IUser } from "@/app/domain/models/users/users.model";

export const defaultValueSelectedChat: {
  _id: string;
  name: string;
  avatarUrl?: string;
  isRoom: boolean;
} = {
  _id: "",
  name: "",
  isRoom: false,
};
