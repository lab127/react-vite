interface CartProps {
  cartItems: string[];
  onClear: () => void;
}

const Cart = ({ cartItems, onClear }: CartProps) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear Cart</button>
    </>
  );
};

export default Cart;
