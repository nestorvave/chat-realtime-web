"use client";
import React from "react";
import { useUsers } from "../hooks/useUsers";
import TextInput from "@/app/components/text-input/text-input.component";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useRouter } from "next/navigation";

export const UserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, search, setSearch } = useUsers();

  return (
    <main className="h-full w-3/12 pl-2">
      <section className="flex w-full flex-col gap-4 p-4">
        <h2 className="pl-2 text-2xl text-white">People</h2>
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
            onClick={() => {
              dispatch(setSelectedUser(user));
              router.push("/chat");
            }}
          >
            <Image
              src={
                user?.avatarUrl ||
                "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png"
              }
              alt={`${user.name} avatar`}
              className={"h-14 w-14 rounded-full"}
              width={400}
              height={500}
            />

            <p className="truncate text-white">{user?.name}</p>
          </div>
        ))}
      </section>
    </main>
  );
};
