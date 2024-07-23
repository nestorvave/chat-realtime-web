import { useSocketContext } from "@/app/(home)/context/socket.context";
import { Avatar } from "@/app/components/avatar/avatar.component";
import TextInput from "@/app/components/text-input/text-input.component";
import { IMessage } from "@/app/domain/models/messages/messages.model";
import { RootState } from "@/app/store";
import React from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useChatbox } from "./hooks/useChatbox";

interface IChatBox {
  conversation_id: string;
}

export const ChatBox = ({ conversation_id }: IChatBox) => {
  const { _id } = useSelector((state: RootState) => state.users);
  const { socket } = useSocketContext();
  const chatSelected = useSelector((state: RootState) => state.selectedChat);

  const { messages, sendMessage, newMessage, setNewMessage, chatRef } =
    useChatbox(socket, conversation_id);

  console.log(chatSelected);
  console.log(messages);

  const getUserInfo = (userAgent: string) => {
    const user = chatSelected?.recipients?.find(
      (user) => user._id === userAgent,
    );
    return (
      <div className="flex  items-center gap-3">
        <Avatar
          size="8"
          avatarUrl={user?.avatarUrl || ""}
          username={user?.name!}
        />
        <p>{user?.name}</p>
      </div>
    );
  };

  const messageJsx = (owner: string, message: string) => (
    <span
      className={`max-w-[200px] overflow-ellipsis text-balance break-words rounded-3xl p-4 md:max-w-[400px] ${owner === _id ? "bg-whiteDark text-mainDark" : "bg-grayDark text-whiteDark"}`}
    >
      {message}
    </span>
  );

  return (
    <main className="max-h-[99vh flex h-[99vh] w-full flex-col justify-between overflow-hidden pb-1 text-white">
      <section className="flex items-center gap-4 border-b border-gray-600 py-4">
        <Avatar
          avatarUrl={chatSelected.avatarUrl || ""}
          username={chatSelected.name}
        />

        <h2 className="ml-4">{chatSelected?.name}</h2>
      </section>
      <section
        ref={chatRef}
        className="no-scrollbar mb-4 flex h-[85%] w-full justify-center overflow-auto px-5 pt-4"
      >
        <div className="flex w-full flex-col">
          {messages.map(
            ({ _id: id, message, owner }: IMessage, idx: number) => (
              <div
                key={id || idx}
                className={`flex gap-1 ${owner === _id ? " justify-end" : " grid justify-start gap-2"} mb-2`}
              >
                {owner !== _id && chatSelected.isRoom && getUserInfo(owner)}

                {messageJsx(owner, message)}
              </div>
            ),
          )}
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
            placeholder="Write a message"
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
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
