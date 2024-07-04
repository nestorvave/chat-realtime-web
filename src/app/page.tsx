"use client";
import { LayoutLoginRegister } from "./components/layout-login/layout-login.component";
import TextInput from "./components/text-input/text-input.component";
import Button from "./components/button/custom-button.component";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <LayoutLoginRegister>
      <section className="flex h-[90vh] w-full flex-col items-center justify-center gap-8 md:w-5/12">
        <h1 className="text-3xl font-bold">Realtime chat</h1>
        <h2 className="text-xl">Register</h2>
        <div className="w-full">
          <TextInput
            value={"fffddffdsfdffsdfsfsfsffdfsfdsf"}
            isRequired
            id="name"
            label="Name"
            name="name"
            type="text"
            onChange={(e) => {}}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="w-full">
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
        <div className="w-full">
          <TextInput
            value={"fffddffdsfdffsdfsfsfsffdfsfdsf"}
            isRequired
            id="password"
            label="Contraseña"
            name="password"
            type="text"
            onChange={(e) => {}}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="w-full">
          <Button
            label="Sign up"
            id="sing-up-btn"
            onClick={() => {}}
            variant="main"
          />
        </div>
        <section className="flex w-full items-center justify-center">
          <div className="w-full border-t-2"></div>
          <div className="px-4">or</div>
          <div className="w-full border-t-2"></div>
        </section>
        <div className="w-full">
          <Button
            label="Sign Up with Gmail"
            id="sing-up-google-btn"
            onClick={signIn}
            variant="white"
            icon={<FcGoogle className="text-2xl" />}
          />
        </div>
      </section>
    </LayoutLoginRegister>
  );
}
