import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select, { MultiValue } from 'react-select'

import {
  Product,
  deleteProductThunk,
  getProductsThunk,
  editProductThunk,
  getProductsRequestThunk
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import { NavBar } from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { Category, categoriesSlice } from '../redux/slices/products/categoriesSlice'

type Option = { value: string; label: string }

export function ProductForm() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products.items
  const categories = state.category.items

  const [selectedOption, setSelectedOption] = useState<MultiValue<Option>>([])
  const selectedCategoryIds = selectedOption.map((option) => option.value)

  console.log(selectedOption)
  console.log(selectedCategoryIds)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [successMessage, setSuccessMessage] = useState<null | string>(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    function fetchCategories() {
      const categoriesUrl = 'http://localhost:5050/api/categories/'

      axios
        .get(categoriesUrl)
        .then((response) => dispatch(categoriesSlice.actions.categorySuccess(response.data)))
        .catch((error) => console.log(categoriesSlice.actions.getError(error.message)))
    }

    dispatch(getProductsRequestThunk('perPage=1000'))
    fetchCategories()
  }, [])

  const handleDeleteProduct = (id: string) => {
    console.log('id:', id)

    // Distapch delete user Thunk
    dispatch(deleteProductThunk(id))
  }
  const [product, setProduct] = useState({
    _id: 0,
    name: '',
    image: '',
    description: '',
    quantity: 1,
    category: [],
    variants: [],
    sizes: [],
    price: 0
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newValue = name === 'price' || name === 'quantity' ? parseFloat(value) : value
    const isList = name === 'category' || name === 'variants' || name === 'sizes'
    console.log('inside handle change', name, value)

    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: isList ? value.split(',') : newValue
      }))
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: isList ? value.split(',') : newValue
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (selectedProduct && selectedProduct._id) {
        const updatedProduct = { ...selectedProduct, category: selectedCategoryIds }
        console.log('i am here')
        console.log(updatedProduct)
        dispatch(editProductThunk({ productId: selectedProduct._id, updatedProduct }))
        setSelectedProduct(null)
        setSelectedOption([])
      } else {
        const res = await api.post('/api/products', { ...product, category: selectedCategoryIds })
        console.log('res', res)
        console.log('products', products)
        setSelectedOption([])
        setSuccessMessage(res.data.msg)
        setErrorMessage(null)
      }
    } catch {
      // console.log('error', error)
      // if (error instanceof AxiosError) {
      //   setErrorMessage(error.response?.data)
      setSuccessMessage(null)
      // }
    } finally {
      setloading(false)
    }
  }

  const handleEditBtnClick = (item: Product) => {
    setSelectedProduct(item)
    const categories = item.category

    const options = categories.map((cat: any) => ({
      value: cat._id,
      label: cat.name
    }))
    setSelectedOption(options)
  }
  const options = categories.map((cat) => ({
    value: cat._id,
    label: cat.name
  }))

  return (
    <div className="w-full bg-white p-4">
      <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
        <div className="flex flex-1 items-center justify-center p-6">
          {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
          {successMessage && <div className="error-message text-green-600">{successMessage}</div>}
          <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
            <div className="flex">
              <div className="mr-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedProduct ? selectedProduct.name : product.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Product Name"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={selectedProduct ? selectedProduct.image : product.image}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Image Url"
                />
              </div>
            </div>

            <div className="flex mt-2">
              <div className="mr-2">
                <input
                  name="description"
                  id="description"
                  value={selectedProduct ? selectedProduct.description : product.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Description"
                  type="text"
                />
              </div>
              <div className="mr-2">
                <Select
                  defaultValue={selectedOption}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  isMulti
                />
                {/* <input
                  type="text"
                  name="category"
                  id="category"
                  value={
                    selectedProduct
                      ? selectedProduct.category.map((cat) => cat.name).join(',')
                      : product.category.join(',')
                  }
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Categories"
                /> */}
              </div>
            </div>

            <div className="flex mt-2">
              <div className="mr-2">
                <input
                  type="text"
                  name="variants"
                  id="variants"
                  value={
                    selectedProduct
                      ? selectedProduct.variants.join(',')
                      : product.variants.join(',')
                  }
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Varients"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="sizes"
                  id="sizes"
                  value={
                    selectedProduct ? selectedProduct.sizes.join(',') : product.sizes.join(',')
                  }
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="Sizes"
                />
              </div>
              <div className="mr-2">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={selectedProduct ? selectedProduct.quantity : product.quantity}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="quantity"
                />
              </div>
              <div className="mr-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={selectedProduct ? selectedProduct.price : product.price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                  placeholder="price"
                />
              </div>
            </div>

            <button
              className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedProduct ? 'Edit Product' : 'Add Product'}
            </button>
            <button
              type="reset"
              className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              cancel
            </button>
          </form>
        </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Image</th>
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Name</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Description</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">category</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">varients</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">sizes</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">price</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((item) => (
              <tr key={item._id}>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img src={item.image} width={100} />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.description}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {item.category.map((category) => (
                    <span key={category._id} className="pr-2">
                      {category.name}
                    </span>
                  ))}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{item.variants}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.sizes}</td>
                <td className="py-4 px-6 border-b border-gray-200">{item.price}</td>

                <td className="py-4 px-6 border-b border-gray-200 whitespace">
                  <button
                    onClick={() => handleEditBtnClick(item)}
                    className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small">
                    Edit
                  </button>
                  <button
                    // onClick={() => dispatch(removeProduct({ productId: item._id }))}
                    onClick={() => handleDeleteProduct(item._id)}
                    className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
