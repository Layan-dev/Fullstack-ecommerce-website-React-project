/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../redux/store';
import axios from 'axios';
import {productDetailSlice} from '../redux/slices/products/productDetailSlice';
import { Product, removeProduct, userSlice } from '../redux/slices/products/productSlice';

export default function ProductsDetail() {
    <div>ProductsDetail</div>
    // const dispatch= useDispatch();
    const{ id } = useParams();
    

  // const url = "/mock/e-commerce/products.json/"+ `${id}`
  const productDetail= useSelector((state:RootState)=>state.products.items.find(prod => prod.id.toString()===id))
  // const error = useSelector((state: RootState) => state.ProductDetails.error)
  
//   useEffect(() => {
//   function fetchData(){
//     axios.get(url)
//          .then((response )=> dispatch(productDetailSlice.actions.productsSuccess(response.data)))
//          .catch((error)=> dispatch(productDetailSlice.actions.getError(error.message)))
//   }
//   fetchData();
  
// },[])
// if( !productDetail){
//   return <p>no data yet</p>}
  return (
    <div>
   <div key={productDetail?.id}>
      <h3>ProductDetail</h3>
      <p><b>categories:</b> {productDetail?.categories}</p>
      <p><b>sizes:</b>{productDetail?.sizes}</p> 
      <p><b>variants:</b> {productDetail?.variants}</p>
    </div>
   
  </div>
  );
}
