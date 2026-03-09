import "./CartItem.css";
import type { MenuItemState } from "../pages/menu/menuSlice";

const CartItem: React.FC<MenuItemState> = ({ name, price, quantity }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div>{name}</div>
        <div>
          <span>(Price: ₹{price.toFixed(2)})</span>
        </div>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button>-</button>
          <span className="qty-count">{quantity}</span>
          <button>+</button>
        </div> 
      </div>
    </div>
  );
};

export default CartItem;
