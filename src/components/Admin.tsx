import React from 'react'
import Products from './Products'
import { Product, removeProduct } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function Admin() {
  const products = useSelector((state: RootState) => state.products.items)
  const dispatch = useDispatch()
  return (
    <div>
      Admin
      <table>
        <th>products</th>
        <tr>
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

                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeProduct({ productId: product.id }))}>
                  Edit
                </button>
              </div>
            )
          })}
        </tr>
        <th>Actions</th>
        <tr></tr>
      </table>
    </div>
  )
}
