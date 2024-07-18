import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import {
  IGetConversation,
  ICreateConversation,
  IAllConversations,
} from "../../models/conversations/conversations.model";

export const conversationsCase = () => {
  const create = async (
    payload: ICreateConversation,
  ): Promise<IGetConversation> => {
    try {
      const response = await axiosInstance.post<IGetConversation>(
        URLS.CONVERSATIONS.CREATE,
        payload,
      );
  
      return response.data;
    } catch (err: unknown) {
      throw new Error("ffdf");
    }
  };

  const getConversationByUser = async (_id: string) => {
    try {
      const response = await axiosInstance.get<IAllConversations[]>(
        `${URLS.CONVERSATIONS.CREATE}/${_id}`,
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("ffdf");
    }
  };

  return { create, getConversationByUser };
};
