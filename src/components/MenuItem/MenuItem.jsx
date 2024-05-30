import "./MenuItem.css";

const MenuItem = ({ title, text, date }) => {
  const formatDate = new Intl.DateTimeFormat("ru-RU").format(date);

  return (
    <>
      <h2 className="menu-item__header">{title}</h2>
      <div className="menu-item__body">
        <div className="menu-item__date">{formatDate}</div>
        <div className="menu-item__text">{text}</div>
      </div>
    </>
  );
};

export default MenuItem;
