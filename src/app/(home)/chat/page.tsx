"use client";
import React, { useEffect, useState } from "react";
import { UsersChats } from "./components/conversations/conversations";
import { ChatBox } from "./components/chat-box/chat-box.component";
import _ from "lodash";
import { getCookie } from "cookies-next";
import socketIOClient, { Socket } from "socket.io-client";
import { EmptyScreen } from "../(components)/components/empty-screen/empty-screen";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Chat() {
  const { _id } = useSelector((state: RootState) => state.selectedUser);
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
      <UsersChats  />
      {_id ? (
        <ChatBox socket={socket} />
      ) : (
        <EmptyScreen />
      )}
    </main>
  );
}
