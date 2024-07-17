import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import { IMessage } from "../../models/messages/messages.model";

export const messagesCase = () => {

  const getByConversation = async (
    conversation_id: string,
  ): Promise<IMessage[]> => {
    try {
      const response = await axiosInstance.get<IMessage[]>(
        `${URLS.MESSAGES.BASE}/${conversation_id}`,
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("Error en las credenciales");
    }
  };

  return { getByConversation };
};
