import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
import {wishListContext} from '../Context/WishListContext'

export default function ProductDetails() {


  let {addWishList}=useContext(wishListContext);
  let {addToCart,setCartCounter}=useContext(cartContext);

  let x=useParams();
let[product,setProduct]=useState({});
let [loading,setLoading]=useState(true);
let [btnLoading,setBtnLoading]=useState(true);


let [myColor,setMyColor]=useState(false);
let myStyle={};
if(myColor){
  myStyle={color:'red'}
}else{
  myStyle={color:'black'}
}


async function addToWishList(productId){
  let data=  await addWishList(productId);

console.log(data);

  toast.success('Product added successfully to your WishList');


}


async function getProduct(){
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`);
console.log(data.data);
setProduct(data.data);
setLoading(false);

}

useEffect(()=>{
    getProduct();
},[]);





async function addProductToCart(productId){
  setBtnLoading(false);
  let data= await addToCart(productId);
  console.log(data);
  
  if(data.status=='success'){
    toast.success('Product added successfully to your cart');
    setCartCounter(data.numOfCartItems);
    setBtnLoading(true);
   }
 }







if(loading) return <Loading />
  return (
    <>
    <div className="container">
        <div className="row my-5">
            <div className="col-sm-4 col-md-3">
                <img src={product.imageCover} alt="" className='w-100' /> 
                 </div>
                 <div className="col-sm-8 col-md-9">
                        <h4 className='fw-bold my-3'>{product.title}</h4>
                        <p className='my-3'>{product.description}</p>
                        <span className='text-main'>{product.category.name}</span>
                        <div className="d-flex justify-content-between my-3">
            <div>
              {product.price} EG
            </div>
            <div>
            <i className="fa-solid fa-star rating-color"></i>
              {product.ratingsAverage}
            </div>
          </div>
          <button style={myStyle} onClick={()=>{
            addToWishList(product._id);
            setMyColor(!myColor);
          }} className='btn'><i className="fa-solid fa-heart fs-3"></i></button>
          <button className='btn bg-main text-white w-100' onClick={()=>{
            addProductToCart(product._id)

          }}
          disabled={!btnLoading}
          >
            
            { btnLoading ? 'Add To Cart'  : <i class="fa-solid fa-spinner fa-spin"></i>}
            </button>
                 </div>
        </div>
    </div>
    </>
  )
}
