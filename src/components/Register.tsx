import React, { ChangeEvent, FormEvent, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
// import { RootState } from '../redux/store'
// import { addUser, login, usersRequest, usersSuccess } from '../redux/slices/products/usersSlice'
import api from '../api'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'

export default function Regeregister() {
  // const users = useSelector((state: RootState) => state.users.users)
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [successMessage, setSuccessMessage] = useState<null | string>(null)
  const [loading, setloading] = useState(false)

  // useEffect(() => {
  //   handleGetUsers()
  // }, [])
  // const handleGetUsers = async () => {
  //   dispatch(usersRequest())

  //   const res = await api.get('/mock/e-commerce/users.json')
  //   dispatch(usersSuccess(res.data))
  // }

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  console.log(user)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setloading(true)
      const res = await api.post('/api/auth/register', user)
      console.log('res', res)
      setSuccessMessage(res.data.msg)
      setErrorMessage(null)
    } catch (error) {
      console.log('error', error)
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data)
        setSuccessMessage(null)
      }
    } finally {
      setloading(false)
    }

    // try {
    //   const foundUser = users.find((userData) => userData.email === user.email)

    //   if (foundUser && foundUser.email === user.email) {
    //     console.log('user already exist')
    //   } else {
    //     dispatch(addUser(user))
    //     console.log(user)
    //     dispatch(login(true))
    //     alert('you sucssfully register')
    //     navigate('/')
    //     console.log('sucsses')
    //   }
    // } catch (error) {
    //   setErrorMessage('An error occurred')
    // }
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>{' '}
              {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
              {successMessage && (
                <div className="error-message text-green-600">{successMessage}</div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First name
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last name
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-success-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
