import { useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import styles from "./MenuForm.module.css";
import clas from "classnames";
import { INITIAL_STATE, formReducer } from "./MenuForm.state";

const MenuForm = ({ onSubmit }) => {
  const [formValid, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formValid;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = () => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timer;
    if (!isValid.title || !isValid.date || !isValid.post) {
      focusError(isValid);
      timer = setTimeout(() => {
        dispatchForm({ type: "RESET_VALID" });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isValid]);
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);
  const onChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value }
    });
  };
  const addMenuItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <form className={styles["menu-form"]} onSubmit={addMenuItem}>
      <div>
        <input
          type="title"
          name="title"
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          className={clas(styles["input-title"], {
            [styles["invalid"]]: !isValid.title
          })}
        />
      </div>
      <div className={styles["form__row"]}>
        <label htmlFor="date" className={styles["form__label"]}>
          <img src="/calendar.svg" alt="Календарь" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          ref={dateRef}
          value={values.date}
          onChange={onChange}
          className={`${styles["input"]} ${
            isValid.date ? "" : styles["invalid"]
          }`}
        />
      </div>
      <div className={styles["form__row"]}>
        <label htmlFor="tag" className={styles["form__label"]}>
          <img src="/folder.svg" alt="Папка" />
          <span>Тег</span>
        </label>
        <input
          type="text"
          name="tag"
          value={values.tag}
          onChange={onChange}
          className={styles["input"]}
        />
      </div>
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        value={values.post}
        ref={postRef}
        onChange={onChange}
        className={`${styles["input"]} ${
          isValid.post ? "" : styles["invalid"]
        }`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default MenuForm;
