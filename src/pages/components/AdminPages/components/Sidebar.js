import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../../logo.svg'
export default function Sidebar(){


    var location = useLocation();
    const navigate = useNavigate();
    // alert(location.pathname)
    return(
        <div style={{minHeight:"100vh"}}>

       {!(location.pathname=="/admin/login")? <div className="admin-sidebar" style={{height:"100%"}}>
            <div className='admin-logo-navbar' style={{padding:"15px",display:"flex",justifyContent:"left",alignItems:"center",borderBottom:"1px solid  rgba(215, 214, 227, 0.26)"}}>
               <img src={logo} width={60} height={60} /> <h4 style={{marginTop:"7px"}}><b>React</b> <span style={{fontSize:"21px"}}>Admin</span></h4>
            </div>
            <div className='admin-user-title' style={{padding:"15px",display:"flex",justifyContent:"center",alignItems:"center",borderBottom:"1px solid  rgba(215, 214, 227, 0.26)"}}>
            <i class="fas fa-user" style={{color: "#fefdff",fontSize:"21px",margin:"5px 10px"}}></i><span>Admin User</span>
            </div>

            {/* Dashboard Links */}
            <div className='admin-sidebar-links'>
            <Link style={{color:"#fff"}} to ="/admin/coupons"><i class="fas fa-tag" style={{color: "#fefdff",fontSize:"21px",margin:"10px 30px",marginLeft:"0"}}></i><span>Coupons</span></Link>
            </div>
            <div className='admin-sidebar-links'>
            <Link style={{color:"#fff"}} to ="/admin/orders?page=1"> <i class="fas fa-shopping-bag" style={{color: "#ffffff",margin:"10px 30px",marginLeft:"0",fontSize:"21px"}}></i><span>Orders</span></Link>
            </div> <div className='admin-sidebar-links'>
            <Link style={{color:"#fff"}} to ="/admin/products"> <i class="fas fa-edit" style={{color: "#fefefe",margin:"10px 30px",marginLeft:"0",fontSize:"21px"}}></i><span>Products</span></Link>
            </div>
            <div className='admin-sidebar-links'>
            <div onClick={()=>{localStorage.setItem("token","");navigate('/admin/login')}} style={{color:"#fff",display:"flex",flexWrap:"nowrap",alignItems:"center"}} to ="/admin/products"> <i class="fas fa-sign-out-alt" style={{color: "#fefefe",margin:"10px 30px",marginLeft:"0",fontSize:"21px"}}></i><span>Logout</span></div>
            </div>
            {/* <div className='admin-sidebar-links'>
             <i class="fas fa-user" style={{color: "#fefdff",fontSize:"21px",margin:"10px"}}></i><span>Admin User</span>
            </div> <div className='admin-sidebar-links'>
            <i class="fas fa-user" style={{color: "#fefdff",fontSize:"21px",margin:"10px"}}></i><span>Admin User</span> 
            </div>*/}

        </div>:null}
        </div>
    )
}