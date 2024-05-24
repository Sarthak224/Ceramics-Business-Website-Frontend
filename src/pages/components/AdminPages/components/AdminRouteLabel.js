import React from 'react'
import { useLocation } from 'react-router-dom';

const AdminRouteLabel = () => {

  const location = useLocation();
  console.log(location)
  var routeLabels = location.pathname.split('/')
  return (
    <div className='route-label-sect'>

        <div className='route finria-sans'>
            <i className='fas fa-home'></i>
            <span>Admin Dashboard</span>
            <i className="bi bi-arrow-right-short"></i>

        </div>
        {routeLabels.map((val,i)=>{
            if(i==0)
            return;
            return <div className='route finria-sans'>
                <i className='fas fa-user'></i>
                <span>{val}</span>
                {i<routeLabels.length-1 && <i className="bi bi-arrow-right-short"></i>}
            </div>
        })}

    </div>
  )
}

export default AdminRouteLabel