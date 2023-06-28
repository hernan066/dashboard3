/* eslint-disable react/jsx-no-constructed-context-values */
import { useSocket } from "hooks/useSockets";
import { createContext } from "react";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { socket, online } = useSocket(`${process.env.REACT_APP_SOCKET_URL}/orders/delivery`);

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
}
