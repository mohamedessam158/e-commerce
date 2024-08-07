import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../Context/WishListContext';
import { toast } from 'react-toastify';
import { Link} from 'react-router-dom';

export default function Wishless() {
    let {getWishList,wishCounter,setWishCounter,deletWishList,addWishList}=useContext(wishListContext);
    let [data,setData]=useState({});
    let [wishItem,setWishItem]=useState([]);
    
useEffect(()=>{
(async()=>{
 let data = await getWishList();
 setWishCounter(data.count)
 setWishItem(data?.data);
 setData(data)

})()
},[])



async function removeItem(productId){
 let data=await  deletWishList(productId)
 console.log(data);
if(data.status=='success'){
  
let da= await getWishList()
toast.error('Product Delete Successfully from WishList');
setWishCounter(da.count)
setWishItem(da?.data);
setData(da)

}
  
}

if(wishCounter==0)return <div className='cartEmpaty '>
<h4 className='text-main text-center my-4'>Your WishList is Empty .</h4>
<Link to={'/'}><button className='btn bg-main m-auto text-white'>Go Shopping</button></Link>
</div>






  return (
    <>
    <div className="container my-3 bg-main-light p-3 rounded-4">
<h2>Your Fav WishList :</h2>
<p className='text-main'>total Quantity : {wishCounter}</p>
{wishItem.map(item =>{
  return <div key={item._id} className="row py-2 border-bottom">
    <div className="col-md-1">
      <img src={item.imageCover} alt="" className='w-100' />
    </div>
    <div className="col-md-11">
<div className='d-flex justify-content-between'>
<div>
<h3 className='mb-2'>{item.title.split(' ').slice(0,7).join(' ')}</h3>
<span className='text-main mb-2'>Price: {item.price} EG</span>
<p className='bold mb-2'>{item.description.split(' ').slice(0,7).join(' ')}</p>
</div>
<div>
<i className="fa-solid fa-heart rating-color mx-1"></i>

<span className='mx-2'>
 {item.ratingsAverage}</span>
 <button onClick={()=>{
  removeItem(item.id);
 }} className='btn bg-main text-white'>
 <i className="fa-solid fa-trash text-white me-1"></i>
  Remove</button>
</div>

</div>

    </div>
   
  </div>
})}

    </div>
    </>
  )
}
