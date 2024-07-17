"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getCookie } from "cookies-next";
import socketIOClient from "socket.io-client";
import { ChatBox } from "../components/chat-box/chat-box.component";

export default function Chat({ params }: { params: { slug: string } }) {
  const [socket, setSocket] = useState<any>(null);
  const {slug }= params;
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
      <ChatBox socket={socket} slug={slug} />
    </main>
  );
}
