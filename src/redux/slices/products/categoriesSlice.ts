/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Categories = {
  id: number
  name: string
}

export type CategoriesState = {
  items: Categories[]
  error: null | string
  isLoading: boolean
  selectedCategory:number,
}

const initialState: CategoriesState = {
  items: [],
  error: null,
  isLoading: false,
  selectedCategory:0,
}

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryRequest: (state) => {
      state.isLoading = true
    },
    categorySuccess: (state, action:PayloadAction<Categories[]>) => {
      state.isLoading = false
      state.items = action.payload
    },

    // setSelectedCategory:(state,action:PayloadAction<Categories>)=>{
       
    // },

    setSelectedCategory:(state, action:PayloadAction<number>)=>{
      state.selectedCategory = action.payload
      console.log(state)
    },

    addCategory: (state, action: { payload: { category: Categories } }) => {
        // let's append the new product to the beginning of the array
        state.items = [action.payload.category, ...state.items]
      },
      removeCategory: (state, action: { payload: { categoryId: number } }) => {
        const filteredItems = state.items.filter((category) => category.id !== action.payload.categoryId)
        state.items = filteredItems
      },
    
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  }
})
export const {  setSelectedCategory,categoryRequest, categorySuccess,removeCategory,addCategory } = categoriesSlice.actions

export default categoriesSlice.reducer