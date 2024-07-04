"use client";
import React from "react";
import TextInput from "../components/text-input/text-input.component";
import Button from "../components/button/custom-button.component";
import { FcGoogle } from "react-icons/fc";
import { LayoutLoginRegister } from "../components/layout-login/layout-login.component";

export default function Login() {
  return (
    <LayoutLoginRegister>
      <section className="w-full gap-8 flex flex-col items-center h-[90vh] justify-center md:w-1/2">
        <h1 className="font-bold text-3xl">Realtime chat</h1>
        <h2 className="text-xl">Login</h2>
        <div className="w-2/3">
          <TextInput
            value={"fffddffdsfdffsdfsfsfsffdfsfdsf"}
            isRequired
            id="email"
            label="Correo"
            name="email"
            type="text"
            onChange={(e) => {}}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="w-2/3">
          <TextInput
            value={"fffddffdsfdffsdfsfsfsffdfsfdsf"}
            isRequired
            id="email"
            label="Correo"
            name="email"
            type="text"
            onChange={(e) => {}}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="w-1/2">
          <Button
            label="Sign In"
            id="sing-in-btn"
            onClick={() => {}}
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
            onClick={() => {}}
            variant="white"
            icon={<FcGoogle className="text-2xl" />}
          />
        </div>
      </section>
    </LayoutLoginRegister>
  );
}
