import { IConversation } from "@/app/domain/models/conversations/conversations.model";
import { IRoom } from "@/app/domain/models/rooms/rooms.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { roomsCase } from "@/app/domain/use-cases/rooms/rooms.use-case";
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
  const { getRooms } = roomsCase();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [group, setGroup] = useState<string>("");

  const createRoom = () => {
    const payload = {
      owner: _id,
      users: ["669230973df8b020749a79f1", "669cab1ac1e3bbede9025c93"],
      name: group,
    };
    socket?.emit("join-room", JSON.stringify(payload));
    setGroup("");
    setOpen(false);
    getMyRooms();
  };

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

  const getMyRooms = async () => {
    const response = await getRooms(_id);
    if (id !== "chat") {
      const conversation = response.find((chat) => chat._id === id);
      console.log(conversation);
      dispatch(
        setSelectedUser({
          _id: conversation?._id,
          isRoom: true,
          name: conversation?.name || "",
        }),
      );
    }
    setRooms(response);
  };

  useEffect(() => {
    getConversations();
    getMyRooms();
  }, []);

  useEffect(() => {
    const handleMessage = (response: any) => {
      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation._id === response.conversation_id
            ? {
                ...conversation,
                last_message: response.message,
                updatedAt: new Date().toISOString(),
              }
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

  return {
    conversations,
    createRoom,
    group,
    open,
    setGroup,
    setOpen,
    rooms,
  };
};
