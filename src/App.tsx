import { useEffect, useRef, useState } from "react";
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
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import "./index.css";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseCategories from "./expense-tracker/components/ExpenseCategories";
import ProductList from "./components/ProductList";
// import axios from "axios";
// pengganti import axios
import apiClients, { AxiosError, CanceledError } from "./services/api-clients";

// cara export immutable variable
export const CategoryList = ["News", "Food", "Entertainment"] as const;

// p1.7.4 efffect clean up - START
const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");
// p1.7.4 - END

// p1.7.4 - Fetching Data - START
// langsung tambahkan setelah axios.get<UserResType[]>
interface UserResType {
  id: number;
  name: string;
}
// p1.7.5 - END

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
    // setAlertVisibility(!alertVisible);
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

  // p1.6.10 - Project- Expense Tracker - START
  const expenseArr = [
    { id: 1, description: "aa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbbb", amount: 10, category: "Utilities" },
    { id: 3, description: "cccc", amount: 10, category: "Utilities" },
    { id: 4, description: "adddda", amount: 10, category: "Entertainment" },
  ];

  const categories = ["Groceries", "Utilities", "Entertainment"];

  const [expenseItem, setExpenseItem] = useState(expenseArr);

  const [selectedCategory, setSelectedCategory] = useState("");

  const expenseVisibility = selectedCategory
    ? expenseItem.filter((e) => e.category === selectedCategory)
    : expenseItem;

  const delExpenseItem = (itemId: number) => {
    setExpenseItem(expenseItem.filter((item) => item.id !== itemId));
  };

  const [cateMsg, setCateMsg] = useState("");

  const addExpense = (data: { description: string; amount: number }) => {
    if (selectedCategory !== "") {
      setExpenseItem([
        ...expenseItem,
        {
          id: expenseItem[expenseItem.length - 1].id + 1,
          description: data.description,
          amount: data.amount,
          category: selectedCategory,
        },
      ]);
      setCateMsg("");
    } else {
      setCateMsg("Category is required.");
    }
  };
  // p1.6.10 - END

  // p1.7.2 understanding effect hook - start
  const ref = useRef<HTMLInputElement>(null);

  // after render
  // tiap function dalam useEffect akan dipanggil setelah render
  // tidak bisa dipanggil dalam loop, atau statement
  // useEffect bisa dipanggil berapa kali
  // useEffect(() => {
  //   if (ref.current) ref.current.focus();
  // });

  useEffect(() => {
    // mengganti <title>, tetapi jika dilihat dengan view page source. yang terlihat adalah title lama
    document.title = "React App";
  });

  // p1.7.2 understanding effect hook - end

  // p1.7.3 effect dependencies - start
  const [productCategory, setProductCategory] = useState("");
  // p1.7.3 - end

  // p1.7.4 efffect clean up - start
  useEffect(() => {
    connect();
    // return: clean up connect() effect
    return () => disconnect();
  });
  // p1.7.4 - end

  // p1.7.5, 7, 9, 10 - START
  // p1.7.5 Fetching Data
  // tambahkan <UserResType[]> untuk definiskan data type useState() agar bisa dipanggil di useEffect()
  const [userJson, setUserJson] = useState<UserResType[]>([]);
  // init buat menjunjukan error di html
  const [userError, setUserError] = useState("");
  // p1.7.10 Show loading indicator while fetching data
  const [isLoading, setLoading] = useState(false);

  // p.1.7.9 - canceling a fetch requeest
  // saat fetch data menggunkan useEffect, perlu clean-up function(dikonek), jika data sudah tidak diperlukan lagi
  useEffect(() => {
    // controller buat cancel digunakan untuk arg ke-2 axios.get sebagai axios config
    const controller = new AbortController();
    // proses `get` dari server tidak akan terjadi secara langsung dan ada jeda.
    // `get` method return promise, di sini `.then` adalah promise
    // promise adalah return `get` baik sukses atau gagal dari asynchronous operation
    // asynchronous: term digunakan jika proses lama

    // p1.7.10 panggil loading sebelum fetch ke server
    setLoading(true);
    // p1.6.14 axios. ganti apiClient biar nggak redundant, karena base url udah ada di apiClient
    apiClients
      .get<UserResType[]>("/users", { signal: controller.signal })
      // axios
      //   .get<UserResType[]>("https://jsonplaceholder.typicode.com/users", {
      //     signal: controller.signal,
      //   })
      // `.then()` adalah promise dengan return callback function
      // `res.data[0].` tidak ada auto completion, maka perlu didefinisikan shape userJson object dengan interface dan tambahkan setelah `get` method `.get<UserResType[]>` dan `useState`
      .then((res) => {
        setUserJson(res.data);
        // p1.7.10 sembunyikan loader saat fetch data sukses
        setLoading(false);
      })
      // p1.7.7 Handling Errors
      // di javascript tiap promise mempunyai method `catch` yang bisa digunakan untuk menunjukan kegagalan saat menjalankan promise.
      // Dalam hal ini, menunjukan jika fetch dari `axios.get` dengan promise `.then` gagal
      // pengecekan error bisa praktekan dengan mengubah url endpoint invalid
      // contoh: https://jsonplaceholder.typicode.com/users-error
      // err.message nggak perlu interface
      // err adalah object jadi ada beberapa properti, salah satunya adalah `name`
      .catch((err) => {
        // entah kenapa: if (err instanceof CanceledError) return; jadi Cannot find name 'CanceledError'.ts
        // ternyata CanceledError harus di import dari axios
        // import {CanceledError} from "axios";
        // alternative err.name === "CanceledError", karena hanya conditional
        if (err.name === "CanceledError") return;
        setUserError(err.message + "-- " + err.name);
        // p1.7.10 sembunyikan loader jika error
        setLoading(false);
        // p1.7.10 - END
      });
    return () => controller.abort();
    // tambahkan empty array `[]` setelah arrow function agar tidak terjadi infinite loop
  }, []);
  // p1.7.5, 7 - End

  // p1.7.8 - Cara lain fetch data dengan `async` dan `await` keyword
  useEffect(() => {
    const fetchUsers = async () => {
      // gunakan try catch sebagai ganti dari `.catch` promise error`
      try {
        // buat variable untuk return value, digunakan oleh useState
        // const res = await axios.get<UserResType[]>(
        //   "https://jsonplaceholder.typicode.com/users"
        // );
        // p1.6.14 axios. ganti dengan apiClients.
        const res = await apiClients.get<UserResType[]>("/users");
        setUserJson(res.data);
      } catch (error) {
        // untuk mengetahui AxiosError, error dari axios.get adalah object. Maka bisa dilihat dengan error.name
        // type anotation tidak bisa digunakan di `catch` try/catch, maka gunakan `as` keyword seperti dibawah
        setUserError((error as AxiosError).message);
      }
    };
    // panggil function fetchUsers
    fetchUsers();
    // jangan lupa empty array
  }, []);
  // p1.7.8 - end

  // p1.7.11 Deleting Data
  const onDeleteUser = (user: UserResType) => {
    const originalUsers = [...userJson];
    setUserJson(userJson.filter((u) => u.id !== user.id));
    // p1.6.14 axios. ganti dengan apiClients.
    // axios
    //   .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
    //   .catch((err) => {
    //     setUserError(err.message);
    //     // jika error userJson kembali ke data aslinya
    //     setUserJson(originalUsers);
    //   });
    apiClients.delete("/users/" + user.id).catch((err) => {
      setUserError(err.message);
      // jika error userJson kembali ke data aslinya
      setUserJson(originalUsers);
    });
  };
  // p1.7.11 End
  // p1.7.12 Creating Data - Start
  const addUser = () => {
    const newUser = { id: 0, name: "Aris" };
    const originalUsers = [...userJson];
    // di useSate, posisi newUser bebas, bisa di awal atau ahir
    setUserJson([newUser, ...userJson]);
    // p1.6.14 axios. ganti dengan apiClients.
    apiClients
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUserJson([savedUser, ...userJson]))
      .catch((err) => {
        setUserError(err.message);
        setUserJson(originalUsers);
      });
    // axios
    //   .post("https://jsonplaceholder.typicode.com/users", newUser)
    //   .then(({ data: savedUser }) => setUserJson([savedUser, ...userJson]))
    //   .catch((err) => {
    //     setUserError(err.message);
    //     setUserJson(originalUsers);
    //   });
  };
  // p1.7.12 - End
  // p1.7.13 - Updating Data - start
  const onUpdateUser = (user: UserResType) => {
    const originalUsers = [...userJson];
    const updatedUser = { ...user, name: user.name + " updated!" };
    setUserJson(
      userJson.map((usr) => (usr.id === user.id ? updatedUser : usr))
    );

    // p1.6.13 axios.put untuk 1 object
    // p1.6.13 axios.patch untuk 1+ object property
    // p1.6.14 axios. ganti dengan apiClients.
    apiClients.patch("/users/" + user.id, updatedUser).catch((err) => {
      setUserError(err.message);
      setUserJson(originalUsers);
    });
    // axios
    //   .patch(
    //     "https://jsonplaceholder.typicode.com/users/" + user.id,
    //     updatedUser
    //   )
    //   .catch((err) => {
    //     setUserError(err.message);
    //     setUserJson(originalUsers);
    //   });
  };
  // p1.7.13 - END
  return (
    <>
      {/* p1.7.12 Creating Data */}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      {/* p1.7.12 - End */}
      {/* p1.7.10 showing loading indicator */}
      {isLoading && <div className="spinner-border" role="status"></div>}
      {/* p1.7.5- Fetching Data- start */}
      {userError && <p className="text-danger">{userError}</p>}
      <ul className="list-group mb-3">
        {userJson.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            {/* p1.7.13 */}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => onUpdateUser(user)}
              >
                Update
              </button>
              {/* p1.7.11 */}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* p1.7.5- END */}
      {/* p1.7.3 start */}
      <select
        onChange={(event) => setProductCategory(event.target.value)}
        className="form-select"
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={productCategory} />
      <div>
        <input ref={ref} type="text" />
      </div>
      {/* p1.7.3 end */}
      {/* p1.6.10 - Project- Expense Tracker - START */}
      <div>
        <ExpenseForm
          onExpenseHandle={
            (data) => addExpense(data)
            // selectedCategory !== ""
            //   ? addExpense(data)
            //   : console.log("Category required")
          }
        />
        <ExpenseCategories
          categories={categories}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
        <p className="text-danger">{cateMsg}</p>
        <ExpenseList expenses={expenseVisibility} onDelete={delExpenseItem} />
      </div>
      {/* p1.6.10 - END */}
      <hr />
      <div className="p-1-6-2-building-form">
        <Form />
      </div>
      <div className="exersice-13-1 build-expandable-text">
        <ExpandableText maxChar={40}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          facilis quas, sequi ipsa similique at cumque natus veritatis maiores
          mollitia culpa eius, temporibus assumenda nemo saepe corrupti dolorum
          soluta beatae voluptatem vitae voluptate tempore quia! Necessitatibus
          voluptatum tempore inventore distinctio nisi, mollitia ex neque
          consectetur odio modi magni blanditiis eos, laudantium, voluptatibus
          quae illo laboriosam in adipisci fuga accusantium cupiditate ipsam
          porro! Nesciunt, laudantium mollitia expedita dolores perferendis aut
          molestias pariatur, quia at repudiandae, optio nemo dolorum. Quas quam
          a quod atque at ad soluta, laboriosam dolorem accusantium velit!
          Molestiae, consequatur unde dignissimos libero aliquid obcaecati aut
          minima delectus esse accusantium? Velit illum autem veritatis quas
          fuga natus, laborum minus! Aliquam velit quasi voluptate nisi iusto
          sed esse iure quia cum. Odio tempora, inventore ipsam officiis
          consequuntur aspernatur dolorum laborum, praesentium recusandae minus
          numquam voluptatem et similique labore iure, ipsum natus excepturi
          non. Odit rerum odio harum esse, praesentium mollitia?
        </ExpandableText>
      </div>
      <div className="exersice-3 updating state">
        <ul>
          {productCart.items.map((item) => (
            // harus ada key props
            <li key={item.id}>
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
