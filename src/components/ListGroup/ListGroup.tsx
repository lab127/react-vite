import { useState } from "react";
import styles from "./ListGroup.module.css";

// props immutable, seperti funsi variable
interface ListGroupProps {
  items: string[];
  heading: string;
  // define arrow function props
  onSelectItem: (item: string) => void;
}

// Params props
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // useState mutable, seperti local variable
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item Found</p>}
      <ul
        className={[styles.listGroup, styles.container].join(" ")}
        // rename dash -
        // background-color jadi backgroundColor
        style={{ backgroundColor: "blue" }}
      >
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              // call function onSelectItem: (item: string) => void
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
