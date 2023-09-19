import { Button } from 'reactstrap'
import homeP1 from '../home_about1.svg'
import about1 from '../About-1.jpg'
import {ShoppingBag,ShoppingCart} from 'react-feather'
import Carousel from "react-multi-carousel";
import {div} from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import {Card} from 'reactstrap';
import logo1 from'../logo_codrops.svg'
import logo2 from'../logo_speckyboy.svg'
import logo3 from '../logo_smashing.svg'
import vid1 from '../video pic1.jpg'
import { Link } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';
import p1 from '../product-1.png'; 
import p2 from '../product-2.png'; 
import p3 from '../product-3.png'; 
import Categories from './components/Categories';
import DisplayCarousel from './components/DisplayCarousel';
import DisplayHomeProducts from './components/DisplayHomeProducts';

export default function Home(){

    var product1 = p1;
    let sect1Ref = useRef(null)
    let sect2Ref = useRef(null)
    let sect3Ref = useRef(null)
    let sect4Ref = useRef(null)


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      var options = {
        root:null,
        rootMargin:"0px",
        threshold:0.3
    
      }
    
      function animationCallBack(entries){
        var [entry] = entries;
        if(entry.isIntersecting){
          // console.log(entry);
          entry.target.classList.add("animate-left-right")
          entry.target.classList.remove("remove-from-screen")

        }
        else{
          //entry.target.classList.remove("animate-left-right")

        }
      }
    
    useEffect(()=>{
      var observer = new IntersectionObserver(animationCallBack,options)
      if(sect1Ref.current && sect2Ref.current){
        observer.observe(sect1Ref.current)
       // observer.observe(sect2Ref.current)
        observer.observe(sect3Ref.current)
      //  observer.observe(sect4Ref.current)

      }

      console.log(sect1Ref)

      return ()=>{
        if(sect1Ref.current && sect2Ref.current){
          observer.unobserve(sect1Ref.current)
        //  observer.unobserve(sect2Ref.current)
          observer.unobserve(sect3Ref.current)
        //  observer.observe(sect4Ref.current)
        }     
       }

    },[sect1Ref,options])

    function displayCarousel(){
      return ( <Carousel
       additionalTransfrom={0}
       arrows
       autoPlaySpeed={3000}
       centerMode={false}
       className=""
       containerClass="container-with-dots"
       dotListClass=""
       draggable
       focusOnSelect={false}
       infinite
       itemClass=""
       keyBoardControl
       minimumTouchDrag={80}
       pauseOnHover
       renderArrowsWhenDisabled={false}
       renderButtonGroupOutside={false}
       renderDotsOutside={false}
       responsive={{
         desktop: {
           breakpoint: {
             max: 3000,
             min: 1024
           },
           items: 4,
           partialVisibilityGutter: 40
         },
         mobile: {
           breakpoint: {
            max: 464,
           min: 0
           },
           items: 2,
           partialVisibilityGutter: 30
         },
         tablet: {
           breakpoint: {
             max: 1024,
             min: 464
           },
           items: 2,
           partialVisibilityGutter: 30
         }
       }}
       rewind={false}
       rewindWithAnimation={false}
       rtl={false}
       shouldResetAutoplay
       showDots={false}
       sliderClass=""
       slidesToSlide={1}
       swipeable
     >
      
       <div className="carousel-product">
        
         <img src={p1} className='rel-product-img'     />
          <p><b>Product1 vase</b></p>
          <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
          <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
          {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}

       </div>
       <div className="carousel-product">
      
         <img src={p2}   className='rel-product-img'          />
         <p><b>Product2 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
          {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img src={p3}  className='rel-product-img'      />
         <p><b>Product3 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
         {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img src={p1}  className='rel-product-img'       />
         <p><b>Product4 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
         {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img src={p2}   className='rel-product-img'         />
         <p><b>Product5 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
</Carousel>);
     } 

    return(
        <div style={{  marginTop: "80px"
        }}>
        <div className="home-top-sect">
         <div style={{margin:"10%",display:"block",textAlign:"left"}}>
        <h1 className='down-top-animate delay-1 ' style={{color:"#999999",fontWeight:"bold",lineHeight:"4.8rem"}}>Welcome to our  React Pottery<br/><span className='' style={{color:"white"}}> Built in React!</span> <span className="theme-text ">React</span></h1>
        <Button  color="" className='button-17 down-top-animate delay-2' style={{background:"#D5A372",color:"white",}}><Link className="nav-link" to={"/products"}>View Products <ShoppingBag className='nav-icon' size={17} /></Link></Button>
        </div>
        </div>

        <Categories/>
        {/* Section 1 */}
        <div style={{display:"flex",flexDirection:"column",marginTop:"90px"}}>
            
        </div>
        <h2 className='ftr italic' >About us</h2>
            {/* <hr className='row-sep' /> */}
            
            <div className='sect-1 remove-from-screen' ref={sect1Ref} style={{justifyContent:"space-around"}} >
          <div className="col1"  style={{display:"flex",justifyContent:"center",alignItems:"center" ,/*width:"40vw",height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding:"10px"}}>
            <img src={homeP1} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />
          </div>

          <div className="col1 ftr italic" style={{display:"flex",justifyContent:"center",alignItems:"center",/*width:"40vw",height:"40vw",*/minWidth:"300px"}}><p style={{fontSize: "19px",fontWeight: "normal", fontStyle:"italic"}}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              </div>  


 {/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal"}}>Our Delivery Partners</h2> */}

              <div className="sect1"  ref={sect2Ref} >
{/* 
              <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100%",flexWrap:"wrap"}}>
                <img src={logo1}  style={{width:"150px",height:"50px",margin:"50px"}}/>
                <img src={logo2}  style={{width:"150px",height:"50px",margin:"50px"}}/>
                <img src={logo3}  style={{width:"150px",height:"50px",margin:"50px"}}/>

              </div> */}



              </div>
   





{/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal",lineHeight:"2.8rem"}}><b>Our Products!</b><br/>Check some of our top selling Products!</h2> */}
<div className="liner-container">
  
				<h4 className="frs" style={{color:"#D5A372",fontWeight:"bold",fontSize:"30px"}}>Our Products</h4> 
</div>
{<DisplayHomeProducts />}


<div className='sect-1 remove-from-screen show-background-home-bottom' ref={sect3Ref} style={{justifyContent:"space-around",backgroundColor:"#ffffff",marginTop:"150px"}} >
          <div className="col1 temp-col21"  style={{width:"47vw",display:"flex",justifyContent:"center",alignItems:"center" ,/*width:"40vw",height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding:"10px"}}>
            <img src={about1} style={{width:"99%",height:"89%"}} />
          </div>

          <div className=" temp-col22" style={{backgroundColor:"#dbe3ea4a",width:"47vw",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",/*width:"40vw",height:"40vw",*/minWidth:"300px"}}>
          <h2 className='ftr italic' style={{margin:"40px"}} >Lorem Ipsum</h2>
            <p className="sect-font ftr italic" style={{margin:"40px",textAlign:"left",fontSize:"18px",fontWeight:"normal"}}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              </div>  
        </div>
    )
}