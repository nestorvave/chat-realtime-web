import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import { IUser } from "../../models/users/users.model";



export const usersCase = () => {
  const createUser = async (payload: any) => {
    try {
      const response = await axiosInstance.post(URLS.USERS.CREATE, payload);
      return { response };
    } catch (err: unknown) {
      return { errors: "Error en las credenciales" };
    }
  };

  const getAllUsers = async (): Promise<IUser[]> => {
    try {
      const response = await axiosInstance.get(URLS.USERS.CREATE);
      return response.data;
    } catch (err: unknown) {
      throw new Error("Error al obtener usuarios");
    }
  };

  return { createUser, getAllUsers };
};
