import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type User = {
  _id: string
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
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const { getError } = usersInfoSlice.actions

export default usersInfoSlice.reducer
