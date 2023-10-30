import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router'

export type CartProduct = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  cartQuantity: number
}

export type ProductState = {
  cartItems: CartProduct[]
  cartTotal: number
  cartAmount: number
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
const initialCartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []

const initialState: ProductState = {
  cartItems: initialCartItems,
  cartTotal: 0,
  cartAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //check if the id already exist in cart items []
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 } // increase the product by one if it already exist
        state.cartItems.push(tempProduct)
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product.id !== action.payload.productId
      )
      state.cartItems = filteredItems
    }
  }
})

export const { addToCart, removeProduct } = cartSlice.actions

export default cartSlice.reducer
