import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import Message from "./Message";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // function saat list diklik
  const handelSelectItem = (item: string) => {
    console.log(item);
  };

  // status saat di klik
  const [alertVisible, setAlertVisibility] = useState(false);

  const visibilityToggle = () => {
    // current adalah arg fungsi setAlertVisibility
    // jadi bisa apa aja
    setAlertVisibility((current) => !current);
  };

  // object/array dianggap sebagai immutable
  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  // cara update object dengan membuat object baru
  // tidak bisa langsung dibuat dengan:
  // drink.price = 6;
  // setDrink(drink);
  // jika banyak properties, gunakan '...drink',
  const handleDrinkClick = () => {
    // const newDrink = {
    //   title: drink.title,
    //   price: 6,
    // };
    // setDrink(newDrink);
    setDrink({ ...drink, price: 6 });
  };

  const [customer, setCustomer] = useState({
    name: "John",
    address: {
      city: "San Francisco",
      zipCode: 94111,
    },
  });

  // cara ganti zipCode dalam nested ...customer cuma 1 nest
  const handleCustomerClick = () => {
    setCustomer({
      ...customer,
      address: { ...customer.address, zipCode: 94112 },
    });
  };

  // modifikasi array menggunakan useState
  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleTagsClick = () => {
    // add array
    setTags([...tags, "exciting"]);

    // remove array
    setTags(tags.filter((tag) => tag !== "happy"));

    // update array
    setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleBugClick = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  };

  return (
    <>
      <p>{drink.price}</p>
      <button onClick={handleDrinkClick}>Click Me</button>
      <Message />
      <Like onLike={() => console.log("klik")} />
      <BsFillCalendarFill color="red" size="30" />
      <div>
        <ListGroup
          items={items}
          heading="Cities"
          onSelectItem={handelSelectItem}
        />
      </div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My Alert</Alert>
      )}
      <Button color="secondary" onClick={visibilityToggle}>
        My Button
      </Button>
    </>
  );
}

export default App;
