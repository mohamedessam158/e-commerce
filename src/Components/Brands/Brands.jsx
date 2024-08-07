import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Brand from '../Brand/Brand';
import { useQuery } from 'react-query';
import NotFound from '../NotFound/NotFound';

export default function Brands() {


  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let{data,isError,isLoading}=useQuery('getBrands',getBrands)


if(isLoading) return <Loading />
if(isError) return <NotFound />
  return (
    <>
    <div className="container">
      <div className="row my-5">
        {data?.data.data.map( item =>{
       return <Brand item={item} key={item._id} />
        })}
      </div>
    </div>
    </>
  )
}
