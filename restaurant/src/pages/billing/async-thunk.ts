import { createAsyncThunk } from "@reduxjs/toolkit";
import { simulateFetchAllTables, simulateFetchTableAllOrders } from "../../lib/db-queries";

export const fetchAllTablesAsync = createAsyncThunk(
  "billingSlice/fetchTables",
  async (_, { rejectWithValue }) => {
    const { data, error } = await simulateFetchAllTables();

    if (error) return rejectWithValue(error.message);
    return data.map((field) => {
      return {
        tableNumber: field.table_number,
        status: field.status,
      };
    });
  },
);

export const fetchTableAllOrdersAsync = createAsyncThunk(
  "billingSlice/fetchTableAllOrders",
  async (tableNumber: number, { rejectWithValue}) => {
    const { data, error } = await simulateFetchTableAllOrders(tableNumber);
    if (error) return rejectWithValue(error.message);

    return data;
  }
)
