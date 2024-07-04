"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React from "react";
import { IoSend } from "react-icons/io5";
export const ChatBox = () => {
  return (
    <main className="flex h-[95vh] w-full flex-col justify-between pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 p-4">
        <img
          src={
            "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
          }
          alt={""}
          className={"h-12 w-12 rounded-full"}
        />
        <h2>Jessica allen</h2>
      </section>
      <section className="w-10/12">
	
	  </section>
      <section className="mb-2 flex w-full items-center justify-center gap-6">
        <div className="w-10/12">
          <TextInput
            value={""}
            id="email"
            name="email"
            type="text"
            onChange={(e) => {}}
            placeholder="Search"
          />
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#5441F6]">
          <IoSend className="text-xl text-white" />
        </div>
      </section>
    </main>
  );
};
