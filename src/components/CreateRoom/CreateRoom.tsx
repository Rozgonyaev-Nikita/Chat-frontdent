import { FC, useState } from "react";
import classes from "./CreateRoom.module.css";
import { HiPlusCircle } from "react-icons/hi";
import AddNewRoom from "./AddNewRoom";
import cn from "classnames";

interface ICreateRoom {
  isInline?: boolean;
}

const CreateRoom: FC<ICreateRoom> = ({ isInline = false }) => {
  const [hisLogin, setHisLogin] = useState("");
  const [isOpen, setOpen] = useState(false);

  if (!isOpen) {
    return (
      <div
        className={cn(classes.createRoomBlock, {
          [classes.createRoomInline]: isInline,
        })}
      >
        <div className={classes.closeDiv}>
          <HiPlusCircle size="30px" onClick={() => setOpen(true)} />
        </div>
      </div>
    );
  }

  return (
    <AddNewRoom
      isInline={isInline}
      hisLogin={hisLogin}
      setHisLogin={setHisLogin}
      setOpen={setOpen}
    />
  );
};

export default CreateRoom;
