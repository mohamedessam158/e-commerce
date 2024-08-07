import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Category from '../Category/Category'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import NotFound from '../NotFound/NotFound'








export default function Categories() {

  function getGategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data,isError,isLoading}=useQuery('getCategories',getGategories)
console.log(data?.data.data);

  
  


if(isLoading) return <Loading />
if(isError) return <NotFound />
  return (
    <>
    <div className="container">
    <div className="row my-5">
      {data?.data.data.map(item =>{
        return <Category item={item} key={item._id} />
      })}
    </div>
    </div>
    </>
  )
}
