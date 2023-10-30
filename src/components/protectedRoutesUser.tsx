// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../redux/store'
// import { Outlet } from 'react-router'
// import Login from './Login'
// import { Adminlogin } from '../redux/slices/products/usersSlice'
// const useAuth = () => {
//   const dispatch = useDispatch()
//   const userloggedIn = useSelector((state: RootState) => state.users.isLoggedIn)
//   const isUser = useSelector((state: RootState) => state.users.isUser)

//   return userloggedIn && isUser &&
// }
// const ProtectedRoutesUser = () => {
//   const isAuth = useAuth()
//   return <div>{isAuth ? <Outlet /> : <Login />}</div>
// }
// export default ProtectedRoutesUser
