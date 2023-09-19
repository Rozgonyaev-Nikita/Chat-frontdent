import { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { CreateRoom } from "../components";
import { Room } from "../components";

function RoomList() {
  const navigate = useNavigate();

  const { isAuth, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      console.log("авторизирован");
    } else {
      navigate("/avtorization");
    }
  }, [isAuth, navigate]);

  return (
    <div className="roomList">
      <CreateRoom />
      <div>
        {user.rooms.map((room, index) => (
          <Room key={index} room={room}></Room>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
