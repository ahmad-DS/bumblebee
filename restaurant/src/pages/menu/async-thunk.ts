import { createAsyncThunk } from "@reduxjs/toolkit";
import { simulateFetchMenuCategories, simulateFetchMenuItems } from "../../lib/db-queries";
// import { fetchMenuCategories, fetchMenuItems } from "../../lib/db-queries";
import type { MenuItemState } from "./menuSlice";



export interface RawMenuItem {
  id: string;
  name: string;
  price: number;
  menu_categories: { name: string } | { name: string }[] | null;
}

export const fetchMenuItemsAsync = createAsyncThunk<MenuItemState[]>(
  "menuSlice/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    // const { data, error } = await fetchMenuItems();
    const { data, error } = await simulateFetchMenuItems();
    console.log("Fetched menu items data:", data);
    console.log("Fetched menu items error:", error);
    // if (error) {
    //   throw new Error(error.message);
    // }
    if (error) {
      return rejectWithValue(error.message);
    }
    // The value we return becomes the `fulfilled` action payload
    return (data as RawMenuItem[]).map((item) => ({
      itemId: item.id,
      name: item.name,
      price: item.price,
      // Handle the nested object/array from Supabase
      category: Array.isArray(item.menu_categories)
        ? item.menu_categories[0]?.name
        : item.menu_categories?.name || "Uncategorized",
      quantity: 0, // Default quantity for cart functionality
    }));
  },
);

interface RawMenuCategory {
  name: string;
}

export const fetchMenuCategoriesAsync = createAsyncThunk<string[]>(
  "menuSlice/fetchMenuCategories",
  async (_, { rejectWithValue }) => {
    // const { data, error } = await fetchMenuCategories();
    const { data, error } = await simulateFetchMenuCategories();
    if (error) {
      return rejectWithValue(error.message);
    }
    return (data as RawMenuCategory[]).map((category) => category.name);
  },
);
