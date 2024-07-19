import {
  IConversation,
} from "@/app/domain/models/conversations/conversations.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { RootState } from "@/app/store";
import { setSelectedUser } from "@/app/store/modules/selected-user.module";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export const useConversations = (socket: Socket | null) => {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const { getConversationByUser } = conversationsCase();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const getRecipient = (conversation: IConversation) => {
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


  useEffect(() => {
    const handleMessage = (response: any) => {
      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation._id === response.conversation_id
            ? { ...conversation, last_message: response.message }
            : conversation,
        ),
      );
    };
    if (socket) {
      socket.on("message", handleMessage);
    }
    return () => {
      if (socket) {
        socket.off("message", handleMessage);
      }
    };
  }, [socket]);

  return { getConversations, conversations };
};
