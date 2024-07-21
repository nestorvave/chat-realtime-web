import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";

export const roomsCase = () => {
  const createRoom = async (payload: any) => {
    try {
      const response = await axiosInstance.post(URLS.ROOMS.BASE, payload);
      return response.data;
    } catch (err: unknown) {
      throw new Error("Error en las credenciales");
    }
  };

  return { createRoom };
};
