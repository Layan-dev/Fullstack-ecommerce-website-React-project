import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductForm } from './ProductForm'
import { addProduct, Product } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useParams } from 'react-router'

const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: []
}

export function EditProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)
  const { id } = useParams()

  const productInfo = useSelector((state: RootState) =>
    state.products.items.find((prod) => prod.id.toString() === id)
  )
  function displayInfo(prod) {
    ;<div key={productInfo?.id}>
      <h3>ProductDetail</h3>
      <p>
        <b>categories:</b> {productInfo?.categories}
      </p>
      <p>
        <b>sizes:</b>
        {productInfo?.sizes}
      </p>
      <p>
        <b>variants:</b> {productInfo?.variants}
      </p>
    </div>
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // displayInfo()
    // Send the product data to your backend or in this case send it to Redux
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    product.id = +new Date()
    console.log('product:', product)

    dispatch(addProduct({ product }))
    // Reset the form
    setProduct(initialProductState)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Add a new product</h3>
      <ProductForm handleSubmit={handleSubmit} handleChange={handleChange} product={product} />
    </div>
  )
}
