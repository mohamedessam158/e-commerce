import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function SecondarySlider() {
    const [categories,setCategories]=useState([]);
    async function getCategories(){
        let {data}= await  axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        console.log(data.data);
    }

    useEffect(()=>{
        getCategories();
    },[]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1000
      };
  return (
    <>
   <div className='container my-3'>
   <h3>Shop Popular Categories</h3>
          <Slider {...settings}>
    
   {
    categories.map((item)=>(
       <div className='p-2' key={item._id} >
         <img src={item.image} className='w-100' height='250px' alt="" />
         <h5>{item.name}</h5>
       </div>
    ))
   }
     

    </Slider>
   </div>
    </>
  )
}
