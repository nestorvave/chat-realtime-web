"use client";

import { auth } from "@/app/domain/use-cases/login/login.use-case";

import { signIn } from "next-auth/react";
import { useState } from "react";

export const useLogin = () => {
  const [payload, setPayload] = useState({ email: "", password: "" });

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onAuthCredentials = async () => {
    try {
      const response = await auth(payload);
   
    } catch (error) {}
  };

  const onAuthGoogle = async () => {
    console.log("-------");
    try {
      console.log("---ddddddd----");
      const user = await signIn();
      console.log(user);
    } catch (error) {}
  };

  return { onAuthCredentials, onAuthGoogle, onHandleChange, payload };
};
