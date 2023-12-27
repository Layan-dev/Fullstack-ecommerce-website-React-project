import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'

import {
  acceptOrdersThunk,
  getOrdersThunk,
  updateOrdersThunk
} from '../redux/slices/products/ordersSlice'

import { orderStatus } from '../constants'

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const orders = state.order.items

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [])

  const handleacceptOrderBtnClick = (item: string) => {
    dispatch(acceptOrdersThunk(item))
  }
  const handleupdateBtnClick = (item: string) => {
    dispatch(updateOrdersThunk(item))
  }

  return (
    <div className="w-3/4 bg-white p-4">
      <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
        <div className="flex">
          <Link to="/admin">
            <button>products</button>
          </Link>

          <Link to="/orders">
            <button>orders</button>
          </Link>

          <Link to="/Admincategoris">
            <button>categories</button>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-10 text-left text-gray-600 font-bold">row</th>
                <th className="w-2/4 py-4 px-10 text-left text-gray-600 font-bold">order ID</th>
                <th className="w-2/4 py-4 px-10 text-left text-gray-600 font-bold">product ID</th>
                <th className="w-2/4 py-4 px-10 text-left text-gray-600 font-bold">purchased at</th>
                <th className="w-3/4 py-4 px-10 text-left text-gray-600 font-bold">user ID</th>
                <th className="w-3/4 py-4 px-10 text-left text-gray-600 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="py-4 px-10 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-10 border-b border-gray-200">{order._id}</td>
                  <td className="py-4 px-10 border-b border-gray-200">{order.productId}</td>
                  <td className="py-4 px-10 border-b border-gray-200">
                    {order.purchasedAt.toString()}
                  </td>
                  <td className="py-4 px-10 border-b border-gray-200">{order.userId}</td>
                  <td className="py-4 px-10 border-b border-gray-200">
                    {' '}
                    <button
                      onClick={
                        order.orderStatus === orderStatus.pending
                          ? () => handleacceptOrderBtnClick(order._id)
                          : () => handleupdateBtnClick(order._id)
                      }
                      className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small">
                      {order.orderStatus}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
