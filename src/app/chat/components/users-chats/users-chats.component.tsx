"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React from "react";

interface IUsersChat {
  online: string[];
}

export const UsersChats = ({ online }: IUsersChat) => {
  return (
    <main className="h-[95vh] w-3/12">
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

      <section className="no-scrollbar flex h-[80vh] w-full flex-col gap-3 overflow-auto">
        {online.map((a, ind) => (
          <div
            key={ind}
            className="flex w-full gap-3 border-b-2 border-gray-700 py-5"
          >
            <img
              src={
                "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
              }
              alt={""}
              className={"h-14 w-14 rounded-full"}
            />
            <div className="flex w-8/12 flex-col gap-2">
              <p className="truncate text-white">{a}</p>

              <p className="w-11/12 truncate text-sm text-white">
                Lorem ipsum dolor sit amet consecte Earum qui corporis
                asperiores? Reprehenderit obcaecati at velit illo perspiciatis
                in nihil? Aspernatur.
              </p>
            </div>
            <span className="w-full text-xs text-white">3min ago</span>
          </div>
        ))}
      </section>
    </main>
  );
};
