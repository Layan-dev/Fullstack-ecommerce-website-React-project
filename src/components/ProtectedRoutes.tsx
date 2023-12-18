import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router'
import Login from './Login'

const useAuth = () => {
  const userloggedIn = useSelector((state: RootState) => state.users.isLoggedIn)
  const isAdmin = useSelector((state: RootState) => state.users.isAdmin)
  //getting token from local storage
  const user = localStorage.getItem('token')
  //checking whether token is preset or not
  if (user) {
    return true && userloggedIn && isAdmin
  } else {
    return false
  }
}

const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return <div>{isAuth ? <Outlet /> : <Login />}</div>
}
export default ProtectedRoutes
