import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAllTablesAsync, fetchTableAllOrdersAsync } from "./async-thunk";
import type { OrderInfo } from "../../lib/db-queries";

export interface Table {
  tableNumber: number;
  status: "AVAILABLE" | "OCCUPIED";
}

export interface BillingState {
  tables: Table[];
  selectedTable: Table | null;
  selectedTableOrdersInfo: OrderInfo[];
  error: string | null;
  loading: boolean;
}

// Define the initial value for the slice state
const initialState: BillingState = {
  tables: [],
  selectedTable: null,
  selectedTableOrdersInfo: [],
  error: null,
  loading: false,
};

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const billingSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    chooseTable: (state, action: PayloadAction<Table>) => {
      state.selectedTable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTablesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTablesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchAllTablesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
    builder
      .addCase(fetchTableAllOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableAllOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTableOrdersInfo = action.payload;
      })
      .addCase(fetchTableAllOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Export the generated action creators for use in components
export const { chooseTable } = billingSlice.actions;

// Export the slice reducer for use in the store configuration
export default billingSlice.reducer;
