import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import productDetailSlice from './slices/products/productDetailSlice'
import categoriesSlice from './slices/products/categoriesSlice'
import shoppingCartSlice from './slices/products/shoppingCartSlice'
import usersSlice from './slices/products/usersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    ProductDetails: productDetailSlice,
    category: categoriesSlice,
    cart: shoppingCartSlice,
    users: usersSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
