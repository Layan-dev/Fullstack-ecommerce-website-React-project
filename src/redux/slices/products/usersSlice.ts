import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { builtinModules } from 'module'
import { getDecodedTokenFromStorage, getTokenFromStorage } from '../../../utils/token'
import { ROLES } from '../../../constants'

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: DecodedUser | null
}
export type Role = keyof typeof ROLES
const user = getDecodedTokenFromStorage()
const isLoggedIn = !!getTokenFromStorage()
const decodedUser = getDecodedTokenFromStorage()
const isAdmin = decodedUser?.role === ROLES.ADMIN

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn,
  isAdmin,
  userData: decodedUser
}

export type DecodedUser = {
  firstName: string
  lastName: string
  email: string
  exp: number
  iat: number
  role: Role
  userID: string
}

export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      console.log('res', res.data)
      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)
export const getUsersThunk = createAsyncThunk('user/get', async () => {
  try {
    const res = await api.get('/api/users/admin/getAllUsers')
    console.log('res from all users thunk', res.data)
    return res.data.users
  } catch (error) {
    console.log('err', error)
  }
})

export const deleteUserThunk = createAsyncThunk('users/delete', async (userId: string) => {
  try {
    await api.delete(`api/users/admin/deleteUser/${userId}`)
    return userId
  } catch (error) {
    console.log('👀 ', error)
  }
})
export const grantRoleUserThunk = createAsyncThunk(
  'users/role',
  async ({ role, userId }: { role: Role; userId: User['_id'] }) => {
    try {
      const res = await api.put('/api/users/role', {
        role,
        userId
      })

      return res.data.user
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.isAdmin = false
    },
    userRequest: (state) => {
      state.isLoading = true
    },
    // login: (state, action) => {
    //   state.isLoggedIn = true
    //   state.userData = action.payload
    //   localStorage.setItem(
    //     'loginData',
    //     JSON.stringify({
    //       isLoggedIn: state.isLoggedIn,
    //       userData: state.userData
    //     })
    //   )
    // },
    // // logout: (state) => {
    // //   localStorage.clear()
    // //   state.isLoggedIn = false
    // // },
    // Adminlogin: (state, action: PayloadAction<User>) => {
    //   if (state.userData?.role === 'admin') {
    //     state.isAdmin = true
    //     state.userData = action.payload
    //   }
    // },

    // usersRequest: (state) => {
    //   state.isLoading = true
    // },
    // usersSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.users = action.payload
    // },
    addUser: (state, action) => {
      // let's append the new product to the beginning of the array
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userId: string } }) => {
      const filteredItems = state.users.filter((product) => product._id !== action.payload.userId)
      state.users = filteredItems
    },
    editUser: (state, action: { payload: { editedProduct: User } }) => {
      const editedUser = action.payload.editedProduct

      state.users = state.users.map((user) => (user._id === editedUser._id ? editedUser : user))
    },
    // updateUser: (state, action) => {
    //   const { id, firstName, lastName } = action.payload
    //   const foundUser = state.users.find((user) => user._id === id)
    //   if (foundUser) {
    //     foundUser.firstName = firstName
    //     foundUser.lastName = lastName
    //     state.userData = foundUser
    //     localStorage.setItem(
    //       'loginData',
    //       JSON.stringify({
    //         isLoggedIn: state.isLoggedIn,
    //         userData: state.userData
    //       })
    //     )
    //   }
    // },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false
      return state
    })
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.userData = action.payload.userData
      state.isLoading = false
      return state
    })
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload
      return state
    })
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      const userId = action.payload
      const updatedUsers = state.users.filter((user) => user._id !== userId)
      state.users = updatedUsers
      return state
    })
    builder.addCase(grantRoleUserThunk.fulfilled, (state, action) => {
      const updatedUser = action.payload
      const userId = updatedUser._id

      const updatedUsers = state.users.map((user) => {
        if (user._id === userId) {
          return updatedUser
        }
        return user
      })
      state.users = updatedUsers
      return state
    })
  }
})
export const {
  logout,
  // Adminlogin,
  // login,
  removeUser,
  // addUser,
  // usersRequest,
  // usersSuccess,
  // updateUser,
  editUser
  // logout
} = usersSlice.actions

export default usersSlice.reducer
