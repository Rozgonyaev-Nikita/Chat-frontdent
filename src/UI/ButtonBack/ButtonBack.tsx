import { DetailedHTMLProps, FC } from "react";
import classes from "./ButtonBack.module.css";
import { HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretBackSharp } from "react-icons/io5";

// interface IButtonBack
//   extends DetailedHTMLProps<
//     HtmlHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   > {
//   children: ReactNode;
// }

const ButtonBack: FC<
  DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ ...props }) => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <button {...props} className={classes.buttonActive} onClick={back}>
      <IoCaretBackSharp />
    </button>
  );
};

export default ButtonBack;
