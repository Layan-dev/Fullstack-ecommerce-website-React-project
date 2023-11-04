import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UserState = {
  users: User | null
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: User | null
}

const initialState: UserState = {
  users: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  isAdmin: false,
  userData: null
}

export const usersInfoSlice = createSlice({
  name: 'userInfo',
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

    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { Adminlogin, login, usersRequest, usersSuccess } = usersInfoSlice.actions

export default usersInfoSlice.reducer
