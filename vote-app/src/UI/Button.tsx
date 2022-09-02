import React from "react";
import "./Button.css";
const Button: React.FC<{
  type?: "submit";
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`button-18 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
export default Button;
