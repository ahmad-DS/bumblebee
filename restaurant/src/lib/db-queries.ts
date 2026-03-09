import { supabase } from "./supabase";
import type { RawMenuItem } from "../pages/menu/async-thunk";
import type { MenuItemState } from "../pages/menu/menuSlice";
import type { PostgrestError } from "@supabase/supabase-js";

export const fetchMenuCategories = async () => {
  const { data, error } = await supabase
    .from("menu_categories")
    .select("name");
    
  return { data, error };
}

export const simulateFetchMenuCategories = async () => new Promise<{ data: { name: string }[]; error: Error | null }>((resolve) => {
  setTimeout(() => {
    resolve({
      data: [
        { name: "Appetizers" },
        { name: "Main Courses" },
        { name: "Desserts" },
        { name: "Beverages" },
      ],
      error: null,
    });
  }, 1000); // Simulate a 1-second delay
  // reject(new Error("Failed to fetch menu categories")); // Simulate an error
});

export const fetchMenuItems = async () => {
  // get full menu with categories
  const { data, error } = await supabase
    .from("menu_items")
    .select(`id, name, price, menu_categories(name)`)
    .eq("is_available", true);
    
  return { data, error };
};

export const simulateFetchMenuItems = async () => new Promise<{ data: RawMenuItem[]; error: Error | null }>((resolve) => {
  setTimeout(() => {
    resolve({
      data: [
        { id: "1", name: "Spring Rolls", price: 5.99, menu_categories: { name: "Appetizers" } },
        { id: "2", name: "Grilled Chicken", price: 12.99, menu_categories: { name: "Main Courses" } },
        { id: "3", name: "Chocolate Cake", price: 6.99, menu_categories: { name: "Desserts" } },
        { id: "4", name: "Lemonade", price: 2.99, menu_categories: { name: "Beverages" } },
      ],
      error: null,
    });
  }, 1000); // Simulate a 1-second delay
  // reject(new Error("Failed to fetch menu items")); // Simulate an error
});

interface Table {
  id: string;
  table_number: number;
  status: "AVAILABLE" | "OCCUPIED";
}
export const findTable  = async (tableNumber: number) => {
  const { data, error }: { data: Table | null; error: PostgrestError | null } = await supabase
    .from("tables")
    .select("id, table_number, status")
    .eq("table_number", tableNumber)
    .single();
    
  return { data, error };
}
interface OrderInfo {
  tableId: number;
  items: MenuItemState[];
  totalPrice: number;
}

export const placeOrder = async (orderInfo: OrderInfo) => {
  try {
    const { data, error } = await supabase
    .from("orders")
    .insert({
      table_id: orderInfo.tableId,
      total_amount: orderInfo.totalPrice,
    })
    .select("id")
    .single();
    if (error) {
      throw error;
    }
    const orderId = data.id;
    const orderItems = orderInfo.items.map((item) => ({
      order_id: orderId,
      menu_item_id: item.itemId,
      price: item.price,
      quantity: item.quantity,
    }));
    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (orderItemsError) {
      throw orderItemsError;
    }
    return { data, error };
  } catch (error) {
    console.error("Error placing order:", error);
    return { data: null, error };
  }
}

// export const getAllCurrentOrders = async (tableNumber: number) => {
  
// }
