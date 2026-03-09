import "./MenuCategory.css";
import { useAppDispatch, useAppSelector } from "../redux-toolkit.hooks";
import { selectCategory } from "../pages/menu/menuSlice";
export interface MenuCategoryProps {
  name: string;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ name }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.menu.currentCategory,
  );
  return (
    <div
      className={`menu-category ${selectedCategory === name ? "selected-category" : ""}`}
    >
      <button onClick={() => dispatch(selectCategory(name))}>{name}</button>
    </div>
  );
};
