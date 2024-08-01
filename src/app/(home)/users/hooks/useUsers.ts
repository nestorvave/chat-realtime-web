import { IConversation } from "@/app/domain/models/conversations/conversations.model";
import { IUser } from "@/app/domain/models/users/users.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { RootState } from "@/app/store";
import { setSelectedChat } from "@/app/store/modules/selected-user.module";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUsers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id: owner } = useSelector((state: RootState) => state.users);
  const [search, setSearch] = useState<string>("");
  const { create } = conversationsCase();

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
      const recipient = getRecipient(conversation);
      dispatch(
        setSelectedChat({ ...recipient, avatarUrl: recipient.avatarUrl || "" }),
      );
      router.push(`/chat/${conversation._id}`);
    } catch (error) {}
  };

  return { search, setSearch, createConversation };
};
