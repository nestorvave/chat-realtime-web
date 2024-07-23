"use client";
import React from "react";
import { useUsers } from "../hooks/useUsers";
import TextInput from "@/app/components/text-input/text-input.component";
import { Avatar } from "@/app/components/avatar/avatar.component";

export const UserList = () => {
  const { users, search, setSearch, createConversation } = useUsers();

  return (
    <main className="h-full w-[400px] pl-2">
      <section className="flex w-full flex-col gap-4 p-4">
        <h1 className="pl-2 text-2xl text-white">People</h1>
        <TextInput
          value={search}
          id="search"
          name="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username or search"
        />
      </section>

      <section className="no-scrollbar flex h-[85vh] w-full flex-col overflow-auto px-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="borde flex w-full cursor-pointer items-center gap-3 rounded-xl p-1 hover:bg-grayDark"
            onClick={() => createConversation(user)}
          >
            <Avatar avatarUrl={user?.avatarUrl || ""} username={user.name} />
            <p className="truncate text-white">{user?.name}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
