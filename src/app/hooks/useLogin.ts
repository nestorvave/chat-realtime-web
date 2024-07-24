"use client";

import { auth } from "@/app/domain/use-cases/login/login.use-case";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/modules/user.module";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { IPostLogin } from "../domain/models/login/login.model";

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [payload, setPayload] = useState<IPostLogin>({
    email: "",
    password: "",
  });

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onAuthCredentials = async (): Promise<void> => {
    try {
      const response = await auth(payload);
      dispatch(setUser({ ...response, isLogged: true }));
      setCookie("token", response.token);
      router.push("/chat");
    } catch (error) {}
  };

  const onAuthGoogle = async (): Promise<void> => {
    try {
      await signIn();
      router.push("/chat");
    } catch (error) {}
  };

  return { onAuthCredentials, onAuthGoogle, onHandleChange, payload };
};
