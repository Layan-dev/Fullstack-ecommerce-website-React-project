import { ProductsManager } from './components/ProductsManager'
import './App.css'
import { NavBar } from './components/NavBar'
import Products from './components/Products'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import ProductsDetail from './components/ProductsDetail'
import ShoppigCart from './components/ShoppigCart'
import Admin from './components/Admin'
import { NewProductWrapper } from './components/NewProductWrapper'
import { EditProduct } from './components/EditProduct'
import Login from './components/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetail />} />
        <Route path="/cart" element={<ShoppigCart />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/addPr" element={<NewProductWrapper />} />
        </Route>
      </Routes>

      <Footer />
      {/* <ProductsManager /> */}
    </div>
  )
}

export default App
