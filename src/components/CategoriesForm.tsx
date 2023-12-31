import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'

import api from '../api'

import {
  Category,
  deleteCategoryThunk,
  editCategoryThunk,
  getCategoriesThunk
} from '../redux/slices/products/categoriesSlice'

export default function CategoriesForm() {
  const dispatch = useDispatch<AppDispatch>()
  const catiegories = useSelector((state: RootState) => state.category.items)

  const [category, setCategory] = useState({ name: '' })
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setCategory({ name: selectedCategory.name })
    } else {
      setCategory({ name: '' })
    }
  }, [selectedCategory])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setCategory((prevCategory) => {
      return { ...prevCategory, [e.target.name]: e.target.value }
    })
  }

  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (selectedCategory && selectedCategory._id) {
      const updatedCategory = { ...selectedCategory, name: category.name }
      dispatch(
        editCategoryThunk({ categoryId: selectedCategory._id, updatedCategory: updatedCategory })
      )
    } else {
      const res = await api.post('/api/categories', category)
      console.log('res', res)
      console.log('products', catiegories)
    }

    setCategory({ name: '' })
    setSelectedCategory(null)
  }

  const handleEditBtnClick = (item: Category) => {
    setSelectedCategory(item)
  }

  const handleDeleteCategory = (id: string) => {
    console.log('id:', id)

    // Distapch delete user Thunk
    dispatch(deleteCategoryThunk(id))
  }
  return (
    <div>
      <div className="flex">
        <Link to="/admin">
          <button>products</button>
        </Link>

        <Link to="/orders">
          <button>orders</button>
        </Link>

        <Link to="/users">
          <button>users</button>
        </Link>
      </div>
      CategoriesForm
      <div className="flex">
        <div className="w-3/4 bg-white p-4">
          <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
            {/* {isLoading && <h3> Loading categories...</h3>} */}

            <div className="flex flex-1 items-center justify-center p-6">
              <div className="w-full max-w-lg">
                <form className="mt-5 sm:flex sm:items-center" onSubmit={handleAddSubmit}>
                  <input
                    id="category"
                    name="name"
                    className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Enter the category name"
                    type="text"
                    value={category.name}
                    onChange={handleChange}
                  />

                  <button
                    className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedCategory ? 'Edit Category' : 'Add Category'}
                  </button>
                </form>
              </div>
            </div>

            <table className="w-full table-fixed border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">
                    Category Name
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {catiegories.map((item, index) => {
                  const { _id, name } = item
                  const isEditing = selectedCategory && selectedCategory._id === _id

                  return (
                    <tr key={_id}>
                      <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                      <td className="py-4 px-6 border-b border-gray-200">{name}</td>
                      <td className="py-4 px-6 border-b border-gray-200 whitespace">
                        <button
                          className="mr-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 py-2 px-4 font-small"
                          onClick={() => handleEditBtnClick(item)}>
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small"
                          onClick={() => handleDeleteCategory(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
