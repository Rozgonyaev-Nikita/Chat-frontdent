import axios from "axios";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

const CreateRoom = () => {
  const [hisLogin, setHisLogin] = useState("");

  const myLogin = useAppSelector((state) => state.auth.user.login);

  const createRoom = () => {
    const room = `${myLogin} + ${hisLogin}`;
    try {
      axios.post("http://localhost:5000/api/users/rooms", {
        myLogin,
        hisLogin,
        room,
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
