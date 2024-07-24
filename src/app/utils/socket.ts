import { getCookie } from "cookies-next";
import socketIOClient from "socket.io-client";

const token = getCookie("token");

const socket = socketIOClient("http://localhost:4000", {
  query: {
    token: token,
  },
});

export default socket;
