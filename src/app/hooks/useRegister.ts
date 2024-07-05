"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { registerCase } from "../domain/use-cases/register/register.use-case";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setUser } from "../store/modules/user.module";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { registerUser } = registerCase();
  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onAuthCredentials = async () => {
    try {
      const response = await registerUser(payload);
      if (response) {
        
        console.log(response);
        const { token, name, email, _id } = response;
        dispatch(setUser({ name, email, _id, isLogged: true }));
        setCookie("token", token);
        router.push("/chat");
      }
    } catch (error) {}
  };

  const onAuthGoogle = async () => {
    try {
      const user = await signIn();
    } catch (error) {}
  };

  return { onAuthCredentials, onAuthGoogle, onHandleChange, payload };
};
