import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import {
  ICreateConversation,
  IPayloadConversation,
} from "../../models/conversations/conversations.model";

export const conversationsCase = () => {
  const create = async (payload: IPayloadConversation) => {
    try {
      const response = await axiosInstance.post<ICreateConversation>(
        URLS.CONVERSATIONS.CREATE,
        payload,
      );
      console.log("here", response.data);
      return response.data;
    } catch (err: unknown) {
      throw new Error("ffdf");
    }
  };

  const getConversationByUser = async (_id: string) => {
    try {
      const response = await axiosInstance.get<ICreateConversation[]>(
        `${URLS.CONVERSATIONS.CREATE}/${_id}`,
      );
      console.log("here", response.data);
      return response.data;
    } catch (err: unknown) {
      throw new Error("ffdf");
    }
  };

  return { create, getConversationByUser };
};
