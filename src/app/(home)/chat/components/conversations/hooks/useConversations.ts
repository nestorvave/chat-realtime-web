import { IConversation } from "@/app/domain/models/conversations/conversations.model";
import { IRoom } from "@/app/domain/models/rooms/rooms.model";
import { conversationsCase } from "@/app/domain/use-cases/conversations/conversations.use-case";
import { roomsCase } from "@/app/domain/use-cases/rooms/rooms.use-case";
import { RootState } from "@/app/store";
import { setSelectedChat } from "@/app/store/modules/selected-user.module";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import _ from "lodash";
import { useRouter } from "next/navigation";

export const useConversations = (socket: Socket | null) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { _id } = useSelector((state: RootState) => state.users);
  const chatSelected = useSelector((state: RootState) => state.selectedChat);
  const { getConversationByUser } = conversationsCase();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const { getRooms } = roomsCase();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [online, setOnline] = useState<string[]>([]);

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
      if (id !== "chat" && !chatSelected._id) {
        const conversation = chats.find((chat) => chat._id === id);
        if (conversation?._id) {
          dispatch(setSelectedChat(conversation?.recipient));
        }
      }
      setConversations(chats);
    } catch (error) {}
  };

  const getMyRooms = async () => {
    const response = await getRooms(_id);
    if (id !== "chat" && !chatSelected._id) {
      const conversation = response.find((chat) => chat._id === id);
      if (conversation?._id) {
        dispatch(
          setSelectedChat({
            _id: conversation?._id,
            isRoom: true,
            name: conversation?.name || "",
            recipients: conversation?.users,
          }),
        );
      }
    }
    setRooms(response);
  };

  useEffect(() => {
    if (_id) {
      getConversations();
      getMyRooms();
    }
  }, [_id]);

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

  useEffect(() => {
    if (socket) {
      socket.on("online", (users: any) => {
        const friends = users.filter((friend: any) => friend !== _id);
        setOnline(_.uniq(friends));
      });

      return () => {
        socket.off("online");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("room-created", (response: string) => {
        setOpen(false);
        router.push(`/chat/${response}`);
      });
    }
  }, [socket]);

  return {
    conversations,
    createRoom,
    group,
    online,
    open,
    rooms,
    setGroup,
    setOpen,
  };
};
