/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Order = {
  id: number
  name: string
}

export type OrderState = {
  items: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  items: [],
  error: null,
  isLoading: false
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action:PayloadAction<Order[]>) => {
      state.isLoading = false
      state.items = action.payload
    },

    addOrder: (state, action: { payload: { product: Order } }) => {
        // let's append the new product to the beginning of the array
        state.items = [action.payload.product, ...state.items]
      },
    
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  }
})
export const {   addOrder,productsRequest, productsSuccess } = orderSlice.actions

export default orderSlice.reducer