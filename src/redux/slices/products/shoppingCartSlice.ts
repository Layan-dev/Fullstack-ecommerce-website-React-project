import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from './productSlice'

export type Cart = {
  productInfo: Product
  total: number
  productQuantity: number
}

export type CartState = {
  items: Cart[]
  error: null | string
  isLoading: boolean
}

const initialState: CartState = {
  items: [],
  error: null,
  isLoading: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addToCart: (state, action: { payload: { cart: Cart } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.cart, ...state.items]
    },
    removeFromCart: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter(
        (product) => product.productInfo.id !== action.payload.productId
      )
      state.items = filteredItems
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { removeFromCart, addToCart, productsRequest, productsSuccess } = cartSlice.actions

export default cartSlice.reducer
