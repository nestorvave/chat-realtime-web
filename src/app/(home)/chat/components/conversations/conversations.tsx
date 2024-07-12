"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";



export const UsersChats = () => {
  const dispatch = useDispatch()
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
    <main className="h-full w-3/12 pl-2">
      <section className="flex w-full flex-col gap-4 p-4">
        <h2 className="pl-2 text-2xl text-white">Messages</h2>
      </section>

      <section className="no-scrollbar flex h-[85vh] w-full flex-col overflow-auto px-4">
        {online.map((user, ind) => (
          <div
            key={ind}
            className="borde flex w-full cursor-pointer items-center gap-3 rounded-xl p-1 hover:bg-grayDark"
            onClick={() => dispatch(setSelectedUser(user))}
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
