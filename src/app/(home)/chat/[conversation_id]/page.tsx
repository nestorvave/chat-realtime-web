"use client";
import React from "react";
import _ from "lodash";

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
