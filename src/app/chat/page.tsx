"use client";
import React, { useEffect, useState } from "react";
import { UsersChats } from "./components/users-chats/users-chats.component";
import { ChatBox } from "./components/chat-box/chat-box.component";
import _ from "lodash";
import { getCookie } from "cookies-next";
import socketIOClient, { Socket } from "socket.io-client";

export default function Chat() {
  const [userSelected, setUserSelected] = useState<{
    _id: string;
    username: string;
  } | null>(null);
  const [socket, setSocket] = useState<any>(null);

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
  return (
    <main className="flex max-h-[100vh] max-w-[100vw]">
      <UsersChats setUserSelected={setUserSelected} />
      <ChatBox userSelected={userSelected} socket={socket} />
    </main>
  );
}
