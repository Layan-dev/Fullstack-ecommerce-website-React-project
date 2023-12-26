import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { addOrderThunk, addToCartThunk, getCartByUserIdThunk } from '../redux/slices/cartSlice'
import { Product } from '../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const cartItems = state.cart.cartItems
  const userId = state.users.decodedUser ? state.users.decodedUser.userID : null
  if (!userId) {
    return (
      <div>
        <p>You should login first to create an order</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    )
  }
  useEffect(() => {
    dispatch(getCartByUserIdThunk(userId))
  }, [])
  console.log(cartItems)

  if (!cartItems) {
    return <p>No Cart found</p>
  }

  const newTotalAmount = cartItems.products.reduce((acc, product) => acc + product.price, 0)

  const groupedProducts = cartItems.products.reduce((acc, obj) => {
    const key = obj._id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [id: string]: Product[] })

  console.log(groupedProducts)
  console.log(Object.keys(groupedProducts))

  const handleCheckOut = () => {
    const productId = cartItems.products.map((product) => product._id)
    dispatch(addOrderThunk({ userId: userId, products: productId }))
    console.log(productId)
  }

  const handleIncrement = (productId: string) => {
    dispatch(
      addToCartThunk({
        productIds: [productId],
        cartId: cartItems._id,
        userId
      })
    )
  }

  const handleDecrement = (productId: string) => {
    dispatch(
      addToCartThunk({
        productIds: [productId],
        cartId: cartItems._id,
        userId,
        isDecrementing: true
      })
    )
  }
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {Object.keys(groupedProducts).map((productId) => {
            const products = groupedProducts[productId]
            const product = products[0]
            return (
              <div
                key={product._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img
                  src={product.image}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                    <p className="mt-1 text-xs text-gray-700">{product.sizes}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => handleDecrement(product._id)}>
                        {' '}
                        -{' '}
                      </button>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={products.length}
                      />
                      <button
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => handleIncrement(product._id)}>
                        {' '}
                        +{' '}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">{product.price}</p>
                      <button
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => null}>
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div>
            <div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{newTotalAmount} SAR </p>
              </div>

              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{newTotalAmount}</p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                onClick={handleCheckOut}>
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
