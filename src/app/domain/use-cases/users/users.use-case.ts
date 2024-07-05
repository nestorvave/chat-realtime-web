import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/api/tools/api";

export const usersCase = () => {
  const createUser = async (payload: any) => {
    try {
      const response = await axiosInstance.post(URLS.USERS.CREATE, payload);
      return { response };
    } catch (err: unknown) {
      return { errors: "Error en las credenciales" };
    }
  };

  return { createUser };
};
