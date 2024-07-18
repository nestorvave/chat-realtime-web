"use client";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};
const AppContext = createContext<SocketContextType>({ socket: null });
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>();
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
