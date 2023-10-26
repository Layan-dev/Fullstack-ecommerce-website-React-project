import React from 'react'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addToCart } from '../redux/slices/products/shoppingCartSlice'

export default function ShoppigCart() {
  /* shopping cart workflow:
    1- add or delete item to the shopping cart list
    2- user can update cuantity of cart 
    3- total of items price should be calculated
    4- (optional) if spicific discount needs to be implemented
    5- checkout process
     */
  const addedProduct = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  return (
    <div>
      ShoppigCart
      <div>
        <p></p>
      </div>
    </div>
  )
}
