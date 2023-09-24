import logo from '../../logo.png'
import {Home,Menu,ShoppingBag,ShoppingCart,User} from 'react-feather'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { assignOverlay } from '../../redux/actions/navigation';

export default function Navbar(){

    const [openMenu,setOpenMenu] = useState(false);
    const location = useLocation();

    var productsOnCart = JSON.parse(localStorage.getItem("cart"));

    var cartQty = useSelector(state=>state.changeCartQtyReducer)
    const dispatch = useDispatch();

    function applyOverlay(){
       // dispatch(assignOverlay(true));
    }

    useEffect(()=>{

       // setOpenMenu(false);

    },[location])
   
    return (
        <div>
        <div className="navbar-layout-main">
        {/* <div className='nav-comp nav-color' style={{width:"35%",justifyContent:"end",alignItems:"center"}}>
        </div> */}
        <div className='nav-comp nav-color' style={{width:"35%",justifyContent:"end",alignItems:"center"}}>
        <Link className='nav-link' to={"/cart"} onClick={applyOverlay}><span className='nav-link1'>{/*<ShoppingCart width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-cart-arrow-down" style={{color: "#f3f7fe",marginRight:"5px",position:"relative"}}>{cartQty>0?<span className='frs' style={{position:"absolute",backgroundColor:"#f24242",width:"13px",height:"13px",borderRadius:"50%",top:"-10px",fontSize:"11px",fontWeight:"100",textAlign:"center"}}>{productsOnCart.length}</span>:null}</i>Cart </span></Link>

        <Link className='nav-link' to={"/home"} onClick={applyOverlay}><span className='nav-link1'>{/*Home width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-home" style={{color: "#f3f7fe",marginRight:"5px"}}></i> Home </span></Link>
        </div>
        <div className='nav-comp nav-color nav-middle' style={{width:"30%"}}>
            <img src={logo} width={92} height={92}  />
            {/* <span className='brand-text '>React Pottery</span> */}
        </div>
        <div className='nav-comp nav-color' style={{width:"35%",justifyContent:"start",alignItems:"center"}}>
      
          

       <Link className='nav-link' to={"/products"} onClick={applyOverlay}><span className='nav-link1'> {/*<ShoppingBag width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-shopping-bag" style={{color: "#f3f7fe",marginRight:"5px"}}></i> Products</span></Link>


        <Link className='nav-link' to={"/AboutUs"} onClick={applyOverlay}>  <span className='nav-link1'> {/*<User width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-user" style={{color: "#f3f7fe",marginRight:"5px"}} ></i>About us</span></Link>
        </div>
        </div>


        <div className="navbar-layout-main-mobile">
     
        <div className='nav-comp nav-color nav-middle' >
            <img src={logo} width={80} height={80}  />
            {/* <span className='brand-text '>React Pottery</span> */}
        </div>
        <div   className='nav-comp nav-color' style={{width:"35%",justifyContent:"end",alignItems:"center",marginRight:"10px",}}>
      
          
        <h6  className='frs' style={{marginTop:"3px",marginRight:"10px",fontSize:"17px"}}>Menu</h6>
        <Menu size={26} style={{cursor:"pointer"}} className='nav-icon' onClick={()=>setOpenMenu(true)}  />
        <Sidebar openMenu ={openMenu} setOpenMenu={setOpenMenu} />
        </div>
        </div>
        </div>
    )
}