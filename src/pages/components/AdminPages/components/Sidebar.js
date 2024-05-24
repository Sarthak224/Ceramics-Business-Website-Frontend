import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../../logo.png'
import { useState } from 'react';
export default function Sidebar() {


    var location = useLocation();
    const navigate = useNavigate();
    const [activTab,setActivTab] = useState(false);
    // alert(location.pathname)
    return (
        <div style={{ minHeight: "100vh" }}>

            {!(location.pathname == "/admin/login") ? <div className="admin-sidebar" style={{ height: "100%" }}>
                <div className='admin-logo-navbar' >
                    <img src={logo} width={60} height={60} /> <h4 style={{ marginTop: "17px" }}><b></b> <span className='finria-sans' style={{ fontSize: "21px" }}>Admin Panel</span></h4>
                </div>


                {/* Dashboard Links */}
                <div className='admin-links-section'>
                    <div className='links-sect-heading'>Content</div>
                    <div className={activTab=="Coupons"?'admin-sidebar-links finria-sans active':'admin-sidebar-links finria-sans'} onClick={()=>setActivTab("Coupons")}>
                        <Link  to="/admin/coupons"><i class="fas fa-tag" ></i><span>Coupons</span></Link>
                    </div>
                    <div className={activTab=="Orders"?'admin-sidebar-links finria-sans active':'admin-sidebar-links finria-sans'} onClick={()=>setActivTab("Orders")}>
                        <Link  to="/admin/orders?page=1"> <i class="bi bi-bag-check-fill" ></i><span>Orders</span></Link>
                    </div> 
                    <div className={activTab=="Products"?'admin-sidebar-links finria-sans active':'admin-sidebar-links finria-sans'} onClick={()=>setActivTab("Products")}>
                        <Link  to="/admin/products"> <i class="fas fa-edit" ></i><span>Products</span></Link>
                    </div>
                    <div className='admin-sidebar-links finria-sans' >
                        <div onClick={() => { localStorage.setItem("token", ""); navigate('/admin/login') }}  to="/admin/products"> <i class="fas fa-sign-out-alt" ></i><span>Logout</span></div>
                    </div>


                    <div className='links-sect-heading'>Analytics</div>
                     <div className={activTab=="Dashboard"?'admin-sidebar-links finria-sans active':'admin-sidebar-links finria-sans'} onClick={()=>setActivTab("Dashboard")}>
                        <Link  to="/admin/dashboard"> <i class="bi bi-speedometer2"></i><span>Dashboard</span></Link>
                    </div>
                    <div className={activTab=="Messages"?'admin-sidebar-links finria-sans active':'admin-sidebar-links finria-sans'} onClick={()=>setActivTab("Messages")}>
                        <Link  to="/admin/user-issues"> <i class="fas fa-comment-alt"></i><span>Messages</span></Link>
                    </div>
                    {/* <div className='admin-sidebar-links'>
             <i class="fas fa-user" style={{color: "#fefdff",fontSize:"21px",margin:"10px"}}></i><span>Admin User</span>
            </div> <div className='admin-sidebar-links'>
            <i class="fas fa-user" style={{color: "#fefdff",fontSize:"21px",margin:"10px"}}></i><span>Admin User</span> 
            </div>*/}
                </div>
            </div> : null}
        </div>
    )
}