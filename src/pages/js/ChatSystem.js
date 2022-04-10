import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat message"; // Name of the event
const SOCKET_SERVER_URL = "https://chat.calypsocloud.one";

const ChatSystem = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // When a new message is received, add it to the list of messages
    let Rand = Math.floor(Math.random() * 100);
    let name = "User" + Rand;
    socketRef.current.emit('joining msg', name);
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = [ ...message ];
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    const incomingMessage = [ ...messageBody ];
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, messageBody);
    setMessages((messages) => [...messages, incomingMessage]);
  };

  return { messages, sendMessage };
};

export default ChatSystem;