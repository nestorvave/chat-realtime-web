"use client";
import React, { useEffect, useState } from "react";
import { UsersChats } from "./components/chats/chats.component";
import { ChatBox } from "./components/chat-box/chat-box.component";
import _ from "lodash";
import { getCookie } from "cookies-next";
import socketIOClient, { Socket } from "socket.io-client";
import { EmptyScreen } from "../(components)/components/empty-screen/empty-screen";

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
    <main className="flex w-full">
      <UsersChats setUserSelected={setUserSelected} />
      {userSelected ? (
        <ChatBox userSelected={userSelected} socket={socket} />
      ) : (
        <EmptyScreen />
      )}
    </main>
  );
}
