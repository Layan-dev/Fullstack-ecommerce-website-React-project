// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { Product } from './productSlice'
// import api from '../../../api'

// export type ProductState = {
//   items: Product | null
//   error: null | string
//   isLoading: boolean
// }

// const initialState: ProductState = {
//   items: null,
//   error: null,
//   isLoading: false
// }
// export const getProductsThunk = createAsyncThunk('products/get', async () => {
//   try {
//     const res = await api.get('/api/products/')
//     console.log('res from product detail thunk', res.data)
//     return res.data
//   } catch (error) {
//     console.log('err', error)
//   }
// })

// export const productDetailSlice = createSlice({
//   name: 'ProductDetails',
//   initialState,
//   reducers: {
//     // productsRequest: (state) => {
//     //   state.isLoading = true
//     // },
//     // productsSuccess: (state, action: PayloadAction<Product>) => {
//     //   state.isLoading = false
//     //   state.items = action.payload
//     // },

//     getError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getProductsThunk.pending, (state) => {
//       state.isLoading = true
//     })
//     builder.addCase(getProductsThunk.rejected, (state, action) => {
//       const errorMsg = action.payload

//       if (typeof errorMsg === 'string') {
//         state.error = errorMsg
//       }
//       state.isLoading = false
//       return state
//     })
//     builder.addCase(getProductsThunk.fulfilled, (state, action) => {
//       state.items = action.payload.items
//       state.isLoading = false
//       return state
//     })
//     // builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
//     //   const userId = action.payload
//     //   const updatedUsers = state.users.filter((user) => user._id !== userId)
//     //   state.users = updatedUsers
//     //   return state
//     // })
//   }
// })
// // export const { productsRequest, productsSuccess } = productDetailSlice.actions

// export default productDetailSlice.reducer
