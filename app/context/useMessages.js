import { useContext } from "react";
import MessagesContext from "./MessagesContext";
import { addPrivateMessage } from "../api/messages";

export default useAuth = () => {
  const { messages, setMessages } = useContext(MessagesContext);

  const addMessage = (message, chatId, phoneNumber) => {
    const res = addPrivateMessage(message, chatId, phoneNumber);
    console.log(res);
    setMessages([...messages, res]);
  };

  // const getPrivateMessages =

  return { messages, setMessages, addMessage };
};
