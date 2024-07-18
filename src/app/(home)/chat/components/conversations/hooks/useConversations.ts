import {
  IAllConversations,
  ICreateConversation,
} from "@/app/domain/models/conversations/conversations.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { RootState } from "@/app/store";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useConversations = () => {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState<IAllConversations[]>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const { getConversationByUser } = conversationsCase();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const getRecipient = (conversation: any) => {
    if (conversation.owner._id !== _id) {
      return conversation.owner;
    } else {
      return conversation.recipient;
    }
  };

  const getConversations = async () => {
    try {
      const response = await getConversationByUser(_id);
      const chats = response.map((conversation) => {
        const recipient = getRecipient(conversation);
        conversation.recipient = recipient;
        return conversation;
      });
      if (id !== "chat") {
        const conversation = chats.find((chat) => chat._id === id);
        dispatch(setSelectedUser(conversation?.recipient));
      }
      setConversations(chats);
    } catch (error) {}
  };

  useEffect(() => {
    getConversations();
  }, []);

  return { getConversations, conversations };
};
