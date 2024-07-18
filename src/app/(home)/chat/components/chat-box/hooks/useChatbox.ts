import { IMessage } from "@/app/domain/models/messages/messages.model";
import { messagesCase } from "@/app/domain/use-cases/messages/messages.use-case";
import { RootState } from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export const useChatbox = (socket: Socket | null, conversation_id: string) => {
  const { _id } = useSelector((state: RootState) => state.users);
  const userSelected = useSelector((state: RootState) => state.selectedUser);
  const chatRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

   const { getByConversation } = messagesCase();

  const sendMessage = () => {
    setMessages((prev: any) => [
      ...prev,
      { message: newMessage, owner: _id, recipient: userSelected._id },
    ]);

    const payload = {
      recipient: userSelected?._id,
      message: newMessage,
      owner: _id,
      conversation_id,
    };
    socket?.emit("message", JSON.stringify(payload));
    setNewMessage("");
    scrollToBottomSmooth();
  };

  const scrollToBottomSmooth = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const getMessages = async () => {
    try {
      const response = await getByConversation(conversation_id);
      if (response) {
        setMessages(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userSelected?._id) {
      getMessages();
    }
  }, [userSelected]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (response: any) => {
        if (response.owner !== _id) {
          setMessages((prev: any) => [
            ...prev,
            {
              message: response.message,
              recipient: response.recipient,
              owner: response.owner,
            },
          ]);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottomSmooth();
  }, [messages]);

  return { messages, sendMessage, newMessage, setNewMessage, chatRef };
};
