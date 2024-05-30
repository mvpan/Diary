import "./App.css";
import Header from "./components/Header/Header";
import MenuAddButton from "./components/MenuAddButton/MenuAddButton";
import MenuList from "./components/MenuList/MenuList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import MenuForm from "./components/MenuForm/MenuForm";
import { useState } from "react";

const DATA = [
  {
    id: 1,
    title: "Привет",
    text: "Пока",
    date: new Date()
  },
  {
    id: 2,
    title: "Привет",
    text: "Пока",
    date: new Date()
  }
];

function App() {
  const [data, setData] = useState(DATA);
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
