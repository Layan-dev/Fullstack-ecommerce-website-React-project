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

      <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
        {filteredProducts &&
          filteredProducts
            .filter((product) => {
              return search.toLocaleLowerCase() === '' ? product : product.name.includes(search)
            })
            .map((product: Product) => {
              return (
                <div
                  key={product.id}
                  className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    className="h-48 w-full object-cover object-center"
                    src={product.image}
                    alt="Product Image"
                  />
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                      {product.name}
                    </h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                      {product.description}
                    </p>
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                        $20.00
                      </p>
                    </div>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <button> More detail</button>
                  </Link>
                  <button onClick={() => dispatch(addToCart(product))}>🛒</button>
                  <button
                    className=" text-red-400 text-xs"
                    onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                    X
                  </button>
                </div>
              )
            })}
      </div>
    </div>
  )
}
