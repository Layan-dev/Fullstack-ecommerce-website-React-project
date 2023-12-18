import { useDispatch, useSelector } from 'react-redux'

// import { removeUser, usersRequest, usersSuccess } from '../redux/slices/products/usersSlice'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import { Link } from 'react-router-dom'
import {
  Role,
  User,
  deleteUserThunk,
  getUsersThunk,
  grantRoleUserThunk
} from '../redux/slices/products/usersSlice'
import { ChangeEvent, useEffect } from 'react'
import { ROLES } from '../constants'

export default function Users() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)
  console.log('users from users component', users)

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  const handleDeleteUser = (id: string) => {
    console.log('id:', id)

    // Distapch delete user Thunk
    dispatch(deleteUserThunk(id))
  }

  const handleGrantRole = (e: ChangeEvent<HTMLSelectElement>, userId: User['_id']) => {
    const role = e.target.value as Role
    dispatch(grantRoleUserThunk({ role, userId }))
  }
  //fetching data of products
  // const handleGetUsers = async () => {
  //   // dispatch(usersRequest)

  //   const res = await api.get('/mock/e-commerce/users.json')
  //   // dispatch(usersSuccess(res.data))
  //   console.log(res.data)
  // }

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
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Grant Role</th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                {/* <td className="py-4 px-6 border-b border-gray-200">
                  <img src={user.image} width={100} />
                </td> */}
                <td className="py-4 px-6 border-b border-gray-200">{user.firstName}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.lastName}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.role}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user._id}</td>
                <td>
                  <select name="roles" title="roles" onChange={(e) => handleGrantRole(e, user._id)}>
                    <option>Select Role</option>
                    {Object.keys(ROLES).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    // onClick={() => dispatch(removeUser({ userId: user.id }))}
                    onClick={() => handleDeleteUser(user._id)}
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
