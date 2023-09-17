import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addRoom } from "../store/authSlice";

const CreateRoom = () => {
  const [hisLogin, setHisLogin] = useState("");

  const myLogin = useAppSelector((state) => state.auth.user.login);

  const dispatch = useAppDispatch();

  const createRoom = async () => {
    const room = `${myLogin} + ${hisLogin}`;
    let success;
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
          room,
          messages: [],
        });
      } catch (e: unknown) {
        // console.log(e.message);
        console.log("Ошибка при создании чата!");
      }
    }
  };

  return (
    <div>
      <input
        value={hisLogin}
        onChange={(e) => setHisLogin(e.target.value)}
        type="text"
      />
      <button onClick={createRoom}>Отправить</button>
    </div>
  );
};

export default CreateRoom;
