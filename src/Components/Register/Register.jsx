import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {


  const [errorMsg,setErrorMsg]=useState('');

  const [succMsg,setSuccMsg]=useState('');

  const [loading,setLoading]=useState(true);
   let navigate=useNavigate();
 

 function sendDataToApi(values){
  setLoading(false)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(({data})=>{
    setSuccMsg(data.message)
    
if(data.message=='success'){
  navigate('/login')
}
  
  }).catch((err)=>{
    
    setErrorMsg(err.response.data.message);
    setLoading(true)
  })
    
  }

function validationSchema(){
  let schema = new Yup.object({
    name:Yup.string().min(2).max(10).required('Name is Required'),
    email:Yup.string().email().required('Email is Required'),
    password:Yup.string().matches(/^[A-Z][A-Za-z0-9@]{6,}$/,'password must match').required('Password is Required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')]).required('rePassword is Required'),
    phone:Yup.number().required('phone is Required')
  })
  return schema
}

  
  let register=useFormik({
    initialValues: {
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema,
    onSubmit:(values) =>{
      sendDataToApi(values)
     
    }
  })
  
  return (
    <div className='w-75 m-auto my-5'>
      <h3>Register Now:</h3>
      <form className='mt-2' onSubmit={register.handleSubmit}>


        <label htmlFor="name" className='mb-1'>Name:</label>
        <input onBlur={register.handleBlur} value={register.values.name} onChange={register.handleChange} type="text" className='form-control mb-2'  name='name' id='name'/>
        {register.errors.name && register.touched.name ?<div className='alert alert-danger'>{register.errors.name}</div> :''}


        <label htmlFor="email" className='mb-1'>Email:</label>
        <input onBlur={register.handleBlur} value={register.values.email} onChange={register.handleChange} type="email" className='form-control mb-2'  name='email' id='email'/>
        {register.errors.email && register.touched.email ?<div className='alert alert-danger'>{register.errors.email}</div> :''}

        <label htmlFor="Password" className='mb-1'>Password:</label>
        <input onBlur={register.handleBlur} value={register.values.password} onChange={register.handleChange} type="password" className='form-control mb-2'  name='password' id='password'/>
        {register.errors.password && register.touched.password ?<div className='alert alert-danger'>{register.errors.password}</div> :''}


        <label htmlFor="rePassword" className='mb-1' >Repassword:</label>
        <input onBlur={register.handleBlur} value={register.values.rePassword} onChange={register.handleChange} type="password" className='form-control mb-2'  name='rePassword' id='rePassword'/>
        {register.errors.rePassword && register.touched.rePassword ?<div className='alert alert-danger'>{register.errors.rePassword}</div> :''}


        <label htmlFor="phone" className='mb-1' >Phone:</label>
        <input onBlur={register.handleBlur} value={register.values.phone} onChange={register.handleChange} type="number" className='form-control mb-2'  name='phone' id='phone'/>
        {register.errors.phone && register.touched.phone ?<div className='alert alert-danger'>{register.errors.phone}</div> :''}





      {errorMsg ? <div className="alert alert-danger text-center">{errorMsg}</div> :''}


      {succMsg ? <div className="alert alert-success text-center">{succMsg}</div> :""}

        <button disabled={!(register.dirty&&register.isValid)} className='btn bg-main text-white mt-2' type='submit'>
          {loading?'Register' : <i class="fa-solid fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  )
}
