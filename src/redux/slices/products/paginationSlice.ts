// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../../api'

// export type PaginationState = {
//   pageNumber: number
//   perPage: number
//   totalPages: number
//   totalProducts: number
//   error: null | string
//   isLoading: boolean
// }
// const initialState: PaginationState = {
//   pageNumber: 0,
//   perPage: 0,
//   totalPages: 0,
//   totalProducts: 0,
//   error: null,
//   isLoading: false
// }

// export const getPagesThunk = createAsyncThunk('pages/get', async () => {
//   try {
//     const res = await api.get('/api/products/')
//     console.log('res from all pagesthunk', res.data)
//     const { pageNumber, perPage, totalPages, totalProducts } = res.data
//     return { pageNumber, perPage, totalPages, totalProducts }
//   } catch (error) {
//     console.log('err', error)
//   }
// })

// export const paginationSlice = createSlice({
//   name: 'pagination',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getPagesThunk.fulfilled, (state, action) => {
//       state.pageNumber = action.payload?.pageNumber
//       state.perPage = action.payload?.perPage
//       state.totalPages = action.payload?.totalPages
//       state.totalProducts = action.payload?.totalProducts
//       state.isLoading = state.isLoading = false
//       return state
//     })
//   }
// })
// // export const {
// // } = paginationSlice.actions

// export default paginationSlice.reducer
