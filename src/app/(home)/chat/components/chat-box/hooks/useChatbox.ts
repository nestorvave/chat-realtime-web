import { IMessage } from "@/app/domain/models/messages/messages.model";
import { messagesCase } from "@/app/domain/use-cases/messages/messages.use-case";
import { createSuggestions } from "@/app/hooks/createSuggestions";
import { RootState } from "@/app/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

export const useChatbox = (socket: Socket | null, conversation_id: string) => {
  const { _id } = useSelector((state: RootState) => state.users);
  const chatSelected = useSelector((state: RootState) => state.selectedChat);
  const chatRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { getByConversation } = messagesCase();

  const sendMessage = () => {
    setMessages((prev: any) => [
      ...prev,
      { message: newMessage, owner: _id, recipient: chatSelected._id },
    ]);
    const payload = {
      recipient: chatSelected.isRoom
        ? chatSelected?.recipients?.map((user) => user?._id)
        : chatSelected.recipient,
      message: newMessage,
      owner: _id,
      conversation_id: !chatSelected.isRoom ? conversation_id : "",
      room_id: chatSelected.isRoom ? conversation_id : "",
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
    if (chatSelected?._id) {
      getMessages();
    }
  }, [conversation_id, chatSelected]);

  useEffect(() => {
    if (socket) {
      socket.on("message", async (response: any) => {
        if (response.owner !== _id) {
          const iaResponse = await createSuggestions(response.message);

          setSuggestions(iaResponse.split("/"));
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

  return {
    chatRef,
    messages,
    newMessage,
    sendMessage,
    setNewMessage,
    suggestions,
    setSuggestions,
  };
};
