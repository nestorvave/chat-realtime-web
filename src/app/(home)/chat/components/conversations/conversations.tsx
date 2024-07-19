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
  const { conversations } = useConversations(socket);
  const { _id } = useSelector((state: RootState) => state.users);
  const selectedUser = useSelector((state: RootState) => state.selectedUser);
  const [online, setOnline] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("online", (users: any) => {
        const friends = users.filter((friend: any) => friend !== _id);
        setOnline(_.uniq(friends));
      });
      return () => {
        socket.off("online");
      };
    }
  }, [socket]);

  return (
    <main
      className={
        selectedUser.name ? "hidden h-full pl-2 md:block md:w-auto" : "w-auto"
      }
    >
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
