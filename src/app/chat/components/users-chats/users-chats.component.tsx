"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";

interface IUsersChat {
  setUserSelected: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      username: string;
    } | null>
  >;
}

export const UsersChats = ({ setUserSelected }: IUsersChat) => {
  const [socket, setSocket] = useState<any>();
  const { _id } = useSelector((state: RootState) => state.users);
  const [online, setOnline] = useState<
    {
      _id: string;
      username: string;
    }[]
  >([]);

  useEffect(() => {
    const token = getCookie("token");
    setSocket(
      socketIOClient("http://localhost:4000", {
        query: {
          token: token,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("online", (users: any) => {
        const friends = users.filter((friend: any) => friend._id !== _id);
        setOnline(_.uniqBy(friends, "_id") as any);
      });
      return () => {
        socket.off("online");
      };
    }
  }, [socket]);

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
        {online.map((user, ind) => (
          <div
            key={ind}
            className="flex w-full cursor-pointer gap-3 border-b-2 border-gray-700 py-5"
            onClick={() => setUserSelected(user)}
          >
            <img
              src={
                "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
              }
              alt={""}
              className={"h-14 w-14 rounded-full"}
            />
            <div className="flex w-8/12 flex-col gap-2">
              <p className="truncate text-white">{user?.username}</p>

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
