import ListGroup from "./components/ListGroup";
function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // function
  const handelSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        // function callback
        onSelectItem={handelSelectItem}
      />
    </div>
  );
}

export default App;
