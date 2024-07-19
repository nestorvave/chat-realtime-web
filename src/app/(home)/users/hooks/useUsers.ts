
import { IConversation } from "@/app/domain/models/conversations/conversations.model";
import { IUser } from "@/app/domain/models/users/users.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { usersCase } from "@/app/domain/use-cases/users/users.use-case";
import { RootState } from "@/app/store";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUsers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id: owner } = useSelector((state: RootState) => state.users);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");

  const { getAllUsers } = usersCase();
  const { create } = conversationsCase();

  const getData = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.filter((user) => user._id !== owner));
    } catch (error) {}
  };

  const getRecipient = (conversation: IConversation) => {
    if (conversation.owner._id !== owner) {
      return conversation.owner;
    } else {
      return conversation.recipient;
    }
  };

  const createConversation = async (user: IUser) => {
    try {
      const conversation = await create({ owner, recipient: user._id });
      dispatch(setSelectedUser(getRecipient(conversation)));
      router.push(`/chat/${conversation._id}`);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return { users, search, setSearch, createConversation };
};
