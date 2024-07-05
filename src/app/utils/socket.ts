import { getCookie } from "cookies-next";
import socketIOClient from "socket.io-client";

// Suponiendo que tu token es una cadena de texto
const token = getCookie("token");
// Pasar el token como parte de la query string
const socket = socketIOClient("http://localhost:4000", {
  query: {
    token: token,
  },
});

export default socket;
