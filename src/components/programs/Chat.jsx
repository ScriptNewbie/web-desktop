import React, { useState, useEffect, createRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nick, setNick] = useState("");
  const [wsUrl, setWsUrl] = useState("wss://zettawhit.com/backend/livechat");
  const messagesSection = createRef(null);

  const { sendMessage } = useWebSocket(wsUrl, {
    onMessage: (message) => {
      const messagesCopy = JSON.parse(JSON.stringify(messages));
      messagesCopy.push(message.data);
      setMessages(messagesCopy);
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    const div = messagesSection.current;
    div.scrollTop = div.scrollHeight;
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <input
        style={{ width: "100%" }}
        type="text"
        value={nick}
        className="form-control"
        placeholder="Wprowadź nazwę użytkownika!"
        onChange={(e) => {
          setNick(e.target.value);
        }}
      />
      <div ref={messagesSection} style={{ height: "100%", overflow: "scroll" }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <form
          style={{ display: "flex", flexDirection: "row" }}
          onSubmit={(e) => {
            e.preventDefault();
            if (nick) {
              sendMessage(nick + ": " + message);
              setMessage("");
            } else setNick("Anonymouse");
          }}
        >
          <input
            style={{ width: "100%" }}
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: 10 }}
            value="Wyślij"
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
