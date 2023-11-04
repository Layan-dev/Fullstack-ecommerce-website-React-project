import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Product, removeProduct, productSlice } from '../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import CategoriesComponent from './CategoriesComponent'
import { addToCart } from '../redux/slices/cartSlice'

export default function Products() {
  const url = '/mock/e-commerce/products.json'

  const products = useSelector((state: RootState) => state.products.items)
  const isLoading = useSelector((state: RootState) => state.products.isLoading)
  const error = useSelector((state: RootState) => state.products.error)
  const selectedCategoryOp = useSelector((state: RootState) => state.category.selectedCategory)

  const dispatch = useDispatch()

  useEffect(() => {
    function fetchData() {
      axios
        .get(url)
        .then((response) => dispatch(productSlice.actions.productsSuccess(response.data)))
        .catch((error) => console.log(productSlice.actions.getError(error.message)))
    }

    fetchData()
  }, [dispatch])

  const [search, setSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  if (isLoading === true) {
    return <p>loading...</p>
  }

  if (error) {
    return <div> {error}</div>
  }
  const filterProductByCategory = (selectedCategoryOp: number) => {
    return selectedCategoryOp !== 0
      ? products.filter((product) => {
          return product.categories.includes(selectedCategoryOp)
        })
      : products
  }

  const filteredProducts = filterProductByCategory(selectedCategoryOp)

  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div>
        <form>
          <input
            id="outlined-basic"
            placeholder="search by company name"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <CategoriesComponent />

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {currentProducts
          .filter((product) => {
            return search.toLocaleLowerCase() === '' ? product : product.name.includes(search)
          })
          .map((product: Product) => {
            return (
              <div
                key={product.id}
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
                      <Link to={`/products/${product.id}`}>
                        <button> More detail</button>
                      </Link>
                      <div onClick={() => dispatch(addToCart(product))} className="ml-auto">
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
            onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
}
