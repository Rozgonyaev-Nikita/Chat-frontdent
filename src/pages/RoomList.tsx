import { useEffect, useMemo, useState } from "react";
import socketIOClient from "socket.io-client";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { CreateRoom } from "../components";
import Room from "../components/Room/Room";

function RoomList() {
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  // const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  // const auth = useAppSelector((state) => state.auth.isAuth);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  console.log("user", user);
  console.log(isAuth);

  const client = useMemo(() => {
    return socketIOClient("http://localhost:5000");
  }, []);

  useEffect(() => {
    if (isAuth) {
      client.on("connect", () => {
        console.log("WebSocket подключение открыто");
        // client.emit("createRoom", "room1");
      });

      client.on("disconnect", () => {
        console.log("WebSocket подключение закрыто");
      });

      client.on("message", (data) => {
        console.log(`Получено сообщение: ${data}`);
      });
    } else {
      navigate("/avtorization");
    }

    // setSocket(client);

    return () => {
      client.disconnect();
    };
  }, [isAuth, navigate, client]);

  useEffect(() => {
    setRooms(user.rooms);
  }, [user]);

  const sendMessage = () => {
    const message = text;
    // client.emit("chat message", { roomId: room, message });
    client.emit("chat message", message);
  };

  const enter = () => {
    console.log("отправка");
    client.emit("join", room);
  };

  const createEnter = () => {
    // client.emit("createRoom", room);
    client.emit("join", room);
  };
  console.log("rooms", user.rooms);
  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <label>room</label>
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        type="text"
      />
      <button onClick={sendMessage}>Отправить</button>
      <button onClick={createEnter}>Создать и Войти</button>
      <button onClick={enter}>Войти</button>
      <hr />
      <CreateRoom />
      <div>
        {user.rooms.map((room, index) => (
          <Room key={index} room={room}></Room>
        ))}
      </div>
    </>
  );
}

export default RoomList;
