import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import axios from 'axios'
import productSlice from '../redux/slices/products/productSlice'
import { User, usersSlice } from '../redux/slices/products/usersSlice'

export default function Users() {
  const url = '/mock/e-commerce/users.json'

  const users = useSelector((state: RootState) => state.users.users)
  const isLoading = useSelector((state: RootState) => state.users.isLoading)
  const error = useSelector((state: RootState) => state.users.error)
  const dispatch = useDispatch()

  useEffect(() => {
    function fetchData() {
      axios
        .get(url)
        .then((response) => dispatch(usersSlice.actions.usersSuccess(response.data)))
        .catch((error) => console.log(usersSlice.actions.getError(error.message)))
    }

    fetchData()
  }, [dispatch])
  if (isLoading === true) {
    return <p>loading...</p>
  }

  if (error) {
    return <div> {error}</div>
  }
  return (
    <div>
      Users
      {users.map((users: User) => {
        return (
          <div key={users.id}>
            <p> userId:{users.id}</p>
            <p>
              {' '}
              user name:{users.firstName}
              {users.lastName}
            </p>
            <p> role:{users.role}</p>
          </div>
        )
      })}
    </div>
  )
}
