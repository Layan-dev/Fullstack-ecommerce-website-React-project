import React, { useEffect, useState } from 'react'
import Products from './Products'
import { Product, removeProduct, productSlice } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Admin() {
  const products = useSelector((state: RootState) => state.products.items)
  const isLoading = useSelector((state: RootState) => state.products.isLoading)
  const error = useSelector((state: RootState) => state.products.error)
  const url = '/mock/e-commerce/products.json'
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
  return (
    <div>
      Admin
      <table>
        <tr>product info</tr>
        <td>
          <Link to={`/addProduct`}>
            <button> Edit</button>
          </Link>
        </td>
        <td>
          {products.map((product: Product) => {
            return (
              <div key={product.id}>
                <img src={product.image} height="100px" width="100px" alt="Company Avatar" />
                <p> companyId: {product.id}</p>
                <p>company name:{product.name}</p>
                <p> description: {product.description}</p>
                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                  🗑️
                </button>
                <Link to={`/edit/${product.id}`}>
                  <button> Edit</button>
                </Link>
              </div>
            )
          })}
        </td>

        <th></th>
      </table>
    </div>
  )
}
