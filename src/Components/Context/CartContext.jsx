import axios from "axios";
import { createContext, useState } from "react"
import { date } from "yup";






export const cartContext=createContext(0)


 async function addToCart(productId){
   return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{ headers:{ token:localStorage.getItem('token') }})
     .then(({data})=> data)
     .catch(err => err)
    
}


 async function getCart(){
  return  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{ headers:{ token:localStorage.getItem('token') }})
    .then(({data})=> data)
    .catch(err => err)
   
}



async function deletItem(productId){
  
  return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { headers:{ token:localStorage.getItem('token') }})
  .then(({data})=> data)
  .catch(err => err)
 
}




async function updateCartItem(productId,count){
  
  return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},
    { headers:{ token:localStorage.getItem('token') }})
  .then(({data})=> data)
  .catch(err => err)
 
}



async function payCart(cartId,shippingAddress){
  
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{shippingAddress},
    { headers:{ token:localStorage.getItem('token') }})
  .then(({data})=> data)
  .catch(err => err)
 
}




async function getCartOrders(userId){
  
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    { headers:{ token:localStorage.getItem('token') }})
  .then(({data})=> data)
  .catch(err => err)
}










export default function CartcontextProvider({children}) {

    let [cartCounter,setCartCounter] = useState(0);





    return <cartContext.Provider value={{
      cartCounter
      ,
      setCartCounter
      ,addToCart
      ,getCart
      ,deletItem
      ,updateCartItem
      ,payCart
      ,getCartOrders
      
      }}>
            {children}
    </cartContext.Provider>
}
