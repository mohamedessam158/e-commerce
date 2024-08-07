import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {


  const [errorMsg,setErrorMsg]=useState('');

  const [succMsg,setSuccMsg]=useState('');

  const [loading,setLoading]=useState(true);
   let navigate=useNavigate();
 

 function sendDataToApi(values){
  setLoading(false)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(({data})=>{
    setSuccMsg(data.message)
    
if(data.message=='success'){
  localStorage.setItem('token',data.token)
  navigate('/home')
}
  
  }).catch((err)=>{
    
    setErrorMsg(err.response.data.message);
    setLoading(true)
  })
    
  }

function validationSchema(){
  let schema = new Yup.object({
   
    email:Yup.string().email().required('Email is Required'),
    password:Yup.string().matches(/^[A-Z][A-Za-z0-9@]{6,}$/,'password must match').required('Password is Required'),
   
    
  })
  return schema
}

  
  let login=useFormik({
    initialValues: {
    
      email:"",
      password:"",
   
    },
    validationSchema,
    onSubmit:(values) =>{
      sendDataToApi(values)
     
    }
  })
  
  return (
    <div className='w-75 m-auto my-5'>
      <h3>Login Now:</h3>
      <form className='mt-2' onSubmit={login.handleSubmit}>


        


        <label htmlFor="email" className='mb-1'>Email:</label>
        <input onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange} type="email" className='form-control mb-2'  name='email' id='email'/>
        {login.errors.email && login.touched.email ?<div className='alert alert-danger'>{login.errors.email}</div> :''}

        <label htmlFor="Password" className='mb-1'>Password:</label>
        <input onBlur={login.handleBlur} value={login.values.password} onChange={login.handleChange} type="password" className='form-control mb-2'  name='password' id='password'/>
        {login.errors.password && login.touched.password ?<div className='alert alert-danger'>{login.errors.password}</div> :''}


    

      {errorMsg ? <div className="alert alert-danger text-center">{errorMsg}</div> :''}


      {succMsg ? <div className="alert alert-success text-center">{succMsg}</div> :""}

        <button disabled={!(login.dirty&&login.isValid)} className='btn bg-main text-white mt-2' type='submit'>
          {loading?'Login' : <i class="fa-solid fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  )
}
