import React,{useContext, useState} from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../Context/CartContext';
import { useParams } from 'react-router-dom';

export default function Address() {



 let {payCart} = useContext(cartContext);
let {id}=useParams()
console.log(id);



async function sendDataToApi(values){
 
    let data=await payCart(id,values);
    console.log(data);
    if(data.status=='success'){
      window.location.href=data.session.url
    }
    
  }









    let pay=useFormik({
        initialValues: {
        
          details:"",
          phone:"",
          city:""
       
        },
       
        onSubmit:(values) =>{
          sendDataToApi(values);
          
         
        }
      })
  return (
    <>
    <div className='w-75 m-auto my-5'>
      <h3>Address Now :</h3>
      <form className='mt-2' onSubmit={pay.handleSubmit}>


        


<label htmlFor="details" className='mb-1'>Details:</label>
  <textarea 
  onBlur={pay.handleBlur} 
  value={pay.values.details} 
  onChange={pay.handleChange} type="text" className='form-control mb-2'  name='details' id='details' />

      <label htmlFor="phone" className='mb-1'>Phone:</label>
        <input
         onBlur={pay.handleBlur} 
         value={pay.values.phone}
          onChange={pay.handleChange} type="number" className='form-control mb-2'  name='phone' id='phone'/>  



           <label htmlFor="city" className='mb-1'>City:</label>
        <input
         onBlur={pay.handleBlur} 
         value={pay.values.city}
          onChange={pay.handleChange} type="text" className='form-control mb-2'  name='city' id='city'/>    
       


        <button disabled={!(pay.dirty&pay.isValid)} className='btn bg-main text-white mt-2' type='submit'>
          Pay
        </button>
      </form>
    </div>
    
    </>
  )
}
