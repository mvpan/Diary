import { forwardRef } from "react";
import styles from "./Input.module.css";
import clas from "classnames";

const Input = forwardRef(function Input(
  { className, isValid, appearence, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={clas(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title"
      })}
    />
  );
});
export default Input;
