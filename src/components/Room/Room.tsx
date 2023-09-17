import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Room.module.css";
import axios from "axios";

interface IRoom {
  room: string;
}
interface IMessage {
  name: string;
  text: string;
  _id: object;
  date: Date;
}

const Room: FC<IRoom> = ({ room }) => {
  const [roomInfo, setRoomInfo] = useState<IMessage>({
    name: "",
    text: "",
    _id: {},
    date: new Date(),
  });
  const navigate = useNavigate();
  const goToThePage = () => {
    navigate(`/${room}`);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lastMessage", {
        params: {
          room,
        },
      })
      .then((res) => {
        setRoomInfo(res.data);
      });
  }, [room]);

  return (
    <div onClick={goToThePage} className={classes.room}>
      <h5 className={classes.h5}>{room}</h5>
      <p>{roomInfo.text}</p>
    </div>
  );
};

export default Room;
