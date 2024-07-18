import { IUser } from "@/app/domain/models/users/users.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { usersCase } from "@/app/domain/use-cases/users/users.use-case";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useUsers = () => {
  const { _id: owner } = useSelector((state: RootState) => state.users);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const { getAllUsers } = usersCase();
  const { create } = conversationsCase();

  const getData = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.filter((user) => user._id !== owner));
    } catch (error) {}
  };

  const createConversation = async (user: IUser) => {
    try {
      const { _id } = await create({ owner, recipient: user._id });
      router.push(`/chat/${_id}`);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return { users, search, setSearch, createConversation };
};
