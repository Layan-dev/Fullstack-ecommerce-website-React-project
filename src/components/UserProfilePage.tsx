import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'

import { useParams } from 'react-router'
import { getSingleUserThunk, updateUserProfileThunk } from '../redux/slices/products/usersSlice'

export default function UserProfilePage() {
  const users = useSelector((state: RootState) => state.users)
  const userData = users.userData
  const isLoading = useSelector((state: RootState) => state.userInfo.isLoading)
  const error = useSelector((state: RootState) => state.userInfo.error)
  const { id } = useParams()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: ''
  })
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    handleGetUsers()
    if (userData) {
      setUser({ firstName: userData.firstName, lastName: userData.lastName, _id: userData._id })
    }
  }, [])

  if (isLoading === true) {
    return <p>loading...</p>
  }

  if (error) {
    return <div> {error}</div>
  }

  const handleGetUsers = async () => {
    if (id) {
      dispatch(getSingleUserThunk(id))
        .then((response) => {
          const productData = response.payload
          console.log('productData', productData)

          setUser(productData)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value }
    })
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      if (user._id) {
        dispatch(updateUserProfileThunk({ userId: user._id, updatedUser: user }))
      }
    } catch (error) {
      console.log(error)
    }
    console.log(user)
  }
  return (
    <div style={{ backgroundColor: '' }}>
      <div className="max-w-lg mx-auto my-10 bg-blue-300 rounded-lg shadow-md p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {user?.firstName}
          {user?.lastName}{' '}
          <button
            onClick={handleFormOpen}
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit
          </button>{' '}
        </h2>

        <p className="text-center text-grey-600 mt-1">{userData?.email}</p>

        <div className="flex justify-center mt-5"></div>

        {isFormOpen && (
          <form className="w-full max-w-lg flex" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name">
                  First Name
                </label>
                <input
                  value={user.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name="firstName"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name">
                  Last Name
                </label>
                <input
                  value={user.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 ml-5">
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
