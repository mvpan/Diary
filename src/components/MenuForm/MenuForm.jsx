import Button from "../Button/Button";
import "./MenuForm.css";

const MenuForm = ({ onSubmit }) => {
  const addMenuItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };
  return (
    <form className="menu-form" onSubmit={addMenuItem}>
      <input type="title" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea name="text" id="" cols="30" rows="10"></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default MenuForm;
