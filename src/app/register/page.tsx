"use client";
import React from "react";
import TextInput from "../components/text-input/text-input.component";
import Button from "../components/button/custom-button.component";
import { LayoutLoginRegister } from "../components/layout-login/layout-login.component";
import { useRegister } from "./hooks/useRegister";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Register() {
  const { payload, onAuthCredentials, onAuthGoogle, onHandleChange } =
    useRegister();
  const { name, email, password } = payload;
 

  return (
    <LayoutLoginRegister>
      <section className="text-cente w-12/12 flex flex-col items-center justify-center gap-6 p-16 text-white">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <h2 className="text-xlr">
            Get started with our platform by signing up.
          </h2>
          <div className="w-full">
            <Button
              label="Sign Up with Gmail"
              id="sing-up-google-btn"
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
            value={name}
            isRequired
            id="name"
            label="Username"
            name="name"
            type="text"
            onChange={(e) => onHandleChange(e)}
            placeholder=""
          />
        </div>
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
          />
        </div>
        <div className="w-full">
          <Button
            label="Sign up"
            id="sing-up-btn"
            onClick={onAuthCredentials}
            variant="white"
          />
        </div>
        <div className="text-muted-foreground text-center text-sm">
          Already have an account?
          <Link
            href="/"
            className="underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </section>
    </LayoutLoginRegister>
  );
}
