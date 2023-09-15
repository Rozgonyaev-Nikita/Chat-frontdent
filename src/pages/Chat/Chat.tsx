import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";

interface IMessages {
  _id: string;
  name: string;
  text: string;
  date: Date;
}

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessages[]>([]);

  const name = useAppSelector((state) => state.auth.user.login);
  console.log("messages", messages);

  const { room } = useParams();

  const client = useMemo(() => {
    return socketIOClient("http://localhost:5000");
  }, []);

  useEffect(() => {
    client.on("connect", () => {
      console.log("WebSocket подключение открыто");
      // client.emit("createRoom", "room1");
      client.emit("join", room);
      console.log(room);
    });

    client.on("disconnect", () => {
      console.log("WebSocket подключение закрыто");
    });

    client.on("message", (data) => {
      console.log(`Получено сообщение: ${data.text}`);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // setSocket(client);

    return () => {
      client.disconnect();
    };
  }, [client]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getMessages", {
        params: { room },
      })
      .then((res) => {
        setMessages(res.data.messages);
        console.log("об", res.data.messages);
      });
  }, [room]);

  const sendMessage = () => {
    // const message = text;
    // // client.emit("chat message", { roomId: room, message });
    // client.emit("chat message", message);
    client.emit("chat message", { room, text, name });
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button onClick={sendMessage}>Отправить</button>
      {messages &&
        messages.map((message, index) =>
          message.name === name ? (
            <div key={index}>{message.text}</div>
          ) : (
            <div key={index}>{message.text}</div>
          )
        )}
    </div>
  );
};

export default Chat;
