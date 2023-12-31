import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

import { getTokenFromStorage, getUserFromStorage } from '../../../utils/token'
import { ROLES } from '../../../constants'

export type Role = keyof typeof ROLES

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
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
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: User | null
}

const isLoggedIn = !!getTokenFromStorage()
const userData = getUserFromStorage()
const isAdmin = userData?.role === ROLES.ADMIN

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn,
  isAdmin,
  userData
}
export const registerThunk = createAsyncThunk('user/register', async (user: Partial<User>) => {
  try {
    const res = await api.post('/api/auth/register', user)
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})
export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    try {
      const res = await api.post('/api/auth/login', credentials)
      const token = res.data.token
      const user = res.data.user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)
export const getUsersThunk = createAsyncThunk('users/get', async () => {
  try {
    const res = await api.get('/api/users/admin/getAllUsers')
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

export const updateUserProfileThunk = createAsyncThunk(
  'singleUser/edit',
  async ({ userId, updatedUser }: { userId: User['_id']; updatedUser: Partial<User> }) => {
    try {
      const res = await api.put(`/api/users/profile/${userId}`, updatedUser)
      const data = res.data
      console.log('data inside update user thunk', data)
      return data
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)
export const getSingleUserThunk = createAsyncThunk('user/get', async (userId: string) => {
  try {
    const res = await api.get(`/api/users/${userId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
})
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.isAdmin = false
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    updateUserFromPayload: (state, action) => {
      const updatedUser = action.payload
      if (updatedUser) {
        const updatedUsers = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
        state.users = updatedUsers
        state.userData = updatedUser
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      const newUser = action.payload
      if (newUser) {
        state.users = [newUser, ...state.users]
        console.log(state.users)
        return state
      }
    })
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
      const user = action.payload.user
      state.userData = user
      state.isAdmin = user.role === ROLES.ADMIN
      state.isLoggedIn = true
      state.isLoading = false
      console.log('is Admin', isAdmin)
      console.log
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
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      const updatedUser = action.payload.user
      console.log('updated user', updatedUser)
      if (updatedUser) {
        state.userData = updatedUser
      }
      return state
    })
  }
})
export const { logout, updateUserFromPayload, getError } = usersSlice.actions

export default usersSlice.reducer
