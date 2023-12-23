import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { removeProduct, addToCart, decreaseCart } from '../redux/slices/cartSlice'
import { Product } from '../redux/slices/products/productSlice'
import { NavBar } from './NavBar'
import Footer from './Footer'

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const cartItems = state.cart.cartItems

  const [shipping, setShipping] = useState(0)

  console.log(cartItems)

  const newTotalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  )

  console.log(newTotalAmount)

  const handleDecreaseAmountBtnClick = (id: number) => {
    dispatch(decreaseCart({ productId: id }))
    // setTotalAmount(newTotalAmount)
  }

  const handleIncreaseAmountBtnClick = (item: Product) => {
    dispatch(addToCart(item))
    // setTotalAmount(newTotalAmount)
  }

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src={item.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-xs text-gray-700">{item.sizes}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <button
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleDecreaseAmountBtnClick(item.id)}>
                      {' '}
                      -{' '}
                    </button>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.cartQuantity}
                    />
                    <button
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => handleIncreaseAmountBtnClick(item)}>
                      {' '}
                      +{' '}
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{item.price}</p>
                    <button
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => dispatch(removeProduct({ productId: item.id }))}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div>
            <div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{newTotalAmount} SAR </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$20</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{newTotalAmount + shipping}</p>
                  {/*change item.price*item.cartQuantity + 20 */}
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
