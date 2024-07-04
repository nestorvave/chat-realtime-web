"use client";
import React, { useEffect } from "react";
import { UsersChats } from "./components/users-chats/users-chats.component";
import { ChatBox } from "./components/chat-box/chat-box.component";
import socket from "../utils/socket";

export default function Chat() {
  useEffect(() => {
    socket.on("message2", (data) => {
      console.log("Recieved from SERVER ::", data);
      // Execute any command
    });
  }, [socket]);

  return (
    <main className="flex max-h-[100vh] max-w-[100vw]">
      <UsersChats />
      <ChatBox />
    </main>
  );
}
