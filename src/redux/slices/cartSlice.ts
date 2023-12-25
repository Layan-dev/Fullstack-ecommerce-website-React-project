import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router'
import { toast } from 'react-toastify'
import { Product } from './products/productSlice'
import { User } from './products/usersSlice'
import api from '../../api'

export type CartProduct = {
  _id: string
  products: Product[]
  userId: User
  totalPrice: number
}

export type CartState = {
  cartItems: CartProduct | null
  cartTotal: number
  cartAmount: number
}
export const addToCartThunk = createAsyncThunk(
  'cart/add',
  async ({
    userId,
    productIds,
    cartId,
    isDecrementing = false
  }: {
    userId: string
    productIds: string[]
    cartId: string
    isDecrementing?: boolean
  }) => {
    try {
      const res = await api.post(`/api/users/addToCart/${userId}`, {
        productIds,
        cartId,
        isDecrementing
      })
      console.log('res from user login thunk', res.data)
      return res.data.cart
    } catch (error) {
      console.log('err', error)
    }
  }
)
export const getCartByUserIdThunk = createAsyncThunk('cart/get', async (userId: string) => {
  try {
    const res = await api.get(`/api/users/cart/${userId}`)
    console.log('res from user login thunk', res.data)
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})
export const addOrderThunk = createAsyncThunk(
  'order/add',
  async (orderInfo: { products: string[]; userId: string }) => {
    try {
      const res = await api.post(`/api/users/orders/addNewOrder`, orderInfo)
      console.log('res from user login thunk', res.data)
      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)

// const cartItemsFromStorage = localStorage.getItem('cartItems')
// const initialCartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []

const initialState: CartState = {
  cartItems: null,
  cartTotal: 0,
  cartAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartByUserIdThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload
      return state
    })
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload
      return state
    })
  }
})

export default cartSlice.reducer
