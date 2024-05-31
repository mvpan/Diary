import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./MenuForm.module.css";
import clas from "classnames";

const INITIAL_STATE = {
  title: true,
  post: true,
  date: true
};

const MenuForm = ({ onSubmit }) => {
  const [formValid, setFormValid] = useState(INITIAL_STATE);

  useEffect(() => {
    let timer;
    if (!formValid.title || !formValid.date || !formValid.post) {
      timer = setTimeout(() => {
        setFormValid(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [formValid]);

  const addMenuItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    if (!formProps.title.trim().length) {
      setFormValid((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValid((state) => ({ ...state, title: true }));
    }
    if (!formProps.post.trim().length) {
      setFormValid((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValid((state) => ({ ...state, post: true }));
    }
    if (!formProps.date) {
      setFormValid((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValid((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles["menu-form"]} onSubmit={addMenuItem}>
      <div>
        <input
          type="title"
          name="title"
          className={clas(styles["input-title"], {
            [styles["invalid"]]: !formValid.date
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
          className={`${styles["input"]} ${
            formValid.date ? "" : styles["invalid"]
          }`}
        />
      </div>
      <div className={styles["form__row"]}>
        <label htmlFor="tag" className={styles["form__label"]}>
          <img src="/folder.svg" alt="Папка" />
          <span>Тег</span>
        </label>
        <input type="text" name="tag" className={styles["input"]} />
      </div>
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={`${styles["input"]} ${
          formValid.post ? "" : styles["invalid"]
        }`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default MenuForm;
