import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IRoom {
  room: string;
}

const Room: FC<IRoom> = ({ room }) => {
  const navigate = useNavigate();
  const goToThePage = () => {
    navigate(`/${room}`);
  };

  return <div onClick={goToThePage}>{room}</div>;
};

export default Room;
