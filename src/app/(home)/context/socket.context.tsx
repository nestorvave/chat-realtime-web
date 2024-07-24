"use client";
import { usersCase } from "@/app/domain/use-cases/users/users.use-case";
import { RootState } from "@/app/store";
import { setUser } from "@/app/store/modules/user.module";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};
const AppContext = createContext<SocketContextType>({ socket: null });
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>();
  const { data: session, status } = useSession();
   const userState = useSelector((state: RootState) => state.users);
 
  const dispatch = useDispatch();

  const newSession: any = session;
  const { getUser } = usersCase();
  const getData = async () => {
    try {
      const user = await getUser(newSession?._id!);
      dispatch(setUser(user));
    } catch (error) {}
  };

  useEffect(() => {
    if (status === "authenticated" && !userState._id) {
      getData();
    }
  }, [status]);

  useEffect(() => {
    const token = getCookie("token");

    const connection = socketIOClient("http://localhost:4000", {
      query: {
        token: token,
      },
    });
    setSocket(connection);
    connection.on("connect", () => {
      console.log("Socket connected");
    });

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider value={{ socket }}>{children}</AppContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(AppContext);
}
