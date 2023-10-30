import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import productDetailSlice from './slices/products/productDetailSlice'
import categoriesSlice from './slices/products/categoriesSlice'

import usersSlice from './slices/products/usersSlice'
import cartSlice from './slices/cartSlice'
import { orderSlice } from './slices/products/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    ProductDetails: productDetailSlice,
    users: usersSlice,
    category: categoriesSlice,
    cart: cartSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
