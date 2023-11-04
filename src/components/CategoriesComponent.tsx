import axios from 'axios'
import React, { useEffect } from 'react'
import {
  Categories,
  removeCategory,
  categoriesSlice
} from '../redux/slices/products/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// const type Prop={
//   setSelected=React.Dispatch<React.SetStateAction<Categories | null | undefined>>
// }
export default function CategoriesComponent() {
  const categoriesUrl = '/mock/e-commerce/categories.json'
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.category.items)
  const selectedCategoryOp = useSelector((state: RootState) => state.category.selectedCategory)

  useEffect(() => {
    function fetchCategories() {
      axios
        .get(categoriesUrl)
        .then((response) => dispatch(categoriesSlice.actions.categorySuccess(response.data)))
        .catch((error) => console.log(categoriesSlice.actions.getError(error.message)))
    }
    fetchCategories()
  }, [dispatch])

  const handleSelectedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedop = categories.find((x) => x.id === Number(event.target.value))
    console.log(selectedop)
    if (selectedop != undefined)
      dispatch(categoriesSlice.actions.setSelectedCategory(selectedop.id))
  }

  return (
    <div>
      Categories
      <label>
        filter by category
        <select onChange={handleSelectedCategory}>
          {categories.map((category: Categories) => {
            return (
              <option key={category.id} value={category.id}>
                {' '}
                {category.id}:{category.name}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
