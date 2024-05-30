import "./MenuList.css";
import MenuItem from "../MenuItem/MenuItem";
import CardButton from "../CardButton/CardButton";

const MenuList = ({ data }) => {
  if (data.length === 0) {
    return <p>Записей нет</p>;
  }
  const sortItem = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <>
      {data.sort(sortItem).map((el) => (
        <CardButton key={el.id}>
          <MenuItem title={el.title} text={el.text} date={el.date}></MenuItem>
        </CardButton>
      ))}
    </>
  );
};

export default MenuList;
