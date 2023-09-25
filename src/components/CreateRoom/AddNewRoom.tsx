import { FC, useEffect, useRef } from "react";
import classes from "./CreateRoom.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";
import { addRoom } from "../../store/authSlice";
import { useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { BsSendPlusFill } from "react-icons/bs";

interface IAddNewRoom {
  hisLogin: string;
  setHisLogin: (hisLogin: string) => void;
  setOpen: (isOpen: boolean) => void;
  isNewUser: boolean;
}

const AddNewRoom: FC<IAddNewRoom> = ({
  hisLogin,
  setHisLogin,
  setOpen,
  isNewUser,
}) => {
  const myLogin = useAppSelector((state) => state.auth.user.login);

  const inputRef = useRef<HTMLInputElement>(null);
  const pt = useLocation();

  const dispatch = useAppDispatch();
  const createRoom = async () => {
    const room = `${myLogin} + ${hisLogin}`;
    let success;
    if (!isNewUser) {
      try {
        const res = await axios.post(
          "https://chat-backend-a7g9.onrender.com/api/users/rooms",
          {
            myLogin,
            hisLogin,
            room,
          }
        );
        success = res;
        dispatch(addRoom(room));
      } catch (e: unknown) {
        // console.log(e.message);
        console.log("Ошибка!");
      }

      if (success?.status !== 200) {
        console.log("Новый чат не создан!");
      } else {
        try {
          axios.post("https://chat-backend-a7g9.onrender.com/api/createChat", {
            myLogin,
            hisLogin,
            room,
            messages: [],
          });
          setOpen(false);
        } catch (e: unknown) {
          // console.log(e.message);
          console.log("Ошибка при создании чата!");
        }
      }
    } else {
      //fg
      try {
        const room = decodeURIComponent(
          pt.pathname.replace(/%20/g, " ").slice(1)
        );
        console.log(room);
        await axios.post(
          "https://chat-backend-a7g9.onrender.com/api/usersInRoomsAdd",
          {
            hisLogin,
            room,
          }
        );
        // success = res;
        // dispatch(addRoom(room));
        setOpen(false);
      } catch (e: unknown) {
        console.log("Ошибка!");
      }
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={classes.createRoomBlock}>
      <div className={classes.form}>
        <TiArrowBack onClick={() => setOpen(false)} />
        <input
          ref={inputRef}
          placeholder="Введите имя пользователя..."
          value={hisLogin}
          onChange={(e) => setHisLogin(e.target.value)}
          type="text"
          className={classes.input}
        />
        <button onClick={createRoom} className={classes.button}>
          Отправить
        </button>
        <button onClick={createRoom} className={classes.sendButton}>
          <BsSendPlusFill
            className={classes.sendIcon}
            size="20px"
            color="grey"
          />
        </button>
      </div>
    </div>
  );
};

export default AddNewRoom;
