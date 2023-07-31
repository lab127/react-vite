import { useState } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  // hook (-1) initial value yang nanti berubah-ubah
  // index numerik range 0-4
  // jika gunakan nilai (1) maka "San Francisco" otomatis aktif saat pertama kali refresh
  // maka gunakan nilai negatif (-1) agar tidak terpilih di awal
  // value useSate selalu array ada 2 [initail value, value diubah]
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item Found</p>}
      <ul className="list-group">
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
