import "./App.css";
import Header from "./components/Header/Header";
import MenuAddButton from "./components/MenuAddButton/MenuAddButton";
import MenuList from "./components/MenuList/MenuList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import MenuForm from "./components/MenuForm/MenuForm";
import { useLocalStorage } from "./hooks/uselocalstorage";
import { UserContextProvide } from "./context/user.context";
import { useState } from "react";

function mapItems(item) {
  if (!item) {
    return [];
  }
  return item.map((i) => ({ ...i, date: new Date(i.date) }));
}
function App() {
  const [data, setData] = useLocalStorage(["data"]);
  const [selectItem, setSelectItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setData([
        ...mapItems(data),
        {
          ...item,
          date: new Date(item.date),
          id: data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1
        }
      ]);
    } else {
      setData([
        ...mapItems(data).map((i) => {
          if (i.id === item.id) {
            return { ...item };
          }
          return i;
        })
      ]);
    }
  };

  const deleteItem = (id) => {
    setData([...data.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvide>
      <div className="app">
        <LeftPanel>
          <Header />
          <MenuAddButton clearForm={() => setSelectItem(null)} />
          <MenuList data={mapItems(data)} setItem={setSelectItem}></MenuList>
        </LeftPanel>
        <Body>
          <MenuForm
            onSubmit={addItem}
            data={selectItem}
            onDelete={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvide>
  );
}

export default App;
