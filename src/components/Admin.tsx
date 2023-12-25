import { Link } from 'react-router-dom'

import { ProductForm } from './ProductForm'

export default function Admin() {
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
