import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import {
  ICreateConversation,
  IConversation,
} from "../../models/conversations/conversations.model";

export const conversationsCase = () => {
  const create = async (
    payload: ICreateConversation,
  ): Promise<IConversation> => {
    try {
      const response = await axiosInstance.post<IConversation>(
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
      const response = await axiosInstance.get<IConversation[]>(
        `${URLS.CONVERSATIONS.CREATE}/${_id}`,
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("ffdf");
    }
  };

  return { create, getConversationByUser };
};
