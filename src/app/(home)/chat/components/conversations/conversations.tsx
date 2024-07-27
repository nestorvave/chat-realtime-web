"use client";
import React, { useEffect } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "@/app/store/modules/selected-user.module";
import { useConversations } from "./hooks/useConversations";

import { MdGroupAdd } from "react-icons/md";
import { LiaHashtagSolid } from "react-icons/lia";
import Link from "next/link";
import { useSocketContext } from "@/app/(home)/context/socket.context";
import { Avatar } from "@/app/components/avatar/avatar.component";
import { Modal } from "@/app/components/modal/modal.component";
import TextInput from "@/app/components/text-input/text-input.component";

export const Conversations = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const {
    conversations,
    createRoom,
    group,
    online,
    open,
    rooms,
    setGroup,
    setOpen,
  } = useConversations(socket);
  const selectedChat = useSelector((state: RootState) => state.selectedChat);

  const sortedConversations = conversations.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return Number(dateB) - Number(dateA);
  });

  return (
    <>
      <Modal
        title="Create a group chat"
        subtitle="Create a chat with more than 2 people."
        onClose={() => setOpen(false)}
        onSave={createRoom}
        open={open}
      >
        <div className="flex flex-col gap-6 px-4 pb-8">
          <TextInput
            value={group}
            isRequired
            id="groupName"
            label="Group name"
            name="groupName"
            type="text"
            onChange={(e) => setGroup(e.target.value)}
            placeholder=""
          />
        </div>
      </Modal>
      <main
        className={
          selectedChat.name
            ? "hidden h-full pl-2 md:block md:h-screen md:w-[400px] md:border-r md:border-grayDark"
            : "md:w-[400px] md:border-r md:border-grayDark"
        }
      >
        <section className="flex w-full flex-col justify-between gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-white">Messages</h2>
            <span
              className="cursor-pointer rounded-full p-3 hover:bg-grayDark"
              onClick={() => setOpen(true)}
            >
              <MdGroupAdd className="text-xl text-white" />
            </span>
          </div>
        </section>
        <section className="no-scrollbar flex h-[85vh] w-full flex-col gap-4 overflow-auto px-4">
          <div>
            {rooms.map((room) => (
              <Link
                href={`/chat/${room._id}`}
                className={`${selectedChat._id === room._id && "bg-grayDark"} hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
                prefetch={false}
                onClick={() =>
                  dispatch(
                    setSelectedChat({
                      _id: room._id,
                      name: room.name,
                      avatarUrl: "",
                      isRoom: true,
                      recipients: room.users,
                      recipient: null,
                    }),
                  )
                }
                key={room._id}
              >
                <LiaHashtagSolid className="ml-3 text-3xl text-white" />
                <section className="ml-4 line-clamp-1 grid flex-1 gap-1">
                  {room.name}
                </section>
              </Link>
            ))}
          </div>
          <div>
            {sortedConversations.map((conversation) => (
              <Link
                href={`/chat/${conversation._id}`}
                className={`${selectedChat._id === conversation.recipient._id && "bg-grayDark"} hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
                prefetch={false}
                onClick={() =>
                  dispatch(
                    setSelectedChat({
                      _id: conversation._id,
                      avatarUrl: conversation.recipient.avatarUrl || "",
                      isRoom: false,
                      name: conversation.recipient.name,
                      recipient: conversation.recipient._id,
                      recipients: null,
                    }),
                  )
                }
                key={conversation._id}
              >
                <Avatar
                  avatarUrl={conversation.recipient.avatarUrl || ""}
                  username={conversation.recipient.name}
                  online={online.includes(
                    conversation.recipient._id.toString(),
                  )}
                />
                <section className="grid flex-1 gap-1">
                  <div className="flex items-center justify-between">
                    <p>{conversation.recipient.name}</p>
                    <p className="text-muted-foreground text-xs">2h</p>
                  </div>
                  <div
                    className={`line-clamp-1 w-full text-sm ${conversation?.last_message?.toUpperCase() === "CREATE CONVERSATION" && "font-bold"}`}
                  >
                    {conversation?.last_message || "Create conversation"}
                  </div>
                </section>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
