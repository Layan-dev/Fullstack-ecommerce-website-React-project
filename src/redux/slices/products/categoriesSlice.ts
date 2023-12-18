import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  _id: string
  name: string
}

export type CategoriesState = {
  items: Category[]
  error: null | string
  isLoading: boolean
  selectedCategory: string
}

const initialState: CategoriesState = {
  items: [],
  error: null,
  isLoading: false,
  selectedCategory: ''
}
export const getCategoriesThunk = createAsyncThunk('categories/get', async () => {
  try {
    const res = await api.get('/api/categories/')
    console.log('res from all categories thunk', res.data)
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})
export const deleteCategoryThunk = createAsyncThunk(
  'categories/delete',
  async (categoryId: string) => {
    try {
      await api.delete(`api/categories/${categoryId}`)
      return categoryId
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)
export const editCategoryThunk = createAsyncThunk(
  'products/edit',
  async ({ categoryId, updatedCategory }: { categoryId: string; updatedCategory: Category }) => {
    try {
      await api.put(`api/categories/${categoryId}`, updatedCategory)
      console.log('from inside thunk', categoryId)
      return updatedCategory
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryRequest: (state) => {
      state.isLoading = true
    },
    categorySuccess: (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false
      state.items = action.payload
    },

    // setSelectedCategory:(state,action:PayloadAction<Categories>)=>{

    // },

    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      console.log('selected cat', action.payload)
      console.log(state)
    },

    addCategory: (state, action: { payload: { category: Category } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.category, ...state.items]
    },
    removeCategory: (state, action: { payload: { categoryId: string } }) => {
      const filteredItems = state.items.filter(
        (category) => category._id !== action.payload.categoryId
      )
      state.items = filteredItems
    },

    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    updateCategory: (state, action: { payload: { editCategory: Category } }) => {
      const filteredItems = state.items.filter(
        (category) => category._id !== action.payload.editCategory._id
      )
      state.items = filteredItems
      state.items = [action.payload.editCategory, ...state.items]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategoriesThunk.rejected, (state, action) => {
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const categoryId = action.payload
      const updatedCategory = state.items.filter((category) => category._id !== categoryId)
      state.items = updatedCategory
      return state
    })
    builder.addCase(editCategoryThunk.fulfilled, (state, action) => {
      const productId = action.payload
      if (productId) {
        const uptadetpCategories = state.items.map((category) =>
          category._id === productId._id ? productId : category
        )
        state.items = uptadetpCategories
        console.log(state.items)
        return state
      }
    })
  }
})
export const {
  setSelectedCategory,
  categoryRequest,
  categorySuccess,
  removeCategory,
  addCategory,
  updateCategory
} = categoriesSlice.actions

export default categoriesSlice.reducer
