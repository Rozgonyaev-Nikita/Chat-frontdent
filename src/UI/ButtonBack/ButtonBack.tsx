import { DetailedHTMLProps, FC, ReactNode } from "react";
import classes from "./PTag.module.css";
import { HtmlHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

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
    <button {...props} onClick={back}>
      Назад
    </button>
  );
};

export default ButtonBack;
