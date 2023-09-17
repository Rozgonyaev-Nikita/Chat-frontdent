import { FC } from "react";
import classes from "./SendPanel.module.css";
import { IoSend } from "react-icons/io5";

interface ISendPanel {
  text: string;
  setText: (text: string) => void;
  sendMessage: () => void;
}

const SendPanel: FC<ISendPanel> = ({ text, setText, sendMessage }) => {
  return (
    <div className={classes.sendPanel}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className={classes.input}
      />
      <button className={classes.button} onClick={sendMessage}>
        <IoSend className={classes.sendIcon} />
      </button>
    </div>
  );
};

export default SendPanel;
