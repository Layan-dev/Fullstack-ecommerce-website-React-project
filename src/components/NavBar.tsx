import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
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
            to="/products"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
            Shop Products
          </Link>
        </li>
        <li className="mr-1">
          <Link
            to="/login"
            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
            Login
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
      </ul>
    </nav>
  )
}
