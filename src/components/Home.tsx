import React from 'react'
import Hero from './Hero'
import NewsLetterForm from './NewsLetterForm'
import Products from './Products'
import { NavBar } from './NavBar'
import Footer from './Footer'
import { isExpired } from '../utils/token'
import { Navigate } from 'react-router'

export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      {/* <NewsLetterForm /> */}
    </div>
  )
}
