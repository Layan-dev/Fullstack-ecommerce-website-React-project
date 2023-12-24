import axios from 'axios'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { usersInfoSlice } from '../redux/slices/products/userInfoSlice'
import { useParams } from 'react-router'
import {
  getSingleUserThunk,
  updateUserFromPayload,
  updateUserProfileThunk
} from '../redux/slices/products/usersSlice'

// import { updateUser } from '../redux/slices/products/usersSlice'

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
      setUser({ firstName: userData.firstName, lastName: userData.lastName, _id: userData.userID })
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
          dispatch(updateUserFromPayload(productData))
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
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
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
            className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit
          </button>{' '}
        </h2>

        <p className="text-center text-gray-600 mt-1">{userData?.email}</p>

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
                className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 ml-5">
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>

    // <div>
    //   <div>
    //     <h2>
    //       <b>
    //         Hello,{userData?.firstName}
    //         {userData?.lastName}
    //       </b>
    //     </h2>
    //   </div>
    //   <div>
    //     <b>Name:</b>
    //     {userData?.firstName}
    //     {userData?.lastName}
    //     <button type="button" onClick={handleFormOpen}>
    //       Edit
    //     </button>
    //   </div>
    //   <div>
    //     <h2>
    //       <b> ID:</b>
    //       {userData?.userID}
    //     </h2>
    //     <h2>
    //       <b>Email:</b>
    //       {userData?.email}
    //     </h2>
    //   </div>
    //   {isFormOpen && (
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         type="text"
    //         name="firstName"
    //         value={user.firstName}
    //         onChange={handleChange}></input>
    //       <input type="text" name="lastName" value={user.lastName} onChange={handleChange}></input>
    //       <button type="submit">Update profile</button>
    //     </form>
    //   )}
    // </div>

    // <div className="flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 bg-gradient-to-br">
    //   <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
    //     <div className="pb-6">
    //       <div className="flex flex-wrap justify-center">
    //         <div className="flex justify-center w-full">
    //           <div className="relative">
    //             <img
    //               src="https://source.unsplash.com/jmURdhtm7Ng/120x120"
    //               className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mt-2 mt-20 text-center">
    //         <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
    //           Hello, {users?.firstName}
    //           {users?.lastName}
    //         </h3>
    //       </div>
    //       <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
    //         <div className="flex flex-wrap justify-center">
    //           <div className="w-full px-6">
    //             <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
    //               <b> ID:</b>
    //               {users?.id}
    //             </p>
    //             <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
    //               <b> Email:</b>
    //               {users?.email}
    //             </p>
    //           </div>
    //           <div className="md:w-1/3">
    //             <button
    //               onClick={handleFormOpen}
    //               className="shadow bg-blue-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
    //               type="button">
    //               Edit Profile
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
    //         {isFormOpen && (
    //           <form onSubmit={handleSubmit} className="w-full max-w-sm">
    //             <div className="md:flex md:items-center mb-6">
    //               <div className="md:w-1/3">
    //                 <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
    //                   First Name
    //                 </label>
    //               </div>
    //               <div className="md:w-2/3">
    //                 <input
    //                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    //                   type="text"
    //                   value={user.firstName}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div className="md:w-1/3">
    //                 <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
    //                   Last Name
    //                 </label>
    //               </div>
    //               <div className="md:w-2/3">
    //                 <input
    //                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    //                   type="text"
    //                   value={user.lastName}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //             </div>

    //             <div className="md:flex md:items-center">
    //               <div className="md:w-1/3"></div>
    //               <div className="md:w-2/3">
    //                 <button
    //                   className="shadow bg-blue-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    //                   type="submit">
    //                   update Profile
    //                 </button>
    //               </div>
    //             </div>
    //           </form>
    //         )}
    //       </div>
    //       <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
    //         <div className="absolute flex -space-x-12 rounded-b-2xl">
    //           <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10"></div>
    //           <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20"></div>
    //           <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30"></div>
    //           <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40"></div>
    //           <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
