import React from "react";
import "./Button.css";
const Button: React.FC<{
  disabled?: boolean;
  type?: "submit" | "button";
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
}> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      className={`button-18 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
export default Button;
