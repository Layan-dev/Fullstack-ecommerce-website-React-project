import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router'
import { toast } from 'react-toastify'

export type CartProduct = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  cartQuantity: number
  price: number
}

export type ProductState = {
  cartItems: CartProduct[]
  cartTotal: number
  cartAmount: number
}

// const cartItemsFromStorage = localStorage.getItem('cartItems')
// const initialCartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []

const initialState: ProductState = {
  cartItems: [],
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
        toast.info(`${action.payload.name} cart Quantity`, {
          position: 'bottom-left'
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 } // increase the product by one if it already exist
        state.cartItems.push(tempProduct)

        toast.success(' added to cart', {
          position: 'bottom-left'
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product.id !== action.payload.productId
      )
      state.cartItems = filteredItems
    },
    decreaseCart: (state, action: { payload: { productId: number } }) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.productId
      )
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1
        toast.info(`${action.payload.productId} idk`, {
          position: 'bottom-left'
        })
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const filteredItems = state.cartItems.filter(
          (product) => product.id !== action.payload.productId
        )
        state.cartItems = filteredItems
        toast.error(`${action.payload.productId} remove from cart`, {
          position: 'bottom-left'
        })
      }
    }
  }
})

export const { addToCart, removeProduct, decreaseCart } = cartSlice.actions

export default cartSlice.reducer
