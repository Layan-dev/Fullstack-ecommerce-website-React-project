import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../redux/store'
import { logout } from '../redux/slices/products/usersSlice'

export const NavBar = () => {
  const users = useSelector((state: RootState) => state.users)
  const isAdmin = users.isAdmin
  const isLoggedIn = users.isLoggedIn
  console.log('users from nav', users)
  console.log('admin from nav', isAdmin)
  console.log('logged in from nav', isLoggedIn)

  const dispatch = useDispatch()

  function handleLogout() {
    console.log('inside logout function')
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
        <div className="relative flex items-center">
          <a href="/">
            <img src="images/logo.jpeg" loading="lazy" width="200" height="200" />
          </a>
        </div>
        <ul className="hidden items-center justify-center gap-6 md:flex">
          <li className="pt-1.5 font-dm text-blue-700-lr font-large text-slate-1000">
            <Link to="/">Home</Link>
          </li>

          <li className="pt-1.5 font-dm text-blue-700-lr font-large text-slate-1000">
            <Link to="/cart">Cart</Link>
          </li>
          {isLoggedIn && isAdmin && (
            <li className="pt-1.5 font-dm text-blue-700-lr font-large text-slate-1000">
              <Link to="/admin">Admin</Link>
            </li>
          )}
          {isLoggedIn && !isAdmin && (
            <li className="pt-1.5 font-dm text-blue-700-lr font-large text-slate-1000">
              <Link to={`/${users.userData?.role}/${users.userData?.userID}`}>My Account</Link>
            </li>
          )}
        </ul>

        <div className="flex-grow"></div>

        {!isLoggedIn && (
          <div className="hidden items-center justify-center gap-6 md:flex">
            <li className="pt-1.5 font-dm text-blue-700-lr font-large text-slate-1000">
              <Link to="/login">Login</Link>
            </li>
            <li className="rounded-md bg-gradient-to-br from-yellow-600 to-yellow-400 px-3 py-1.5 font-dm text-lr font-large text-white shadow-md shadow-blue-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
              <Link to="/register">Register</Link>
            </li>
          </div>
        )}
        {isLoggedIn && (
          <div className="hidden items-center justify-center gap-6 md:flex">
            <li className="rounded-md bg-gradient-to-br from-yellow-600 to-yellow-400 px-3 py-1.5 font-dm text-lr font-large text-white shadow-md shadow-blue-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
              <Link to="/" onClick={() => handleLogout()}>
                Logout
              </Link>
            </li>
          </div>
        )}
      </nav>
    </header>
  )
}
