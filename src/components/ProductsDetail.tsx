import { useParams } from 'react-router'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { getProductsByIdThunk } from '../redux/slices/products/productSlice'
import { addToCartThunk } from '../redux/slices/cartSlice'

export default function ProductsDetail() {
  const state = useSelector((state: RootState) => state)
  const selectedProduct = state.products.selectedProduct
  const cartItems = state.cart.cartItems
  const userId = state.users.decodedUser.userID
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  useEffect(() => {
    handleGetProduct()
  }, [])

  const handleGetProduct = async () => {
    if (id) {
      const res = await dispatch(getProductsByIdThunk(id))
      return res.payload
    }
  }
  const handleIncrement = (productId: string) => {
    dispatch(
      addToCartThunk({
        productIds: [productId],
        cartId: cartItems?._id || '',
        userId
      })
    )
  }

  if (!selectedProduct) {
    return <div>No product found.</div>
  }
  return (
    <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 ">
            <div className="sticky top-0 z-50 overflow-hidden ">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                <img
                  src={selectedProduct.image}
                  alt="product Image"
                  className="object-cover w-full lg:h-full "
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="mb-8 ">
                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {selectedProduct.name}
                </h2>

                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {selectedProduct.description}
                </p>
                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                  <span>{selectedProduct.price}</span>
                </p>
              </div>
              <div className="flex items-center mb-8">
                <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                  Number of pieces:
                </h2>
                {selectedProduct.variants}
              </div>
              <div className="flex items-center mb-8">
                <h2 className="w-16 text-xl font-bold dark:text-gray-400">Size:</h2>
                {selectedProduct.sizes}
              </div>
              <div className="flex flex-wrap items-center -mx-4 ">
                <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  <button
                    onClick={() => handleIncrement(selectedProduct._id)}
                    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
