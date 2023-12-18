import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { orderStatus } from '../../../constants'

export type OrderStatus = keyof typeof orderStatus

export type Order = {
  _id: string
  productId: string
  userId: string
  purchasedAt: Date
  orderStatus: OrderStatus
}

export type OrderState = {
  items: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  items: [],
  error: null,
  isLoading: false
}
export const getOrdersThunk = createAsyncThunk('orders/get', async () => {
  try {
    const res = await api.get('/api/orders/')
    console.log('res from all Orders thunk', res.data)
    return res.data
  } catch (error) {
    console.log('err', error)
  }
})
export const acceptOrdersThunk = createAsyncThunk('orders/accept', async (orderId: string) => {
  try {
    const res = await api.put(`/api/users/admin/orders/${orderId}`)
    console.log('from inside thunk', orderId)
    console.log('response', res.data.updatedOrder.orderStatus)
    return { orderId, updatedStatus: res.data.updatedOrder.orderStatus }
  } catch (error) {
    console.log('👀 ', error)
  }
})
export const updateOrdersThunk = createAsyncThunk(
  'orders/updateStatus',
  async (orderId: Order['_id']) => {
    try {
      const res = await api.put(`/api/users/admin/orders/updatestatus/${orderId}`)
      console.log('from inside thunk', orderId)
      return { orderId, currentStatus: res.data.currentStatus }
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false
      state.items = action.payload
    }

    // addOrder: (state, action: { payload: { product: Order } }) => {
    //   // let's append the new product to the beginning of the array
    //   state.items = [action.payload.product, ...state.items]
    // },

    // getError: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      const errorMsg = action.payload

      if (typeof errorMsg === 'string') {
        state.error = errorMsg
      }
      state.isLoading = false
      return state
    })
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
      return state
    })
    builder.addCase(acceptOrdersThunk.fulfilled, (state, action) => {
      const orderId = action.payload?.orderId
      const currentStatus = action.payload?.updatedStatus
      console.log(orderId)

      const uptadetOrders = state.items.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            orderStatus: currentStatus
          }
        }
        return order
      })
      state.items = uptadetOrders
      console.log(state.items)
      return state
    })
    builder.addCase(updateOrdersThunk.fulfilled, (state, action) => {
      const orderId = action.payload?.orderId
      const currentStatus = action.payload?.currentStatus
      console.log(orderId)

      const uptadetOrders = state.items.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            orderStatus: currentStatus
          }
        }
        return order
      })
      state.items = uptadetOrders
      console.log(state.items)
      return state
    })
  }
})
export const { productsRequest, productsSuccess } = orderSlice.actions

export default orderSlice.reducer
