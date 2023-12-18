import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from './categoriesSlice'
import api from '../../../api'
import { deleteUserThunk } from './usersSlice'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  quantity: number
  category: Category[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  selectedProduct: Product | null
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  selectedProduct: null
}
export const getProductsThunk = createAsyncThunk('products/get', async () => {
  try {
    const res = await api.get('/api/products/')
    console.log('res from all products thunk', res.data)
    return res.data.products
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
      await api.put(`api/products/${productId}`, updatedProduct)
      console.log('from inside thunk', productId)
      return updatedProduct
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload.products
      console.log(action.payload)
    },
    singleProductsSuccess: (state, action) => {
      state.isLoading = false
      state.selectedProduct = action.payload
    },
    addProduct: (state, action) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.items.filter(
        (product) => product._id !== action.payload.productId
      )
      state.items = filteredItems
    },

    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct
      console.log(editedProduct)

      state.items = state.items.map(
        (product) => (product._id === editedProduct._id ? editedProduct : product)
        //   state.items.filter((product) => product._id !== editedProduct._id)
        // state.items=action.payload
      )
    },

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
      state.items = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      const productId = action.payload
      const updatedProducts = state.items.filter((product) => product._id !== productId)
      state.items = updatedProducts
      return state
    })
    builder.addCase(editProductThunk.fulfilled, (state, action) => {
      const uptadetproduct = action.payload
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
export const {
  editProduct,
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  singleProductsSuccess
} = productSlice.actions

export default productSlice.reducer
