import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import Message from "./Message";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

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
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));

    // dalam penggunaan immer, draft adalah proxy object bug array
    // seperti copy dari draft yang mutable bisa diubah
    setBugs(
      produce((draft) => {
        // jika bug.id === 1
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  // share this state between cart and navbar component
  const [cartItems, setCartItems] = useState(["Product 1", "Product 2"]);

  // exersice 1 -- updating state
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleGameClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };

  // exersice 2 -- updating state
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const handlePizzaClick = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "Cheese"] });
  };

  // exersice 3 -- updating state
  const [productCart, setProductCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleProductCart = () => {
    setProductCart({
      ...productCart,
      items: productCart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
      // kode dibawah ini hanya berfungsi 1x klik, item.quantity maksimal 2 karena items: tidak ditulis
      // ...productCart.items.map((item) =>
      //   item.id === 1 && item.quantity === 1
      //     ? (item.quantity = item.quantity + 1)
      //     : item
      // ),
    });
  };

  return (
    <>
      <div className="exersice-3 updating state">
        <ul>
          {productCart.items.map((item) => (
            <li>
              ID:{item.id} - {item.title}, {item.quantity}
            </li>
          ))}
        </ul>
        <button onClick={handleProductCart}>Add Qty</button>
      </div>
      <div className="exersice-2 updating state">
        <p></p>
        <ul>
          {/* nulis awalnya gini pas di save ada ()
          topping => <li key={topping}>{topping} */}
          {pizza.toppings.map((topping) => (
            <li key={topping}>{topping}</li>
          ))}
        </ul>
        <button onClick={handlePizzaClick}>Add Toppings</button>
      </div>
      <div className="exersice-1 updating state">
        <p>{game.player.name}</p>
        <button onClick={handleGameClick}>Click Player</button>
      </div>
      <div>
        <NavBar cartItemsCount={cartItems.length} />
        <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      </div>
      <div>
        {bugs.map((bug) => (
          <p key={bug.id}>
            {bug.title} {bug.fixed ? "Fixed" : "New"}
          </p>
        ))}
        <button onClick={handleBugClick}>Click Bug</button>
      </div>
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
