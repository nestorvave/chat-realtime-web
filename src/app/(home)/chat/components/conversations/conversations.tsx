"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useConversations } from "./hooks/useConversations";

import { MdGroupAdd } from "react-icons/md";

import Link from "next/link";
import { useSocketContext } from "@/app/(home)/context/socket.context";
import { Avatar } from "@/app/components/avatar/avatar.component";
import { Modal } from "@/app/components/modal/modal.component";
import TextInput from "@/app/components/text-input/text-input.component";
import { useRouter } from "next/navigation";

export const Conversations = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const { conversations } = useConversations(socket);
  const { _id } = useSelector((state: RootState) => state.users);
  const selectedUser = useSelector((state: RootState) => state.selectedUser);
  const [online, setOnline] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
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

  const [group, setGroup] = useState<string>("");

  const createRoom = () => {
    const payload = {
      owner: _id,
      users: ["669230973df8b020749a79f1", "669cab1ac1e3bbede9025c93"],
      name: group,
    };
    socket?.emit("join-room", JSON.stringify(payload));
  };

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
          selectedUser.name ? "hidden h-full pl-2 md:block md:w-auto" : "w-auto"
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
        <section className="no-scrollbar flex h-[85vh] w-full flex-col overflow-auto px-4">
          {conversations.map((conversation, ind) => (
            <Link
              href={`/chat/${conversation._id}`}
              className={`${selectedUser._id === conversation.recipient._id && "bg-grayDark"} hover:bg-muted/50 flex items-center gap-4 rounded-lg p-2 text-white hover:bg-grayDark`}
              prefetch={false}
              onClick={() => dispatch(setSelectedUser(conversation.recipient))}
              key={conversation._id}
            >
              <Avatar
                avatarUrl={conversation.recipient.avatarUrl || ""}
                username={conversation.recipient.name}
                online={online.includes(conversation.recipient._id.toString())}
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
        </section>
      </main>
    </>
  );
};
