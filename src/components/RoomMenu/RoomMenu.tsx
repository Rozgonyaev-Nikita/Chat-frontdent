import classes from "./RoomMenu.module.css";
import { useLocation } from "react-router-dom";
import { ButtonBack } from "../../UI";

const RoomMenu = () => {
  const pt = useLocation();
  const room = pt.pathname.replace(/%20/g, " ").slice(1);
  console.log(room);

  return (
    <div className={classes.room}>
      <ButtonBack />
      <span>{room}</span>
    </div>
  );
};

export default RoomMenu;
