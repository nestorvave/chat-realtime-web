"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

interface IChatBox {
  userSelected: string;
  socket: any;
}

export const ChatBox = ({ userSelected, socket }: IChatBox) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: any) => {
        console.log(typeof message);
      /*   setMessages((prev: any) => [
          ...prev,
          { text: JSON.parse(message).message, isOur: true },
        ]); */
      });
    }
  }, [socket]);

  const sendMessage = () => {
    setMessages((prev: any) => [...prev, { text: newMessage, isOur: true }]);
    const payload = {
      message: {
        recipient: userSelected,
        message: newMessage,
      },
    };
    console.log("enviando");
    socket.emit("message", JSON.stringify(payload));
    setNewMessage("");
  };

  console.log(messages);

  return (
    <main className="flex h-[95vh] w-full flex-col justify-between pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 p-4">
        <img
          src={
            "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
          }
          alt={""}
          className={"h-12 w-12 rounded-full"}
        />
        <h2>{userSelected}</h2>
      </section>
      <section className="w-10/12">
        {messages.map((msg: any) => (
          <div key={msg.text}>{msg.text}</div>
        ))}
      </section>
      <section className="mb-2 flex w-full items-center justify-center gap-6">
        <div className="w-10/12">
          <TextInput
            value={newMessage}
            id="msg"
            name="msg"
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[#5441F6]"
          onClick={sendMessage}
        >
          <IoSend className="text-xl text-white" />
        </div>
      </section>
    </main>
  );
};
