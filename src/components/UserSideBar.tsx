import { Link } from 'react-router-dom'

export default function UserSideBar() {
  return (
    <div>
      <div className="flex">
        <Link to="/userProfile">
          <button>user info</button>
        </Link>
        <Link to="/orders">
          <button>orders</button>
        </Link>
      </div>
    </div>
  )
}
