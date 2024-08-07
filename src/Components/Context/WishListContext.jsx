import { createContext, useState } from "react";
import axios from "axios";





export const wishListContext =createContext(0);

async function addWishList(productId){
  return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{ headers:{ token:localStorage.getItem('token') }})
    .then(({data})=> data)
    .catch(err => err)
   
}


async function getWishList(){
    return  axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{ headers:{ token:localStorage.getItem('token') }})
      .then(({data})=> data)
      .catch(err => err)
     
  }


  async function deletWishList(productId){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{ headers:{ token:localStorage.getItem('token') }})
      .then(({data})=> data)
      .catch(err => err)
     
  }








export default function WishListContextProvider({children}){
  let[wishCounter,setWishCounter]=useState(0)

return <wishListContext.Provider value={{getWishList,wishCounter,setWishCounter,addWishList,deletWishList}}>
    {children}
</wishListContext.Provider>
}






