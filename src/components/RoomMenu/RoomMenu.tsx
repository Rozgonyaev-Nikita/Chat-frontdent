import classes from "./RoomMenu.module.css";
import { useLocation } from "react-router-dom";
import { ButtonBack } from "../../UI";
import { CreateRoom } from "..";
import { CiMenuKebab } from "react-icons/ci";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { openUserList } from "../../store/openSlice";

const RoomMenu = () => {
  const pt = useLocation();
  const dispatch = useAppDispatch();
  const room = decodeURIComponent(pt.pathname.replace(/%20/g, " ").slice(1));
  console.log(room);

  return (
    <div className={classes.room}>
      <ButtonBack />
      <span>{room}</span>
      <div className={classes.createRoomWrapper}>
        <CreateRoom isNewUser={true} />
      </div>
      <button
        className={classes.menuWrapper}
        onClick={() => dispatch(openUserList())}
      >
        <CiMenuKebab size="25px" color="gray" />
      </button>
    </div>
  );
};

export default RoomMenu;
