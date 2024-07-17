import { IAllConversations, ICreateConversation } from "@/app/domain/models/conversations/conversations.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useConversations = () => {
  const [conversations, setConversations] = useState<IAllConversations[]>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const { getConversationByUser } = conversationsCase();

  const getRecipient = (conversation: any) => {
    if (conversation.owner._id !== _id) {
      return conversation.owner;
    } else {
      return conversation.recipient;
    }
  };

  const getChats = async () => {
    try {
      const response = await getConversationByUser(_id);
      const chats = response.map((conversation) => {
        const recipient = getRecipient(conversation);
        conversation.recipient = recipient;
        return conversation;
      });
      setConversations(chats);
    } catch (error) {}
  };
  /* 
  const createConversation = async (user: IUser) => {
    try {
      const { _id } = await create({ owner, recipient: user._id });
      router.push(`/chat/${_id}`);
    } catch (error) {}
  };
 */
  useEffect(() => {
    getChats();
  }, []);

  return { getChats, conversations };
};
