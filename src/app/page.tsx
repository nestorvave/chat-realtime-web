"use client";
import { LayoutLoginRegister } from "./components/layout-login/layout-login.component";
import TextInput from "./components/text-input/text-input.component";
import Button from "./components/button/custom-button.component";
import { FaGoogle } from "react-icons/fa";

import { useLogin } from "./hooks/useLogin";
import Link from "next/link";

export default function Home() {
  const { onAuthCredentials, onAuthGoogle, onHandleChange, payload } =
    useLogin();
  const { email, password } = payload;
  return (
    <LayoutLoginRegister>
      <section className="text-cente flex flex-col items-center justify-center gap-6 p-16 text-white">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <h2 className="text-xlr">
            Sign in to your account or create a new one.
          </h2>
          <div className="w-full">
            <Button
              label="Sign In with Gmail"
              id="sing-in-google-btn"
              onClick={onAuthGoogle}
              variant="dark"
              icon={<FaGoogle className="text-xl text-white" />}
            />
          </div>
        </div>
        <section className="flex w-full items-center justify-center">
          <div className="w-full border-t-2 border-gray-600"></div>
          <div className="px-4">or</div>
          <div className="w-full border-t-2 border-gray-600"></div>
        </section>

        <div className="w-full">
          <TextInput
            value={email}
            isRequired
            id="email"
            label="Email"
            name="email"
            type="text"
            onChange={(e) => onHandleChange(e)}
            placeholder="m@example.com"
          />
        </div>
        <div className="w-full">
          <TextInput
            value={password}
            isRequired
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => onHandleChange(e)}
            placeholder=""
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onAuthCredentials();
              }
            }}
          />
        </div>
        <div className="w-full">
          <Button
            label="Sign in"
            id="sing-in-btn"
            onClick={onAuthCredentials}
            variant="white"
          />
        </div>
        <div className="text-muted-foreground text-center text-sm">
          Don't have an account?
          <Link href="/register" className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </section>
    </LayoutLoginRegister>
  );
}
