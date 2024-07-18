"use client";
import { Avatar } from "@/app/components/avatar/avatar.component";
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
  return (
    <main className="max-h-[99vh flex h-[99vh] w-full flex-col justify-between pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 py-4">
        <Avatar
          avatarUrl={userSelected.avatarUrl || ""}
          username={userSelected.name}
        />
        <h2>{userSelected?.name}</h2>
      </section>
      <section className="no-scrollbar mb-4 flex h-[85%] w-full justify-center overflow-auto px-5 pt-4">
        <div className="flex w-full flex-col">
          {messages.map(({ _id: id, message, owner }: IMessage) => (
            <span
              className={`flex ${owner === _id ? "justify-end" : "justify-start"} mb-2`}
              key={id}
            >
              <span
                className={`max-w-[50%] rounded-3xl p-4 ${owner === _id ? "bg-whiteDark text-mainDark" : "bg-grayDark text-whiteDark"}`}
              >
                {message}
              </span>
            </span>
          ))}
        </div>
      </section>

      <section className="end-1 mt-auto flex w-full items-center justify-center gap-6 px-5">
        <div className="w-full">
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
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-whiteDark"
          onClick={sendMessage}
        >
          <IoSend className="text-xl text-mainDark" />
        </div>
      </section>
    </main>
  );
};
