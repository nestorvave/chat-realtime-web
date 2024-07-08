import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";

export const messagesCase = () => {
  const getBySender = async (sender: string, recipient: string) => {
    try {
      const response = await axiosInstance.post(URLS.MESSAGES.GET_BY_BOTH, {
        sender,
        recipient,
      });
      return response.data;
    } catch (err: unknown) {
      throw new Error("Error en las credenciales");
    }
  };

  return { getBySender };
};
