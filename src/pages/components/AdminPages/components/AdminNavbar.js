import React from 'react'
import { Button, Input } from 'reactstrap'
import AdminRouteLabel from './AdminRouteLabel'

const AdminNavbar = () => {
    return (
        <div className='admin-navbar'>
            <div>
                <AdminRouteLabel />
            </div>
            <div className='right-col'>
                <Input className='global-admin-search' placeholder='Search Anything...' />
                <i className="bi bi-list"></i>
                <i className="bi bi-gear-fill"></i>
                <i className="bi bi-bell-fill"></i>
                <i className="bi bi-person-fill"></i>
                <Button style={{minWidth:"90px",fontWeight:"900"}}><b>Sign Out</b></Button>
                
            </div>
        </div>
    )
}

export default AdminNavbar