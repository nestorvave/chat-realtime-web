"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useConversations } from "./hooks/useConversations";
import Image from "next/image";
import Link from "next/link";

export const Conversations = () => {
  const dispatch = useDispatch();
  const { conversations } = useConversations();
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
        {conversations.map((conversation) => (
          <Link
            href={`/chat/${conversation._id}`}
            className="hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark"
            prefetch={false}
            key={conversation._id}
            onClick={() => dispatch(setSelectedUser(conversation.recipient))}
          >
            <Image
              src={
                conversation?.recipient.avatarUrl ||
                "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
              }
              alt={`${conversation?.recipient.name} avatar`}
              className={"h-14 w-14 rounded-full"}
              width={400}
              height={500}
            />
            <section className="grid flex-1 gap-1">
              <div className="flex items-center justify-between">
                <p>{conversation.recipient.name}</p>
                <p className="text-muted-foreground text-xs">2h</p>
              </div>
              <div
                className={`line-clamp-1 w-full text-sm ${conversation?.last_message?.toUpperCase() === "CREATE CONVERSATION" && "font-bold"}`}
              >
                {conversation?.last_message || "Create conversation"}
              </div>
            </section>
          </Link>
        ))}
      </section>
    </main>
  );
};
