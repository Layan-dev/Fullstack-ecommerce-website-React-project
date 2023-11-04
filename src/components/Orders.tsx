import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { orderSlice } from '../redux/slices/products/ordersSlice'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import { Link } from 'react-router-dom'
import axios from 'axios'
import productSlice from '../redux/slices/products/productSlice'

export default function Orders() {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const orders = state.order.items

  //fetching data of products
  const url = '/mock/e-commerce/orders.json'
  useEffect(() => {
    function fetchData() {
      axios
        .get(url)
        .then((response) => dispatch(orderSlice.actions.productsSuccess(response.data)))
        .catch((error) => console.log(orderSlice.actions.getError(error.message)))
    }

    fetchData()
  }, [dispatch])

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
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">order ID</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">product ID</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">purchased at</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">user ID</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  {/* <td className="py-4 px-6 border-b border-gray-200">
                  <img src={user.image} width={100} />
                </td> */}
                  <td className="py-4 px-6 border-b border-gray-200">{order.id}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{order.productId}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {order.purchasedAt.toString()}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{order.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
