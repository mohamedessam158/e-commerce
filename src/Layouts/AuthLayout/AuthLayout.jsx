import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import Footer from '../../Components/Footer/Footer'

export default function AuthLayout() {
  return (
    <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <NavLink className="navbar-brand" to="/home">
      <img src={Logo} alt='logo' />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
   

       <li className="nav-item">
          <NavLink className="nav-link mx-3" to="/login">Login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link mx-3" to="/register">Rigister</NavLink>
        </li>
  
     </ul>


      


     
    </div>
  </div>
</nav>
    <Outlet />
   <Footer/>
    </>
  )
}
