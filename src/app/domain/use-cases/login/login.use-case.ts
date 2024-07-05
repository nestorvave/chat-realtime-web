import URLS from "@/app/api/constants/url.constants";
import { axiosInstance } from "@/app/api/tools/api";


export const auth = async (payload: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(URLS.AUTH.LOGIN, payload);
    return response.data;
  } catch (err: unknown) {
    return { errors: "Error en las credenciales" };
  }
};
