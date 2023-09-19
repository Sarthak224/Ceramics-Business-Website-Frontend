import {Home,Menu,ShoppingBag,ShoppingCart,User} from 'react-feather'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
export default function Sidebar(props){

    var productsOnCart = JSON.parse(localStorage.getItem("cart"));
    var cartQty = useSelector(state=>state.changeCartQtyReducer)

    return(
     <div className={props.openMenu?"nav-responsive-sidebar sidebar-open":"nav-responsive-sidebar"} >
      <div style={{textAlign:"right",padding:"10px", fontWeight:"bold",fontSize:"19px", cursor:"pointer"}}  onClick={(e)=>{props.setOpenMenu(false);}}>X</div>
      <div className="sidebar-item" onClick={()=>props.setOpenMenu(false)}> <Link className='sidebar-link' to={"/home"}><span className='nav-link1'>{/*<Home width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-home" style={{color: "#f3f7fe",marginRight:"5px"}}></i> <span>Home</span> </span></Link></div>
      <div className="sidebar-item" onClick={()=>props.setOpenMenu(false)}>   <Link className='sidebar-link' to={"/products"}><span className='nav-link1'> {/*<ShoppingBag width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-shopping-bag" style={{color: "#f3f7fe",marginRight:"5px"}}></i><span> Products</span></span></Link></div>
      <div className="sidebar-item" onClick={()=>props.setOpenMenu(false)}>   <Link className='sidebar-link' to={"/cart"}><span className='nav-link1'> {/*ShoppingCart width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-cart-arrow-down" style={{color: "#f3f7fe",marginRight:"5px",position:'relative'}}>{cartQty>0?<span className='frs' style={{position:"absolute",backgroundColor:"#f24242",width:"13px",height:"13px",borderRadius:"50%",top:"-10px",fontSize:"11px",fontWeight:"100",textAlign:"center"}}>{productsOnCart.length}</span>:null}</i><span> Cart</span></span></Link></div>
      <div className="sidebar-item" onClick={()=>props.setOpenMenu(false)}>   <Link className='sidebar-link' to={"/AboutUs"}>  <span className='nav-link1'> {/*<User width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-user" style={{color: "#f3f7fe",marginRight:"5px"}}></i><span></span>About us</span></Link></div>
     </div>
    )
}