import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addRoom } from "../store/authSlice";

const CreateRoom = () => {
  const [hisLogin, setHisLogin] = useState("");

  const myLogin = useAppSelector((state) => state.auth.user.login);

  const dispatch = useAppDispatch();

  const createRoom = () => {
    const room = `${myLogin} + ${hisLogin}`;
    try {
      axios.post("http://localhost:5000/api/users/rooms", {
        myLogin,
        hisLogin,
        room,
      });
      dispatch(addRoom(room));
    } catch (e: unknown) {
      console.log(e.message);
    }

    try {
      axios.post("http://localhost:5000/api/createChat", {
        room,
        messages: [],
      });
    } catch (e: unknown) {
      console.log(e.message);
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
