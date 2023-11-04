import { useDispatch, useSelector } from 'react-redux'

import { removeUser, usersRequest, usersSuccess } from '../redux/slices/products/usersSlice'
import { RootState } from '../redux/store'

import api from '../api'
import { Link } from 'react-router-dom'

export default function Users() {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const users = state.users

  //fetching data of products
  const handleGetUsers = async () => {
    dispatch(usersRequest)

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
    console.log(res.data)
  }

  return (
    <div className="w-3/4 bg-white p-4">
      <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
        <div className="flex">
          <Link to="/admin">
            <button>products</button>
          </Link>

          <Link to="/orders">
            <button>orders</button>
          </Link>

          <Link to="/Admincategoris">
            <button>categories</button>
          </Link>
        </div>

        <table className="w-full table-fixed border">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Image</th> */}
              <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">First Name</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Last Name</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Role</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Email</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.users.map((user) => (
              <tr key={user.id}>
                {/* <td className="py-4 px-6 border-b border-gray-200">
                  <img src={user.image} width={100} />
                </td> */}
                <td className="py-4 px-6 border-b border-gray-200">{user.firstName}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.lastName}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.role}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.id}</td>
                <td>
                  <button
                    onClick={() => dispatch(removeUser({ userId: user.id }))}
                    className="text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 py-2 px-4 font-small">
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 border-b border-gray-200 whitespace"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
