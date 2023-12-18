import axios from 'axios'
import React, { useEffect } from 'react'
import { Category, removeCategory, categoriesSlice } from '../redux/slices/products/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Link } from 'react-router-dom'

// const type Prop={
//   setSelected=React.Dispatch<React.SetStateAction<Categories | null | undefined>>
// }
export default function CategoriesComponent() {
  const categoriesUrl = 'http://localhost:5050/api/categories/'
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.category.items)

  useEffect(() => {
    function fetchCategories() {
      axios
        .get(categoriesUrl)
        // .then((response) => console.log(categoriesSlice.actions.categorySuccess(response.data)))
        .then((response) => dispatch(categoriesSlice.actions.categorySuccess(response.data)))
        .catch((error) => console.log(categoriesSlice.actions.getError(error.message)))
    }
    fetchCategories()
  }, [dispatch])

  const handleSelectedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('this is categories', categories)
    const selectedop = categories.find((x) => x._id === event.target.value)
    console.log('this is selected cat', selectedop)
    if (selectedop != undefined)
      dispatch(categoriesSlice.actions.setSelectedCategory(selectedop._id))
  }

  return (
    <div>
      Categories
      <label>
        filter by category
        <select onChange={handleSelectedCategory}>
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
