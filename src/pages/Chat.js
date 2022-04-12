import ChatSystem from "./js/ChatSystem";
import { useState } from "react";

const Chat = () => {
    const { messages, sendMessage } = ChatSystem(); // Creates a websocket and manages messaging
    const [ newMessage, setNewMessage ] = useState([]); // Message to be sent

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = (e) => {
        e.preventDefault();
        var chatDiv = document.getElementsByClassName('messages-list')[0];
        sendMessage(newMessage);
        setNewMessage("");
        setTimeout(function(){
          chatDiv.scrollTop = chatDiv.scrollHeight;
        }, 150);
      };
    
      return (
        <main className="container">
          <div className="messages-container">
            <div className="messages-list">
              {messages.map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser ? "my-message" : "received-message"
                  }`}
                >
                  {message}
                </li>
              ))}
            </div>
          </div>
          <div className="form-div">
            <form id='form'>
                <input type="text" placeholder="Type a message..." value={newMessage} onChange={handleNewMessageChange} />
                <button className="damnbuttons" onClick={handleSendMessage} value='submit'>Send</button>
            </form>
            </div>
        </main>
      );
    };
    
    export default Chat;