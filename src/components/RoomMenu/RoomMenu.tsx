import classes from "./RoomMenu.module.css";
import { useLocation } from "react-router-dom";
import { ButtonBack } from "../../UI";
import { CreateRoom } from "..";

const RoomMenu = () => {
  const pt = useLocation();
  const room = decodeURIComponent(pt.pathname.replace(/%20/g, " ").slice(1));
  console.log(room);

  return (
    <div className={classes.room}>
      <ButtonBack />
      <span>{room}</span>
      <div className={classes.createRoomWrapper}>
        <CreateRoom isNewUser={true} />
      </div>
    </div>
  );
};

export default RoomMenu;
