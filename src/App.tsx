/* eslint-disable prettier/prettier */
import { ProductsManager } from './components/ProductsManager'
import './App.css'
import {NavBar} from './components/NavBar'
import Hero from './components/Hero'
import Products from './components/Products'
import WhatWeOffer from './components/WhatWeOffer'
import NewsLetterForm from './components/NewsLetterForm'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import ProductsDetail from './components/ProductsDetail'
import CategoriesComponent from './components/CategoriesComponent'
import { useState } from 'react'
import { Categories } from './redux/slices/products/categoriesSlice'

function App() {
  const [selected,setSelected]=useState<Categories|null>();
  return (
    <div className="App"> 
       <NavBar/>
       <Routes>
       <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/products/:id" element={<ProductsDetail  />} />
        </Routes>
        
       <Footer/>
      {/* <ProductsManager /> */}
      </div>
   
  )
}

export default App
