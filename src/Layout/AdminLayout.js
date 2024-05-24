import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../pages/components/Footer'
import Navbar from '../pages/components/Navbar'
import { routes,admin_routes } from '../routes';
import Sidebar from '../pages/components/AdminPages/components/Sidebar'

const AdminLayout = () => {
  return (
    <div className='admin-sect-main' style={{flexGrow:1}}>
        <Sidebar />
        <Routes>
     { routes.map((val)=>{
      return <Route path={val.path} element={val.element} />
     })
}
    </Routes>
   
     {/* <Footer/> */}
    </div>
  )
}

export default AdminLayout