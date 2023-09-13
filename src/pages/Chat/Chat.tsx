import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppSelector } from "../../hooks/reduxHooks";

const Chat = () => {
  const [text, setText] = useState("");

  const name = useAppSelector((state) => state.auth.user.login);

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
    });

    // setSocket(client);

    return () => {
      client.disconnect();
    };
  }, [client]);

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
    </div>
  );
};

export default Chat;
