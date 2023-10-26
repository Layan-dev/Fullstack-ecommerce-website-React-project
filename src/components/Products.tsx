import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Product, removeProduct, userSlice } from '../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import CategoriesComponent from './CategoriesComponent'

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
        .then((response) => dispatch(userSlice.actions.productsSuccess(response.data)))
        .catch((error) => console.log(userSlice.actions.getError(error.message)))
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

      {filteredProducts &&
        filteredProducts
          .filter((product) => {
            return search.toLocaleLowerCase() === '' ? product : product.name.includes(search)
          })
          .map((product: Product) => {
            return (
              <div key={product.id}>
                <img src={product.image} height="100px" width="100px" alt="Company Avatar" />
                <p> companyId: {product.id}</p>
                <p>company name:{product.name}</p>
                <p> description: {product.description}</p>
                <Link to={`/products/${product.id}`}>
                  <button> More detail</button>
                </Link>
                <button>🛒</button>
                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                  X
                </button>
              </div>
            )
          })}
    </div>
  )
}
