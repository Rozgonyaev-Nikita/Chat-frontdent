import { FC, useEffect, useState } from "react";
import classes from "./UserList.module.css";
import cn from "classnames";
import { useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";

interface IUserList {
  room: string;
}

const UserList: FC<IUserList> = ({ room }) => {
  const [users, setUsers] = useState<string[]>();
  console.log("roooom", room);
  const isOpen = useAppSelector((state) => state.open.isOpenUser);
  useEffect(() => {
    axios
      .get("https://chat-backend-a7g9.onrender.com/api/getUsersInRoom", {
        params: { room },
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log("об", res.data.users);
      });
  }, [room]);

  return (
    <div
      className={cn({
        [classes.userList]: !isOpen,
        [classes.userListw]: isOpen,
      })}
    >
      {users &&
        users.map((user: string, index: number) => (
          <div key={index} className={classes.userItem}>
            {user}
          </div>
        ))}
    </div>
  );
};

export default UserList;
