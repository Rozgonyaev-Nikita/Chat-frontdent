import { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { CreateRoom } from "../components";
import { Room } from "../components";
import "../App.css";

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
  console.log(user);

  return (
    <div className="roomList">
      <CreateRoom />
      <hr className="hr" />
      <div>
        {user.rooms.length ? (
          user.rooms.map((room, index) => <Room key={index} room={room}></Room>)
        ) : (
          <h2>Вы не состоите не в одной чате</h2>
        )}
      </div>
    </div>
  );
}

export default RoomList;
