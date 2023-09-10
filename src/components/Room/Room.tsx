import React, { FC } from "react";

interface IRoom {
  room: string;
}

const Room: FC<IRoom> = ({ room }) => {
  return <div>{room}</div>;
};

export default Room;
