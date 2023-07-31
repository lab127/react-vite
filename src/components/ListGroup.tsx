function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  return (
    <>
      <h1>List</h1> {/* React.createElement('h1') */}
      <ul className="list-group">
        {/* gunakan map karena nggak bisa pakai for */}
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
