import "./MenuList.css";
import MenuItem from "../MenuItem/MenuItem";
import CardButton from "../CardButton/CardButton";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";

const MenuList = ({ data, setItem }) => {
  const { userId } = useContext(UserContext);

  const sortItem = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };
  const filterData = useMemo(
    () => data.filter((el) => el.userId === userId).sort(sortItem),
    [data, userId]
  );
  if (data.length === 0) {
    return <p>Записей нет</p>;
  }

  return (
    <>
      {filterData.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <MenuItem title={el.title} text={el.text} date={el.date}></MenuItem>
        </CardButton>
      ))}
    </>
  );
};

export default MenuList;
