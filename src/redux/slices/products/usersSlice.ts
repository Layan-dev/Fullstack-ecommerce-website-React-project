import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Navigate } from 'react-router'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: User | null
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  isAdmin: false,
  userData: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
    },
    Adminlogin: (state, action: PayloadAction<User>) => {
      if (state.userData?.role === 'admin') {
        state.isAdmin = true
        state.userData = action.payload
      }
    },

    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    addUser: (state, action: { payload: { user: User } }) => {
      // let's append the new product to the beginning of the array
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredItems = state.users.filter((product) => product.id !== action.payload.userId)
      state.users = filteredItems
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { Adminlogin, login, removeUser, addUser, usersRequest, usersSuccess } =
  usersSlice.actions

export default usersSlice.reducer
