
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import React, { lazy } from 'react';

// import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import ProductView from "../pages/components/ProductView";
import Cart from "../pages/Cart";
 //import About from "../pages/About";
import Checkout from "../pages/Checkout";
import { HashLoader } from 'react-spinners';
import NotFound from "../pages/NotFound";
import CheckoutSuccess from "../pages/components/CheckoutSuccess";
import Orders from "../pages/components/AdminPages/Orders";
import ProductsAdmin from "../pages/components/AdminPages/Products";
import Coupons from "../pages/components/AdminPages/Coupons";
import AdminLogin from "../pages/components/AdminPages/Login";
import ContactUs from "../pages/ContactUs";
import Issues from "../pages/components/AdminPages/Issues";


const About = React.lazy(()=>import("../pages/About"))
const Home =  React.lazy(()=>import("../pages/Home"));


function LoadingPage(){
  return(
    <div className={'loading-overlay'}>
    <div className='main-sect'>
      <HashLoader size={65} loading={true} color="#965c22" />
      <h3 style={{color:"#333"}}>Loading...</h3>
    </div>
  </div>
  )
}


  export var routes = ([
    {
        path: "/AboutUs",
        element:<React.Suspense fallback={<LoadingPage/>}><About/></React.Suspense>,

    },
    {
        path: "/home",
        element: <React.Suspense fallback={<LoadingPage/>}><Home /></React.Suspense>,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
      path: "/product-view",
      element: <ProductView />,
    },
    {
      path: "/contact-us",
      element:<React.Suspense fallback={<LoadingPage/>}><ContactUs /></React.Suspense> ,
    },
    {
      path: "/checkout",
      element:<React.Suspense fallback={<LoadingPage/>}><Checkout /></React.Suspense> ,
    },
    {
      path: "/checkout/success",
      element: <CheckoutSuccess />,
    },
    
    {
      path: "/*",
      element: <NotFound />,
    },

    {
      path:"/cart",
      element:<Cart />
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
      // subRoutes:[
      //   {
      //     path: "/orders",
      //     element: <ProductView />,

      //   },
      //   {
      //     path: "/add-delete-products",
      //     element: <ProductView />,

      //   },
      //   {
      //     path: "/coupons",
      //     element: <ProductView />,

      //   },

      // ]
    },
    {
      path:"/admin/orders",
      element:<Orders />
    },
    {
      path:"/admin/products",
      element:<ProductsAdmin />
    },
    {
      path:"/admin/coupons",
      element:<Coupons />
    },
    {
      path:"/admin/user-issues",
      element:<Issues />
    },

  ]);


  export const admin_routes=[
    {
      path: "/admin",
      element: <ProductView />,
      // subRoutes:[
      //   {
      //     path: "/orders",
      //     element: <ProductView />,

      //   },
      //   {
      //     path: "/add-delete-products",
      //     element: <ProductView />,

      //   },
      //   {
      //     path: "/coupons",
      //     element: <ProductView />,

      //   },

      // ]
    },

  ]