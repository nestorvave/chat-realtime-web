"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useConversations } from "./hooks/useConversations";

import { MdGroupAdd } from "react-icons/md";
import { LiaHashtagSolid } from "react-icons/lia";
import Link from "next/link";
import { useSocketContext } from "@/app/(home)/context/socket.context";
import { Avatar } from "@/app/components/avatar/avatar.component";
import { Modal } from "@/app/components/modal/modal.component";
import TextInput from "@/app/components/text-input/text-input.component";
import { useRouter } from "next/navigation";
import { roomsCase } from "@/app/domain/use-cases/rooms/rooms.use-case";
import { IRoom } from "@/app/domain/models/rooms/rooms.model";

export const Conversations = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const { conversations, createRoom, group, open, setGroup, setOpen, rooms } =
    useConversations(socket);
  const { _id } = useSelector((state: RootState) => state.users);
  const selectChat = useSelector((state: RootState) => state.selectedChat);
  const [online, setOnline] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (socket) {
      socket.on("online", (users: any) => {
        const friends = users.filter((friend: any) => friend !== _id);
        setOnline(_.uniq(friends));
      });

      return () => {
        socket.off("online");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("room-created", (response: string) => {
        setOpen(false);
        router.push(`/chat/${response}`);
      });
    }
  }, [socket]);

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
          selectChat.name
            ? "hidden h-full pl-2 md:block md:w-[340px]"
            : "w-[340px]"
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
                className={`${selectChat._id === room.owner._id && "bg-grayDark"} hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
                prefetch={false}
                onClick={() =>
                  dispatch(
                    setSelectedUser({
                      _id: room._id,
                      name: room.name,
                      avatarUrl: "",
                      isRoom: true,
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
            {sortedConversations.map((conversation, ind) => (
              <Link
                href={`/chat/${conversation._id}`}
                className={`${selectChat._id === conversation.recipient._id && "bg-grayDark"} hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
                prefetch={false}
                onClick={() =>
                  dispatch(
                    setSelectedUser({
                      _id: conversation.recipient._id,
                      avatarUrl: conversation.recipient.avatarUrl || "",
                      isRoom: false,
                      name: conversation.recipient.name,
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
