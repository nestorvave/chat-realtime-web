import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";
import { ILogin, IPostLogin } from "../../models/login/login.model";

export const auth = async (payload: IPostLogin): Promise<ILogin> => {
  try {
    const response = await axiosInstance.post(URLS.AUTH.LOGIN, payload);
    return response.data;
  } catch (err: unknown) {
    throw new Error("Error al loggear el usuario");
  }
};
