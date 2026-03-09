import "./MenuItem.css";
import type { MenuItemState } from "../pages/menu/menuSlice";
import { addItemOrIncrement, removeItemOrDecrement } from "../pages/menu/menuSlice";
import { useAppDispatch } from "../redux-toolkit.hooks";

// Move the sub-component outside or handle it inline for better performance
export default function MenuItem(props: MenuItemState) {
  const { name, description, price, quantity } = props;
  const dispatch = useAppDispatch();

  // Helper handlers to keep the JSX clean
  const handleAdd = () => dispatch(addItemOrIncrement(props));
  const handleRemove = () => dispatch(removeItemOrDecrement(props));

  return (
    <div className="menu-item">
      <div className="menu-item-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      
      <div className="menu-item-footer">
        <span className="price">₹{price.toFixed(2)}</span>
        
        {quantity > 0 ? (
          <div className="quantity-controls">
            <button onClick={handleRemove}>-</button>
            <span className="qty-count">{quantity}</span>
            <button onClick={handleAdd}>+</button>
          </div>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}