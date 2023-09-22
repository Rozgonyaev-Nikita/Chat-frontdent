import { FC, useState } from "react";
import classes from "./CreateRoom.module.css";
import { HiPlusCircle } from "react-icons/hi";
import AddNewRoom from "./AddNewRoom";
import cn from "classnames";

interface ICreateRoom {
  isNewUser?: boolean;
}

const CreateRoom: FC<ICreateRoom> = ({ isNewUser = false }) => {
  const [hisLogin, setHisLogin] = useState("");
  const [isOpen, setOpen] = useState(false);

  if (!isOpen) {
    return (
      <div
        className={cn(classes.createRoomBlock, {
          [classes.createRoomInline]: isNewUser,
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
      isNewUser={isNewUser}
      hisLogin={hisLogin}
      setHisLogin={setHisLogin}
      setOpen={setOpen}
    />
  );
};

export default CreateRoom;
