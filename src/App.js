
import './App.css';
import { RouterProvider,createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Cart from './Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';

import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import { Offline} from "react-detect-offline";
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartcontextProvider from './Components/Context/CartContext';
import { ToastContainer} from 'react-toastify';
import WishListContextProvider from './Components/Context/WishListContext';
import Address from './Components/Address/Address';
import AllOrders from './Components/AllOrders/AllOrders';



function App() {
  let routes=createHashRouter([
      {
        path:'/',element:<MainLayout />,children:[
        {index:true,element:<ProtectedRoutes><Home /></ProtectedRoutes>},
        {path:'/home',element:<ProtectedRoutes><Home /></ProtectedRoutes>},
        {path:'/cart',element:<ProtectedRoutes><Cart /></ProtectedRoutes>},
        {path:'/brands',element:<ProtectedRoutes><Brands /></ProtectedRoutes>},
        {path:'/categories',element:<ProtectedRoutes><Categories /></ProtectedRoutes>},
        {path:'/products',element:<ProtectedRoutes><Products /></ProtectedRoutes>},
        {path:'/wishlist',element:<ProtectedRoutes><Wishlist /></ProtectedRoutes>},
        {path:'/product-details/:id',element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
        {path:'/address/:id',element:<ProtectedRoutes><Address/></ProtectedRoutes>},
        {path:'/allorders',element:<ProtectedRoutes><AllOrders /></ProtectedRoutes>},
       
        {path:'*',element:<NotFound />}

      ]},
      {path:'/',element:<AuthLayout />,children:[
        {path:'/login',element:<Login />},
        {path:'/register',element:<Register />}
      ]}
  ])
  return (
 <>
 <WishListContextProvider>
 <CartcontextProvider>
 <RouterProvider router={routes}/>
 </CartcontextProvider>
 </WishListContextProvider>


 <ToastContainer theme='colored' autoClose={700}/>

  <Offline>Only shown offline (surprise!)</Offline>
 </>
  );
}

export default App;
