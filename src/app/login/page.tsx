"use client";
import React from "react";
import TextInput from "../components/text-input/text-input.component";
import Button from "../components/button/custom-button.component";
import { FcGoogle } from "react-icons/fc";
import { LayoutLoginRegister } from "../components/layout-login/layout-login.component";
import { useLogin } from "./hooks/useLogin";
import { useSession } from "next-auth/react";

export default function Login() {
  const { onAuthCredentials, onAuthGoogle, onHandleChange, payload } =
    useLogin();
  const { email, password } = payload;
 

  return (
    <LayoutLoginRegister>
      <section className="flex h-[90vh] w-full flex-col items-center justify-center gap-8 md:w-1/2">
        <h1 className="text-3xl font-bold">Realtime chat</h1>
        <h2 className="text-xl">Login</h2>
        <div className="w-2/3">
          <TextInput
            value={email}
            isRequired
            id="email"
            label="Correo"
            name="email"
            type="text"
            onChange={(e) => onHandleChange(e)}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="w-2/3">
          <TextInput
            value={password}
            isRequired
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            onChange={(e) => onHandleChange(e)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <div className="w-1/2">
          <Button
            label="Sign In"
            id="sing-in-btn"
            onClick={onAuthCredentials}
            variant="main"
          />
        </div>
        <section className="flex w-1/2 items-center justify-center">
          <div className="w-full border-t-2"></div>
          <div className="px-4">or</div>
          <div className="w-full border-t-2"></div>
        </section>
        <div className="w-1/2">
          <Button
            label="Sign In with Gmail"
            id="sing-in-google-btn"
            onClick={onAuthGoogle}
            variant="white"
            icon={<FcGoogle className="text-2xl" />}
          />
        </div>
      </section>
    </LayoutLoginRegister>
  );
}
