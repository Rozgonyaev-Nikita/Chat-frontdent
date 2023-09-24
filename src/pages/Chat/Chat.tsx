import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";
import classes from "./Chat.module.css";
import { SendPanel } from "../../UI";
import { RoomMenu, UserList } from "../../components";

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
    return socketIOClient("https://chat-backend-a7g9.onrender.com");
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
      .get("https://chat-backend-a7g9.onrender.com/api/getMessages", {
        params: { room },
      })
      .then((res) => {
        setMessages(res.data.messages);
        console.log("об", res.data.messages);
      });
  }, [room]);

  const sendMessage = () => {
    if (text) client.emit("chat message", { room, text, name });
  };

  return (
    <div>
      <div className={classes.wrapperChat}>
        <RoomMenu />
        <UserList room={room || "room"} />
        {/* <hr className={classes.hr} /> */}
        <div>
          <div className={classes.chat}>
            {messages &&
              messages.map((message, index) =>
                message.name !== name ? (
                  <div key={index}>
                    <div className={classes.alienMessage}>
                      <h6 className={[classes.noneMar, classes.h6].join(" ")}>
                        {message.name}
                      </h6>
                      <p className={classes.noneMar}>{message.text}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "right" }} key={index}>
                    <div className={classes.myMessage} key={index}>
                      <p className={classes.noneMar}>{message.text}</p>
                    </div>
                  </div>
                )
              )}
          </div>
          <SendPanel text={text} setText={setText} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
