"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useConversations } from "./hooks/useConversations";
import Image from "next/image";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSocketContext } from "@/app/(home)/context/socket.context";
import { Avatar } from "@/app/components/avatar/avatar.component";

export const Conversations = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const { conversations } = useConversations();
  const { _id } = useSelector((state: RootState) => state.users);
  console.log(_id);
  const selectedUser = useSelector((state: RootState) => state.selectedUser);
  const [online, setOnline] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("online", (users: any) => {
        console.log("........", users);
        const friends = users.filter((friend: any) => friend !== _id);
        console.log("friends", friends);
        setOnline(_.uniq(friends));
      });
      return () => {
        socket.off("online");
      };
    }
  }, [socket]);
  console.log(online);
  return (
    <main className="h-full w-3/12 pl-2">
      <section className="flex w-full flex-col gap-4 p-4">
        <h2 className="pl-2 text-2xl text-white">Messages</h2>
      </section>
      <section className="no-scrollbar flex h-[85vh] w-full flex-col overflow-auto px-4">
        {conversations.map((conversation, ind) => (
          <Link
            href={`/chat/${conversation._id}`}
            className={`${selectedUser._id === conversation.recipient._id && "bg-grayDark"} hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
            prefetch={false}
            onClick={() => dispatch(setSelectedUser(conversation.recipient))}
            key={conversation._id}
          >
            <Avatar
              avatarUrl={conversation.recipient.avatarUrl || ""}
              username={conversation.recipient.name}
              online={online.includes(conversation.recipient._id.toString())}
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
