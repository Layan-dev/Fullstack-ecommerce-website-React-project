import './App.css'
import { Route, Routes, useNavigate } from 'react-router'

import { NavBar } from './components/NavBar'
import Products from './components/Products'
import Footer from './components/Footer'
import Home from './components/Home'
import ProductsDetail from './components/ProductsDetail'
import ShoppigCart from './components/ShoppigCart'
import Admin from './components/Admin'
import Login from './components/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ProductForm } from './components/ProductForm'
import CategoriesForm from './components/CategoriesForm'
import Users from './components/Users'
import UserProfilePage from './components/UserProfilePage'
import Orders from './components/Orders'
import Register from './components/Register'
import ActivateUser from './components/ActivateUser'
import { PageNotFound } from './components/404'
import { ForgotPassword } from './components/ForgotPassword'
import { ResetPassword } from './components/ResetPassword'
import { getDecodedTokenFromStorage } from './utils/token'
import { useState, useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const decodedToken = getDecodedTokenFromStorage()
  const [isTokenExpired, setIsTokenExpired] = useState(false)

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('token')
        console.log('Time Expired')
        setIsTokenExpired(true)
      }
    }
  }, [decodedToken])

  if (isTokenExpired) {
    navigate('/login')
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/cart" element={<ShoppigCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/USER/:id" element={<UserProfilePage />} />
        <Route path="/user/activate/:activationToken" element={<ActivateUser />} />
        <Route path="/reset-password/:forgotPasswordCode" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/Admincategoris" element={<CategoriesForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addProduct" element={<ProductForm />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
