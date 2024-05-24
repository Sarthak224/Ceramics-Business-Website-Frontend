import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../pages/components/Footer'
import Navbar from '../pages/components/Navbar'
import { routes,admin_routes } from '../routes';

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <Routes>
     { routes.map((val)=>{
      return <Route path={val.path} element={val.element} />
     })
}
    </Routes>
   
     <Footer/>
    </div>
  )
}

export default MainLayout