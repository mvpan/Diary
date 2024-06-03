import "./App.css";
import Header from "./components/Header/Header";
import MenuAddButton from "./components/MenuAddButton/MenuAddButton";
import MenuList from "./components/MenuList/MenuList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import MenuForm from "./components/MenuForm/MenuForm";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const aa = JSON.parse(localStorage.getItem("data"));
    if (aa) {
      setData(aa.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);
  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);
  const addItem = (item) => {
    setData((oldItem) => [
      ...oldItem,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: oldItem.length > 0 ? Math.max(...oldItem.map((i) => i.id)) + 1 : 1
      }
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <MenuAddButton />
        <MenuList data={data}></MenuList>
      </LeftPanel>
      <Body>
        <MenuForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
