"use client";
import TextInput from "@/app/components/text-input/text-input.component";
import { messagesCase } from "@/app/domain/use-cases/messages/messages.use-case";
import { RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

interface IChatBox {
  socket: any;
}

export const ChatBox = ({ socket }: IChatBox) => {
  const { getBySender } = messagesCase();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const userSelected = useSelector((state: RootState) => state.selectedUser);

  useEffect(() => {
    if (socket) {
      socket.on("message", (response: any) => {
        if (response.owner._id !== _id) {
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
    setMessages((prev: any) => [...prev, { message: newMessage, sender: _id }]);

    const payload = {
      recipient: userSelected?._id,
      message: newMessage,
    };
    socket.emit("message", JSON.stringify(payload));
    setNewMessage("");
  };

  const getMessages = async () => {
    try {
      const response = await getBySender(_id, userSelected?._id!);
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
    <main className="flex h-[95vh] w-full flex-col justify-between pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 p-4">
        <img
          src={
            "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
          }
          alt={""}
          className={"h-12 w-12 rounded-full"}
        />
        <h2>{userSelected?.name}</h2>
      </section>
      <section className="flex h-full w-full justify-center">
        <div className="flex w-11/12 flex-col p-6 px-6">
          {messages.map((msg: any, index: any) => (
            <span
              className={`flex ${msg.sender === _id ? "justify-end" : "justify-start"} mb-2`}
              key={index}
            >
              <span
                className={`rounded-lg p-2 ${msg.sender === _id ? "bg-green-600 text-white" : "bg-blue-600 text-white"}`}
              >
                {msg.message}
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
