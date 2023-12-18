import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { RootState } from '../redux/store'
// import axios from 'axios'

// import { Adminlogin, login, usersSlice } from '../redux/slices/products/usersSlice'
import { useNavigate } from 'react-router'
import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
import { loginThunk } from '../redux/slices/products/usersSlice'

export default function Login() {
  // const users = useSelector((state: RootState) => state.users.users)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [successMessage, setSuccessMessage] = useState<null | string>(null)
  const [loading, setloading] = useState(false)
  const state = useSelector((state: RootState) => state)
  const user = state.users.userData
  const users = state.users
  const dispatch = useDispatch<AppDispatch>()

  const [credentials, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setloading(true)
      // const res = await api.post('/api/auth/login', user)
      // console.log('res', res)
      // setSuccessMessage(res.data.msg)
      dispatch(loginThunk(credentials)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          console.log('is there token?', res.payload)
          localStorage.setItem('token', res.payload.token)
        }
      })
      // setErrorMessage(null)
    } catch (error) {
      // console.log('error', error)
      // if (error instanceof AxiosError) {
      //   setErrorMessage(error.response?.data)
      //   setSuccessMessage(null)
    }
    // } finally {
    //   setloading(false)
    // }
  }
  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault()
  //   try {
  //     const foundUser = users.find((userData) => userData.email === user.email)
  //     if (foundUser && foundUser.password === user.password) {
  //       dispatch(login(foundUser))
  //       console.log('logeed In')
  //       if (foundUser && foundUser.role === 'admin') {
  //         dispatch(Adminlogin(foundUser))
  //         navigate('/admin')
  //       } else {
  //         navigate('/')
  //       }
  //     } else {
  //       alert('email or password are wrong, try again ')
  //       console.log('somthing wrong')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={handleInputChange}
                  value={credentials.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  onChange={handleInputChange}
                  defaultValue={credentials.password}
                />
              </div>

              <button
                type="submit"
                className="w-full text-black bg-primary-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
            {/* {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
            {successMessage && <div className="error-message text-green-600">{successMessage}</div>} */}
          </div>
        </div>
        {users.error && <p className="text-red-600">{users.error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>
    </section>
  )
}
