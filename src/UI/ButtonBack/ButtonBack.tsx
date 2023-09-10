import { DetailedHTMLProps, FC, ReactNode } from "react";
import classes from "./PTag.module.css";
import { HtmlHTMLAttributes } from "react";

// interface IButtonBack
//   extends DetailedHTMLProps<
//     HtmlHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   > {
//   children: ReactNode;
// }

const ButtonBack: FC<
  DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default ButtonBack;
