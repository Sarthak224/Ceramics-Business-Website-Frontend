import logo from '../../logo.png'
import {Home,Menu,ShoppingBag,ShoppingCart,User} from 'react-feather'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useEffect, useRef, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { assignOverlay } from '../../redux/actions/navigation';
import GlobalNotification from './GlobalNotification';

export default function Navbar(){

    const [openMenu,setOpenMenu] = useState(false);
    const location = useLocation();
    let prevScroll = useRef(0);
    const [navbarHide,setNavbarHide] = useState(false);

    var productsOnCart = JSON.parse(localStorage.getItem("cart"));

    var cartQty = useSelector(state=>state.changeCartQtyReducer)
    const dispatch = useDispatch();

    function applyOverlay(){
       // dispatch(assignOverlay(true));
    }

    useEffect(()=>{

       // setOpenMenu(false);

    },[location])

    useEffect(() => {
        window.onscroll = function() {
        //   console.log(window)
          var currentScrollPos = window.pageYOffset;
          console.log(prevScroll , currentScrollPos , window.scrollY,80)
          if (prevScroll.current < currentScrollPos && currentScrollPos>80) {
             setNavbarHide(true);
             console.log(true);
          } else {
            console.log(false);

            setNavbarHide(false);
          }
          prevScroll.current=currentScrollPos
         //setPrevScroll(currentScrollPos);
        }
        return () => {}
});
//    alert(navbarHide)
    return (
        <div className='navbar-parent-sticky' >
                    <GlobalNotification text={"Worldwide delivery! 5-day Fedex Economy shipping available. Handmade with love in Latvia, EU."} />

        <div  className="navbar-layout-main"  style={navbarHide?{top:"-100px",transition:"0.3s ease"}:{justifyContent:"space-between",transition:"0.3s ease"}}>

            <div className='nav-comp nav-color' style={{width:"30%",justifyContent:"start"}}>
            <img className='nav-main-icn' loading='lazy' src={logo} width={122} height={122}  style={{marginTop:"-26px"}} />
            {/* <h2 className='fminerva' style={{fontSize: "18px",color: "#820c11",minWidth:"242px"}}>Vinkee Bhasiin Ceramics</h2> */}
        </div>
        <div className='nav-layout-sub-main'>
        {/* <div className='nav-comp nav-color' style={{width:"35%",justifyContent:"end",alignItems:"center"}}>
        </div> */}
        <div className='nav-comp nav-color' style={{width:"95%",justifyContent:"end",alignItems:"center"}}>

        <Link className='nav-link' to={"/home"} onClick={applyOverlay}><span className='nav-link1'>{/*Home width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-home" style={{color: "#f3f7fe",marginRight:"5px"}}></i> Home </span></Link>
        <Link className='nav-link' to={"/AboutUs"} onClick={applyOverlay}>  <span className='nav-link1'> {/*<User width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-user" style={{color: "#f3f7fe",marginRight:"5px"}} ></i>About</span></Link>
        
        <Link className='nav-link' to={"/products"} onClick={applyOverlay}><span className='nav-link1'> {/*<ShoppingBag width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-shopping-bag" style={{color: "#f3f7fe",marginRight:"5px"}}></i> Shop</span></Link>

        <Link className='nav-link' to={"/cart"} onClick={applyOverlay}><span className='nav-link1'>{/*<ShoppingCart width={16} height={16} className='nav-icon'/>*/}<i class="fas fa-cart-arrow-down" style={{color: "#f3f7fe",marginRight:"5px",position:"relative"}}>{cartQty>0?<span className='frs cart-notify' >{productsOnCart.length}</span>:null}</i>Cart </span></Link>

       

        
        </div>

        {/* <div className='nav-comp nav-color nav-middle' style={{width:"30%"}}>
            <img loading='lazy' src={logo} width={122} height={122}  />
        </div> */}
        {/* <div className='nav-comp nav-color' style={{width:"35%",justifyContent:"start",alignItems:"center"}}>
      
          

       </div> */}
        </div>


 
        </div>
               <div className="navbar-layout-main-mobile">
     
               <div className='nav-comp nav-color nav-middle' >
                   <img src={logo} width={102} height={102} style={{margin:"4px"}}  />
                   {/* <span className='brand-text '>React Pottery</span> */}
               </div>
               <div   className='nav-comp nav-color' style={{width:"35%",justifyContent:"end",alignItems:"center",marginRight:"10px",}}>
             
                 
               <h6  className='finria-sans' style={{marginTop:"3px",marginRight:"10px",fontSize:"12px",color:"rgb(129 13 12)",fontWeight:"bold"}}>Menu</h6>
               <Menu size={26} style={{cursor:"pointer",color:"rgb(129 13 12)"}} className='nav-icon' onClick={()=>setOpenMenu(true)}  />
               <Sidebar openMenu ={openMenu} setOpenMenu={setOpenMenu} />
               </div>
               </div>
        </div>
    )
}