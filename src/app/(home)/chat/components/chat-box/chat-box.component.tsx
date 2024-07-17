"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import { IMessage } from "@/app/domain/models/messages/messages.model";
import { messagesCase } from "@/app/domain/use-cases/messages/messages.use-case";
import { RootState } from "@/app/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

interface IChatBox {
  socket: any;
  conversation_id: string;
}

export const ChatBox = ({ socket, conversation_id }: IChatBox) => {
  const { getByConversation } = messagesCase();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const userSelected = useSelector((state: RootState) => state.selectedUser);

  useEffect(() => {
    if (socket) {
      socket.on("message", (response: any) => {
        console.log(response);
        if (response.owner !== _id) {
          setMessages((prev: any) => [
            ...prev,
            {
              message: response.message,
              recipient: response.recipient,
              owner: response.owner,
            },
          ]);
        }
      });
    }
  }, [socket]);

  const sendMessage = () => {
    setMessages((prev: any) => [
      ...prev,
      { message: newMessage, owner: _id, recipient: userSelected._id },
    ]);

    const payload = {
      recipient: userSelected?._id,
      message: newMessage,
      owner: _id,
      conversation_id,
    };
    console.log(payload);
    socket.emit("message", JSON.stringify(payload));
    setNewMessage("");
  };

  const getMessages = async () => {
    try {
      const response = await getByConversation(conversation_id);
      if (response) {
        setMessages(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userSelected?._id) {
      getMessages();
    }
  }, [userSelected]);
  console.log(messages);
  return (
    <main className="flex h-[95vh] w-full flex-col justify-between pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 p-4">
        <Image
          src={
            userSelected?.avatarUrl ||
            "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
          }
          alt={`${userSelected?.name} avatar`}
          className={"h-12 w-12 rounded-full"}
          width={400}
          height={500}
        />
        <h2>{userSelected?.name}</h2>
      </section>
      <section className="flex h-full w-full justify-center">
        <div className="flex w-11/12 flex-col p-6 px-6">
          {messages.map(({ _id: id, message, owner }: IMessage) => (
            <span
              className={`flex ${owner === _id ? "justify-end" : "justify-start"} mb-2`}
              key={id}
            >
              <span
                className={`rounded-lg p-2 ${owner === _id ? "bg-green-600 text-white" : "bg-blue-600 text-white"}`}
              >
                {message}
              </span>
            </span>
          ))}
        </div>
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
