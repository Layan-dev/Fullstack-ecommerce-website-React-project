import { Link, Navigate } from 'react-router-dom'
import { ProductForm } from './ProductForm'
import Footer from './Footer'
import { NavBar } from './NavBar'
import { isExpired } from '../utils/token'

export default function Admin() {
  const isTokenExpired = isExpired()
  if (isTokenExpired) {
    return <Navigate to="/" />
  }
  return (
    <div>
      <div className="flex">
        <Link to="/users">
          <button>users</button>
        </Link>

        <Link to="/orders">
          <button>orders</button>
        </Link>

        <Link to="/Admincategoris">
          <button>categories</button>
        </Link>
      </div>
      <ProductForm />
    </div>
  )
}
