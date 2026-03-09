import MenuItem from "./MenuItem";
import type { MenuItemState } from "../pages/menu/menuSlice";

export interface MenuListStateProps {
  categoryItems: MenuItemState[];
}

export default function MenuList({ categoryItems }: MenuListStateProps) {
  return (
    <div className="menu-list">
      {categoryItems.map((item) => (
        <MenuItem key={item.itemId} {...item} />
      ))}
    </div>
  );
}
