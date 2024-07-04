"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import Image from "next/image";
import React from "react";

export const UsersChats = () => {
  const arrays = [1, 23, 43,43,43,4, 34, 34, 24, 34, 23423, 423];

  return (
    <main className="w-3/12 h-[95vh]">
      <section className="w-full border-y-2 border-gray-800 p-4">
        <TextInput
          value={""}
          id="email"
          name="email"
          type="text"
          onChange={(e) => {}}
          placeholder="Search"
        />
      </section>

      <section className="w-full flex-col  overflow-auto flex gap-3 h-[80vh] no-scrollbar">
        {arrays.map((a, ind) => (
          <div key={ind} className="flex w-full gap-3 border-b-2 border-gray-700 py-5">
            <img
              src={
                "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
              }
              alt={""}
              className={"w-14 h-14 rounded-full"}
            />
            <div className="flex flex-col w-8/12 gap-2">
              <p className="text-white truncate">Ralph Edwards</p>

              <p className="text-white w-11/12 truncate  text-sm">
                Lorem ipsum dolor sit amet consecte Earum qui corporis
                asperiores? Reprehenderit obcaecati at velit illo perspiciatis
                in nihil? Aspernatur.
              </p>
            </div>
            <span className="text-white w-full text-xs">3min ago</span>
          </div>
        ))}
      </section>
    </main>
  );
};
