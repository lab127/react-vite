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

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // hindari redundand state variable
  // gunakan 2 variable firstName, lastName sebagai object
  // saat menggunakan object, hindari menggunakan nested structure terlalu dalam
  // karena akan kesulitan saat update state
  // contoh pada object contact

  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    // contact: {
    //   address: {
    //     street: "",
    //     state: "",
    //   },
    //   phone: "",
    // },
  });

  return (
    <>
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
