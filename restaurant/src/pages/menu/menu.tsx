// import './menu.css';
import { useAppDispatch, useAppSelector } from "../../redux-toolkit.hooks";
import { useEffect } from "react";
import { useNavigate, useMatch } from "react-router";
import { Outlet } from "react-router";
import MenuList from "../../components/MenuList";
import { MenuCategory } from "../../components/MenuCategory";
import { fetchMenuItemsAsync, fetchMenuCategoriesAsync } from "./async-thunk";
import "./menu.css";
import Cart from "../../components/Cart";

export function MenuLayout() {
  return (
    <div className="menu-layout">
      <Outlet />
    </div>
  );
}

export default function MenuPage() {
  const navigate = useNavigate();
  const cartOpen = useMatch("/menu/cart");
  const dispatch = useAppDispatch();
  // const cartOpen = useAppSelector((state) => state.menu.cartOpen)
  const menuCategories = useAppSelector((state) => state.menu.categories);
  const totalPrice = useAppSelector((state) => state.menu.totalPrice);
  // const menuItems = useAppSelector((state) => state.menu.items);
  const menuCategoryItems = useAppSelector((state) => {
    const currentCategory = state.menu.currentCategory;
    if (currentCategory.length === 0) {
      return state.menu.items;
    }
    return state.menu.items.filter((item) => item.category === currentCategory);
  });
  console.log("menuCategoryItems:", menuCategoryItems);

  const cartItems = useAppSelector((state) => {
    return state.menu.items.filter((item) => {
      return item.quantity > 0;
    });
  });
  console.log(cartItems);
  const error = useAppSelector((state) => state.menu.error);
  console.log("MenuPage error:", error);
  useEffect(() => {
    // Dispatch the async thunk to fetch menu items when the component mounts
    dispatch(fetchMenuCategoriesAsync());
    dispatch(fetchMenuItemsAsync());
  }, [dispatch]);
  return (
    <div className="menu-page">

      <nav className="menu-categories">
        {menuCategories.map((category) => (
          <MenuCategory key={category} name={category} />
        ))}
      </nav>
      <div
        className="cart-icon"
        onClick={() => navigate("/menu/cart")}
      >
        🛒
      </div>
      <MenuList categoryItems={menuCategoryItems} />

      {cartOpen && <Cart cartItems={cartItems} totalPrice={totalPrice} />}
    </div>
  );
}
