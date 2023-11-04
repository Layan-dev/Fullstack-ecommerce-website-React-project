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
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    // logout: (state) => {
    //   localStorage.clear()
    //   state.isLoggedIn = false
    // },
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
    addUser: (state, action) => {
      // let's append the new product to the beginning of the array
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredItems = state.users.filter((product) => product.id !== action.payload.userId)
      state.users = filteredItems
    },
    editUser: (state, action: { payload: { editedProduct: User } }) => {
      const editedUser = action.payload.editedProduct

      state.users = state.users.map((user) => (user.id === editedUser.id ? editedUser : user))
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})
export const {
  Adminlogin,
  login,
  removeUser,
  addUser,
  usersRequest,
  usersSuccess,
  updateUser,
  editUser
  // logout
} = usersSlice.actions

export default usersSlice.reducer
