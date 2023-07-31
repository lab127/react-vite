import { MouseEvent } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // Event Handler
  // event: MouseEvent -> type anotation typescript
  const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item Found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={handleClick}
            // onClick={(event) => console.log(event)}
            // hover event buat lihat type event: React.MouseEvent
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
