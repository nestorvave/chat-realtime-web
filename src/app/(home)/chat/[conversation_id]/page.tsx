"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getCookie } from "cookies-next";
import socketIOClient, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Conversations } from "../components/conversations/conversations";
import { ChatBox } from "../components/chat-box/chat-box.component";

export default function Chat({
  params,
}: {
  params: { conversation_id: string };
}) {
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
      <ChatBox socket={socket} conversation_id={params.conversation_id} />
    </main>
  );
}
