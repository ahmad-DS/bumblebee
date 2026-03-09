import type { MenuItemState } from "../pages/menu/menuSlice";
import { useNavigate } from "react-router";
import "./Cart.css";
import CartItem from "./CartItem";
export interface CartItemProps {
  cartItems: MenuItemState[];
  totalPrice: number;
}

const Cart: React.FC<CartItemProps> = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();
  return (
    <div className="cart">
      <h2>Cart</h2>
      <button onClick={() => navigate("/menu")}>Close</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.itemId} {...cartItem} />
          ))}
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
      <button className="place-order" disabled={cartItems.length === 0} onClick={() => alert("Order placed!")}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;
