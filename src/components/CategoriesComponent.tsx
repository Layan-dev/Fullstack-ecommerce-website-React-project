import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { SetURLSearchParams } from 'react-router-dom'

import { Category, getCategoriesThunk } from '../redux/slices/products/categoriesSlice'
import { getProductsRequestThunk } from '../redux/slices/products/productSlice'

type Props = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}
export default function CategoriesComponent({ searchParams, setSearchParams }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const categories = useSelector((state: RootState) => state.category.items)
  const selectedCategoryId = searchParams.get('categoryId') || ''

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [])

  const handleSelectedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('this is categories', event.target.value)
    searchParams.set('categoryId', event.target.value)
    setSearchParams(searchParams)
    dispatch(getProductsRequestThunk(searchParams.toString()))
  }

  return (
    <div>
      <label>
        filter by category
        <select onChange={handleSelectedCategory} value={selectedCategoryId}>
          <option>select </option>
          {categories.map((category: Category) => {
            return (
              <option key={category._id} value={category._id}>
                {' '}
                {category.name}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
