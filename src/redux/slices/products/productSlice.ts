import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from './categoriesSlice'

import api from '../../../api'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  quantity: number
  category: Category[] | string[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  items: Product[]
  pageNumber: number
  perPage: number
  totalPages: number
  totalProducts: number
  error: null | string
  isLoading: boolean
  selectedProduct: Product | null
}

const initialState: ProductState = {
  items: [],
  pageNumber: 0,
  perPage: 0,
  totalPages: 0,
  totalProducts: 0,
  error: null,
  isLoading: false,
  selectedProduct: null
}

export const getProductsThunk = createAsyncThunk('products/get', async () => {
  try {
    const res = await api.get('/api/products/')
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})
export const getProductsByIdThunk = createAsyncThunk(
  'products/getId',
  async (productId: string) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      console.log('res from all products thunk', res.data)

      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)
export const createProductThunk = createAsyncThunk(
  'product/create',
  async ({ product, category }: { product: Product; category: string[] }) => {
    try {
      const res = await api.post('/api/products', { ...product, category })
      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)
export const getProductsRequestThunk = createAsyncThunk('request/get', async (params: string) => {
  try {
    const res = await api.get(`/api/products?${params}`)
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})

export const deleteProductThunk = createAsyncThunk('products/delete', async (productId: string) => {
  try {
    await api.delete(`api/products/${productId}`)
    return productId
  } catch (error) {
    console.log('👀 ', error)
  }
})
export const editProductThunk = createAsyncThunk(
  'products/edit',
  async ({ productId, updatedProduct }: { productId: string; updatedProduct: Product }) => {
    try {
      const res = await api.put(`api/products/${productId}`, updatedProduct)
      console.log('from inside thunk', res.data.newProduct)
      return res.data.newProduct
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductsThunk.rejected, (state, action) => {
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload?.products
      state.pageNumber = action.payload?.pageNumber
      state.perPage = action.payload?.perPage
      state.totalPages = action.payload?.totalPages
      state.totalProducts = action.payload?.totalProducts
      state.isLoading = false
      return state
    })
    builder.addCase(getProductsByIdThunk.fulfilled, (state, action) => {
      state.selectedProduct = action.payload
      return state
    })

    builder.addCase(getProductsRequestThunk.fulfilled, (state, action) => {
      state.items = action.payload?.products
      state.pageNumber = action.payload?.pageNumber
      state.perPage = action.payload?.perPage
      state.totalPages = action.payload?.totalPages
      state.totalProducts = action.payload?.totalProducts
      state.isLoading = false
      return state
    })
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      const newProduct = action.payload
      console.log('this is the created product ', newProduct)
      if (newProduct) {
        state.items = [newProduct, ...state.items]
        console.log(state.items)
        return state
      }
    })
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      const productId = action.payload
      const updatedProducts = state.items.filter((product) => product._id !== productId)
      state.items = updatedProducts
      return state
    })
    builder.addCase(editProductThunk.fulfilled, (state, action) => {
      const uptadetproduct = action.payload
      console.log(uptadetproduct)
      if (uptadetproduct) {
        const uptadetproducts = state.items.map((product) =>
          product._id === uptadetproduct._id ? uptadetproduct : product
        )
        state.items = uptadetproducts
        console.log(state.items)
        return state
      }
    })
  }
})
export const { getError } = productSlice.actions

export default productSlice.reducer
