import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import {wishListContext} from '../Context/WishListContext'
export default function Navbar() {

  let {getWishList,wishCounter,setWishCounter}=useContext(wishListContext);
let{cartCounter,setCartCounter,getCart}=useContext(cartContext);




useEffect( ()=>{
  (async ()=>{
   let data= await getWishList()
  
 
  setWishCounter(data.count);
  })()
  },[]);








useEffect( ()=>{
(async ()=>{
 let data= await getCart()

 setCartCounter(data.numOfCartItems);
 
})()
},[]);



  







  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <NavLink className="navbar-brand" to="/home">
      <img src={logo} alt='logo' />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">Home</NavLink>
        </li>

     
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/brands">Brands</NavLink>
        </li>
   
      </ul>



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
       <li className="nav-item mx-3">
         <NavLink className="nav-link position-relative" to="/cart">Cart
         <i className="fa-solid fa-cart-shopping nav-icon mx-1"></i>
    {cartCounter ?      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1">
    {cartCounter}
    <span className="visually-hidden">unread messages</span>
  </span> :''}
         </NavLink>
       </li>


       <li className="nav-item mx-3">
         <NavLink className="nav-link position-relative" to="/wishlist">Wishlist
         <i className="fa-solid fa-heart nav-icon mx-1"></i>
       { wishCounter ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1">
    {wishCounter}
    <span className="visually-hidden">unread messages</span>
  </span> :''}
         </NavLink>
       </li>

       <li className="nav-item">
          <NavLink className="nav-link mx-3" to="/allorders">Orders</NavLink>
        </li>

       <li className="nav-item">
          <NavLink className="nav-link mx-3" to="/login">Signout</NavLink>
        </li>
  
     </ul>


      


     
    </div>
  </div>
</nav>

    </>
  )
}
