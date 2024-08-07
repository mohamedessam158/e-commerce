import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import {wishListContext} from '../Context/WishListContext'
import { toast } from 'react-toastify';
export default function Product({item}) {
  let [btnLoading,setBtnLoading]=useState(true);
  let [myColor,setMyColor]=useState(false);
let myStyle={};
if(myColor){
  myStyle={color:'red'}
}else{
  myStyle={color:'black'}
}
let{cartCounter,setCartCounter,addToCart}=useContext(cartContext);
let {addWishList,getWishList,setWishCounter}=useContext(wishListContext);


 async function addToWishList(productId){
  let data=  await addWishList(productId);

console.log(data);
if(data.status=='success'){
  toast.success('Product added successfully to your WishList');
  let da=await getWishList();
  console.log(da);
  setWishCounter(da.count)
}




}





async function addProductToCart(productId){
  setBtnLoading(false)
 let data= await addToCart(productId);
 
 console.log(data);
 
 
 if(data.status=='success'){
  toast.success('Product added successfully to your cart');
  setCartCounter(data.numOfCartItems);
  setBtnLoading(true)
 }


}




  return (
    <>
    <div key={item._id} className="col-sm-12 col-md-2">
        <div className="product cursor-pointer rounded-4 p-3">
       <Link to={'/product-details/' + item._id}>
       <img src={item.imageCover} className='w-100' alt=""  />
          <span className='text-main'>{item.category.name}</span>
          <h5 className='my-2 fw-bold' >{item.title.split(' ').slice(0,2).join(' ')}</h5>
          <div className="d-flex justify-content-between my-3">
            <div>
              {item.price} EG
            </div>
            <div>
            <i className="fa-solid fa-star rating-color"></i>
              {item.ratingsAverage}
            </div>
          </div>
       </Link>
          <button style={myStyle} className='btn'
          onClick={()=>{
            addToWishList(item._id);
            setMyColor(!myColor);
          }}
          ><i className="fa-solid fa-heart fs-3"></i></button>
          <button className='btn bg-main text-white w-100'onClick={()=>{
            addProductToCart(item._id)
          }}  
          disabled={!btnLoading}
          >
          
            {btnLoading ? 'Add To Cart': <i className="fa-solid fa-spinner fa-spin"></i>}
           </button>
          

        </div>
        </div>
    </>
  )
}
