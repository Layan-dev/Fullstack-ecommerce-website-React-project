import React from 'react'
import Hero from './Hero'
import NewsLetterForm from './NewsLetterForm'
import WhatWeOffer from './WhatWeOffer'
import Products from './Products'

export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      <NewsLetterForm />
    </div>
  )
}
