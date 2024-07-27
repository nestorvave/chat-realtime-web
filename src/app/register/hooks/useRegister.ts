"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/app/store/modules/user.module";
import { registerCase } from "@/app/domain/use-cases/register/register.use-case";
import { IACase } from "@/app/domain/use-cases/ia/ia.use-case";

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { suggestionUser } = IACase();
  const { registerUser } = registerCase();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rotated, setRotated] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onAuthCredentials = async () => {
    try {
      const response = await registerUser(payload);
      if (response) {
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

  const onBlur = async () => {
    setRotated(true);
    if (payload.email) {
      try {
        const response = await suggestionUser(payload.email, suggestions);
        setSuggestions(response.split("/"));
      } catch (error) {
      } finally {
        setRotated(false);
      }
    }
  };

  const suggestionSelected = (user: string) => {
    setPayload({ ...payload, name: user });
    setSuggestions([]);
  };

  return {
    onAuthCredentials,
    onAuthGoogle,
    onBlur,
    onHandleChange,
    payload,
    suggestions,
    suggestionSelected,
    rotated,
  };
};
