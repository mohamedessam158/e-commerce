import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { cartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";

export default function AllOrders() {
  let { getCartOrders } = useContext(cartContext);
  let token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  let [itemData, setItemData] = useState([]);
  let [loading, setLoading] = useState(true);
  

  useEffect(() => {
    (async () => {
      let data = await getCartOrders(decoded.id);
      console.log(data);
      setItemData(data);
      setLoading(false)
    })();
  }, []);
if(loading) return <Loading />
  return (
    <>
      <div className="container my-3 bg-main-light p-3 rounded-4">
        <h2>Orders :</h2>
        <p className="text-main fw-bolder fs-4">Payment is Cash </p>
        <div className="row">
         {
          itemData.map((item)=>{
            return <div className="col-md-12 text-center">
                   <p className="my-2 text-main ">Your total price is : {item.totalOrderPrice} EGP</p>
                      <p className="my-2 text-main textRe" >Your Address is :{item.shippingAddress.details} </p>
                      <p className="my-2 text-main">Your Number is : {item.shippingAddress.phone} </p>
                      <p className="my-2 text-main">Your City is : {item.shippingAddress.city} </p>
                      {item.cartItems?.map((items)=>{
                        return <div key={items.id} className="row my-3 border-bottom">
                            <div className="col-md-3">
                            <img src={items.product.imageCover} className='w-50' alt="" />
                           </div>
                           <div className="col-md-9">
                           <h5>{items.product.title}</h5>
                                <p className='text-main m-0'> Price : {items.price} EGP</p>
                           </div>
                        </div>
                      })}
            </div>
          })
         }

         

          
        </div>
       
      </div>
    </>
  );
}
