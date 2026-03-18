import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './pages/menu/menuSlice'
import billingReducer from "./pages/billing/billingSlice"
// ...

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    billing: billingReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch