import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import { IRoom } from "../../models/rooms/rooms.model";

export const roomsCase = () => {
  const getRooms = async (id: string): Promise<IRoom[]> => {
    try {
      const response = await axiosInstance.get<IRoom[]>(
        `/${URLS.ROOMS.BASE}/${id}`,
      );
      return response.data;
    } catch (err: unknown) {
      throw new Error("Error ");
    }
  };

  return { getRooms };
};
