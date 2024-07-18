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
  return (
    <main className="flex w-full">
      <ChatBox conversation_id={params.conversation_id} />
    </main>
  );
}
