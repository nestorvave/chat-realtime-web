export const defaultValueSelectedChat: {
  _id: string;
  name: string;
  avatarUrl?: string;
  isRoom: boolean;
  recipient?: string | string[];
  recipients?: {
    _id: string;
    name: string;
    avatarUrl?: string;
    isRoom: boolean;
  }[];
} = {
  _id: "",
  name: "",
  isRoom: false,
};
