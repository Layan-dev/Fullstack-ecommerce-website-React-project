import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from './productSlice'

export type ProductState = {
  items: Product | null
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  items: null,
  error: null,
  isLoading: false
}

export const productDetailSlice = createSlice({
  name: 'ProductDetails',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false
      state.items = action.payload
    },

    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { productsRequest, productsSuccess } = productDetailSlice.actions

export default productDetailSlice.reducer
