import React, { ChangeEvent, useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import {
  Product,
  getProductsRequestThunk,
  getProductsThunk
} from '../redux/slices/products/productSlice'
import CategoriesComponent from './CategoriesComponent'
import { addToCartThunk, getCartByUserIdThunk } from '../redux/slices/cartSlice'

export default function Products() {
  const state = useSelector((state: RootState) => state)
  const cartItems = state.cart.cartItems
  const currentItems = state.products.items
  const isLoading = state.products.isLoading
  const error = state.products.error
  const userId = state.users.userData ? state.users.userData._id : null

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('pageNumber') || 1
  const name = searchParams.get('search') || ''
  const sortOrder = searchParams.get('sortOrder') || ''
  const categoryId = searchParams.get('categoryId') || ''

  const pagination = {
    pageNumber: state.products.pageNumber,
    totalPages: state.products.totalPages
  }

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      dispatch(getCartByUserIdThunk(userId))
    }
    if (page && categoryId) {
      handleGetByCatd(pagination.pageNumber, categoryId)
    } else if (page && sortOrder) {
      handleSortProduct(pagination.pageNumber, sortOrder)
    } else if (page && name) {
      handleGetProductsByName(name, pagination.pageNumber)
    } else if (page || name || sortOrder || categoryId) {
      handleGetProductsByName(name, pagination.pageNumber)
    } else {
      dispatch(getProductsThunk())
    }
  }, [])

  if (isLoading === true) {
    return <p>loading...</p>
  }

  if (error) {
    return <div> {error}</div>
  }

  const totalPages = pagination.totalPages

  const handleGetProductsByName = async (search: string, selectedPage: number) => {
    searchParams.set('search', search)
    searchParams.set('pageNumber', selectedPage.toString())
    setSearchParams(searchParams)

    dispatch(getProductsRequestThunk(searchParams.toString()))
  }

  const handleGetProductsByNextPage = async (selectedPage: number) => {
    searchParams.set('pageNumber', selectedPage.toString())
    setSearchParams(searchParams)

    dispatch(getProductsRequestThunk(searchParams.toString()))
  }

  const handleGetByCatd = async (selectedPage: number, categoryId: string) => {
    console.log('i am in category')

    searchParams.set('sortOrder', sortOrder)
    searchParams.set('categoryId', categoryId)
    searchParams.set('pageNumber', selectedPage.toString())
    setSearchParams(searchParams)

    dispatch(getProductsRequestThunk(searchParams.toString()))
  }

  const handleSortProduct = async (selectedPage: number, sortOrder: string) => {
    searchParams.set('sortOrder', sortOrder)
    searchParams.set('pageNumber', selectedPage.toString())
    setSearchParams(searchParams)
    dispatch(getProductsRequestThunk(searchParams.toString()))
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    handleGetProductsByName(e.target.value, pagination.pageNumber)
    console.log('search', e.target.value)
  }
  const handleSortOrder = async (e: ChangeEvent<HTMLSelectElement>) => {
    // Dispatch the sortProducts action
    handleSortProduct(pagination.pageNumber, e.target.value)
  }

  const handleIncrement = (productId: string) => {
    if (userId) {
      dispatch(
        addToCartThunk({
          productIds: [productId],
          cartId: cartItems?._id || '',
          userId
        })
      )
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <div>
        <form>
          <div className="mb-3">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <div className="flex-left w-72 flex-row gap-3">
                <select
                  name="sortOrder"
                  title="sort Order"
                  onChange={(e) => handleSortOrder(e)}
                  value={sortOrder}>
                  <option>Select option</option>
                  <option>dec</option>
                  <option>asc</option>
                </select>
              </div>
              <CategoriesComponent searchParams={searchParams} setSearchParams={setSearchParams} />
              <input
                className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                type="search"
                title="search"
                id="outlined-basic"
                placeholder="search by company name"
                value={name}
                onChange={handleSearch}
              />
              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </form>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {currentItems.map((product: Product) => {
          return (
            <div
              key={product._id}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <a href="#">
                <img
                  src={product.image}
                  alt="Product Image"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {product.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      {product.price}RS
                    </p>
                    <Link to={`/products/${product._id}`}>
                      <button> More detail</button>
                    </Link>
                    <div onClick={() => handleIncrement(product._id)} className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bag-plus"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )
        })}
      </section>
      <div className="flex justify-center  -space-x-px h-8 text-sm">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            key={pageNumber}
            onClick={() => {
              if (categoryId) {
                handleGetByCatd(pageNumber, categoryId)
              } else if (sortOrder) {
                handleSortProduct(pageNumber, sortOrder)
              } else if (name) {
                handleGetProductsByName(name, pageNumber)
              } else {
                handleGetProductsByNextPage(pageNumber)
              }
            }}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
}
