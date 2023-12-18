import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
// import { logout } from '../redux/slices/products/usersSlice'

export const NavBar = () => {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()
  // const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   dispatch(logout())
  //   console.log(userData?.role)
  //   console.log('user logged out')
  //   console.log(isLoggedIn)
  // }
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          <Link
            to="/"
            className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">
            Home
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/cart"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
            🛒
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/admin"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
            Admin
          </Link>
        </li>

        {/* <li className="mr-1">
          <Link
            to="/products"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
            Shop Products
          </Link>
        </li> */}
        {/* {isLoggedIn && (
          <li className="mr-1">
            <Link
              // onClick={(event) => handleAnchorClick(event)}
              to="/login"
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
              Logout
            </Link>
          </li>
        )} */}
        {!isLoggedIn && (
          <>
            <li className="mr-1">
              <Link
                to="/login"
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
                Login
              </Link>
            </li>
            <li className="mr-1">
              <Link
                to="/register"
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
                Register
              </Link>
            </li>
          </>
        )}

        {/* {isLoggedIn && isAdmin && (
      
        )} */}
        {isLoggedIn && !isAdmin && (
          <li className="mr-1">
            <Link
              to="/userProfile"
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
              My Account
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
