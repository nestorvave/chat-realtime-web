"use client";
import React, { useEffect, useState } from "react";
import { UsersChats } from "./components/users-chats/users-chats.component";
import { ChatBox } from "./components/chat-box/chat-box.component";
import socket from "../utils/socket";
import { getCookie } from "cookies-next";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Chat() {
  const { name } = useSelector((state: RootState) => state.users);
  const [online, setOnline] = useState([])
  console.log(name)
  useEffect(() => {
    socket.on("message2", (data) => {
      console.log("Recieved from SERVER ::", data);

      // Execute any command
    });
    const token = getCookie("token");
    socket.emit("authentication", name);
    socket.on("online", (isAuthenticated) => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        console.log("Autenticado correctamente en el servidor");
    
     setOnline(_.uniq(isAuthenticated));
      } else {
        console.log("Autenticación fallida en el servidor");
      }
    });
  }, [socket]);

  return (
    <main className="flex max-h-[100vh] max-w-[100vw]">
      <UsersChats online={online} />
      <ChatBox />
    </main>
  );
}
