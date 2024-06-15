import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import styles from "./MenuForm.module.css";
import { INITIAL_STATE, formReducer } from "./MenuForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

const MenuForm = ({ onSubmit, data, onDelete }) => {
  const [formValid, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formValid;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

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
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({
      type: "SET_VALUE",
      payload: { ...data }
    });
  }, [data, userId]);
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
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId }
      });
    }
  }, [isFormReadyToSubmit, onSubmit, userId, values]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId }
    });
  }, [userId]);
  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value }
    });
  };
  const addMenuItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };
  const deleteItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId }
    });
  };

  return (
    <form className={styles["menu-form"]} onSubmit={addMenuItem}>
      <div className={styles["form__row"]}>
        <Input
          type="title"
          name="title"
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          isValid={isValid.title}
          appearence={"title"}
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={deleteItem}
          >
            <img src="/delete.svg" alt="Кнопка удалить" />
          </button>
        )}
      </div>
      <div className={styles["form__row"]}>
        <label htmlFor="date" className={styles["form__label"]}>
          <img src="/calendar.svg" alt="Календарь" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          onChange={onChange}
          isValid={isValid.date}
        />
      </div>
      <div className={styles["form__row"]}>
        <label htmlFor="tag" className={styles["form__label"]}>
          <img src="/folder.svg" alt="Папка" />
          <span>Тег</span>
        </label>
        <Input
          type="text"
          name="tag"
          value={values.tag}
          onChange={onChange}
          isValid={isValid}
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
      <Button>Сохранить</Button>
    </form>
  );
};

export default MenuForm;
