import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import NotFound from '../NotFound/NotFound';

export default function Products() {

function getProducts(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

let {data,isLoading,isError}=useQuery('getProducts',getProducts)


  if(isLoading) return <Loading />
  if(isError) return <NotFound />
  return (
   
    <>
 
    <div className="container">
      <div className="row my-5">
        {data?.data.data.map(item =>{
        return  <Product item={item} key={item._id} />
        })}
      </div>
    </div>
    </>
  )
}
