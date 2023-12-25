import { Button } from 'reactstrap'
import about1 from '../home_about1.svg'
import homeP1 from '../home-12.jpg'
import homeP2 from '../home-c21.jpg'
import homeP3 from '../home-c22.jpg'
import tableware from '../tableware.jpg'
import art from '../art.jpg'

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
import { Helmet } from 'react-helmet-async'

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
        
         <img loading='lazy'  src={p1} className='rel-product-img'     />
          <p><b>Product1 vase</b></p>
          <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
          <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
          {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}

       </div>
       <div className="carousel-product">
      
         <img loading='lazy'  src={p2}   className='rel-product-img'          />
         <p><b>Product2 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
          {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img loading='lazy'  src={p3}  className='rel-product-img'      />
         <p><b>Product3 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
         {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img loading='lazy'  src={p1}  className='rel-product-img'       />
         <p><b>Product4 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
         {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
       <div className="carousel-product">
       
         <img loading='lazy'  src={p2}   className='rel-product-img'         />
         <p><b>Product5 vase</b></p>
         <p>Rs : <b> &#x20b9; </b> 299 <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;499</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>50 % Off</span> </p>
         <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


       </div>
</Carousel>);
     } 

    return(
        <div style={{  marginTop: "80px",backgroundColor:"rgb(255, 248, 240)"
        }}>
           <Helmet>
     <meta name="description" content="     Largely self-taught, I've embraced curiosity as my guiding force in this artistic exploration. This approach has led to a richly diverse portfolio, ranging from functional tableware to sculptural masterpieces. Each piece bears the mark of a personal journey, a testament to the power of self-discovery in art." />

          <meta name="description" content="We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition." />
          
          <meta name="keywords" content="Ceramics, Pottery, vinkee bhasiin ceramics" />

        </Helmet>
        <div>
        <div className="home-top-sect" style={{position:"relative"}}>
        
        </div>
      
        </div>

        {/* <Categories/> */}
        {/* Section 1 */}
        {/* <div style={{display:"flex",flexDirection:"column",marginTop:"90px"}}>
            
        </div> */}

        {/* <div className='sect-1' ref={sect3Ref} style={{justifyContent:"space-around",backgroundColor:"#ffffff",marginTop:"150px"}} >
          <div className="col1 temp-col21"  style={{width:"47vw",display:"flex",justifyContent:"center",alignItems:"center" ,padding:"10px"}}>
            <img loading='lazy'  src={homeP1} style={{width:"100%",height:"120%"}} />
          </div>

          <div className=" temp-col22" style={{backgroundColor:"#dbe3ea4a",width:"47vw",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",minWidth:"300px"}}>
          <h2 className='ftr italic' style={{margin:"40px"}} >About Me</h2>
            <p className="sect-font ftr italic" style={{margin:"40px",textAlign:"left",fontSize:"18px",fontWeight:"normal"}}>
            Welcome to Vinkee Bhasiin ceramics.I am a passionate artisan dedicated to crafting exquisite ceramic pieces that infuse artistry into everyday life. My journey began with a love for clay and a dream to create objects of beauty and utility. Each piece is a testament to meticulous craftsmanship, blending traditional techniques with a touch of modernity. From functional tableware to sculptural marvels, our collection reflects a harmonious blend of form and function. We draw inspiration from nature, culture, and emotions, channeling them into every creation. Sustainability is at the core of our ethos; we strive to leave a gentle footprint on the earth. We invite you to explore our world of ceramics, where each piece tells a story, and every touch evokes a sense of wonder. Thank you for being a part of our creative journey.             </p>
              </div>
              </div>      */}


            {/* <hr className='row-sep' /> */}

            {/* <h1 className='down-top-animate delay-1 fminerva' style={{

color: "rgb(153, 153, 153)",
fontWeight: "normal",
lineHeight: "3.8rem",
marginBottom: "135px",



            }}><span>Welcome </span><br/> <span style={{color: "rgb(226 143 23)",
            fontWeight: "normal",fontSize:"31PX"}} className='ftr italic'>Creation with my hands</span></h1>
 */}


{/* <h1 className='down-top-animate delay-1 ftr' style={{

color: "rgb(153, 153, 153)",
fontWeight: "normal",
lineHeight: "3.8rem",
marginBottom: "100px",

          

            }}><span>Meet me Vinkee </span></h1> */}
          <div className='tableware-art-sect'>
            <div className='tcol1'>
               <div className='overlay'>
               </div>
               <div className='capt fminerva'>
                <h3>Tableware</h3>
               </div>
            </div>
            <div className='tcol2'>
            <div className='overlay'>
               </div>
               <div className='capt fminerva'>
                <h3>Art</h3>
               </div>

            </div>

          </div>
            
            <div className='sect-1 remove-from-screen' ref={sect1Ref} style={{justifyContent:"space-around",background: "#fff8f0",marginBottom:"100px",marginTop:"0px",marginBottom:"0px"}} >
          <div className="col1 h-sect1-col1"  style={{display:"flex",justifyContent:"center",alignItems:"center" ,width:"58vw",/*height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding:"0px"}}>
            <img loading='lazy'  src={homeP1} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />
          </div>

          <div className="col1 h-sect1-col2 ftr " style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"column",textAlign:"left",width:"40vw",/*height:"40vw",*/minWidth:"300px",padding: "44px",marginBottom:"0"}}>
          <div className='home-about-heading-sect'>
          <h2 className='fminerva' style={{textAlign:"left",width:"100%",marginLeft:"30PX"}} >{/*About us*/}Welcome! <br/> <span style={{color: "rgb(226 143 23)",
            fontWeight: "normal",fontSize:"21PX"}} className='ftr italic'>Creation with my hands</span></h2>
         </div>
            <p className='para-mobile ftr' style={{fontSize: "17px",fontWeight: "normal", fontStyle:""}}>
          Welcome to Vinkee Bhasiin ceramics.I am a passionate artisan dedicated to crafting exquisite ceramic pieces that infuse artistry into everyday life. My journey began with a love for clay and a dream to create objects of beauty and utility. Each piece is a testament to meticulous craftsmanship, blending traditional techniques with a touch of modernity.
           From functional tableware to sculptural marvels, our collection reflects a harmonious blend of form and function. We draw inspiration from nature, culture, and emotions, channeling them into every creation.
            {/* Sustainability is at the core of our ethos; we strive to leave a gentle footprint on the earth. We invite you to explore our world of ceramics, where each piece tells a story, and every touch evokes a sense of wonder. Thank you for being a part of our creative journey.    */}
                      </p>
              </div>
              </div>  


              <div className='sect-1'  style={{justifyContent:"space-around",background: "#fff8f0",marginBottom:"100px",marginTop:"0px",marginBottom:"0px"}} >
          <div className="col1 h-sect1-col1"  style={{display:"flex",justifyContent:"center",alignItems:"center" ,width:"58vw",/*height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding:"0px",height:"fit-content",minHeight:"fit-content"}}>
          </div>

          <div className="col1 h-sect1-col2 ftr " style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"column",textAlign:"left",width:"40vw",/*height:"40vw",*/height:"fit-content",minHeight:"fit-content",minWidth:"300px",padding: "44px",marginBottom:"0"}}>
          <div className='home-about-heading-sect'>
          
            <p className='para-mobile ftr italic' style={{fontSize: "17px",fontWeight: "normal", color:"black",textDecoration:"underline"}}><Link to="https://www.instagram.com/vinkeebhasiin/">Follow me on instagram</Link></p>
            </div>
             
              </div>
              </div>  




 <div style={{display:"flex",flexDirection:"column",marginTop:"90px"}}>
            
        </div> 

 {/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal"}}>Our Delivery Partners</h2> */}

              <div className="sect1"  ref={sect2Ref} >
{/* 
              <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100%",flexWrap:"wrap"}}>
                <img loading='lazy'  src={logo1}  style={{width:"150px",height:"50px",margin:"50px"}}/>
                <img loading='lazy'  src={logo2}  style={{width:"150px",height:"50px",margin:"50px"}}/>
                <img loading='lazy'  src={logo3}  style={{width:"150px",height:"50px",margin:"50px"}}/>

              </div> */}



              </div>
   





{/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal",lineHeight:"2.8rem"}}><b>Our Products!</b><br/>Check some of our top selling Products!</h2> */}
<div className="liner-container">
  
				<h4 className="frs" style={{color:"#D5A372",fontWeight:"bold",fontSize:"30px"}}>Our Products</h4> 
</div>
{<DisplayHomeProducts />}


<div className='sect-1 remove-from-screen show-background-home-bottom' ref={sect3Ref} style={{justifyContent:"space-around",backgroundColor:"#ffffff",marginTop:"150px",    backgroundColor: "#fff8f0", marginBottom: 0}} >
          <div className="col1 temp-col21"  style={{width:"47vw",display:"flex",justifyContent:"center",alignItems:"center" ,/*width:"40vw",height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding:"10px"}}>
            <img loading='lazy'  src={about1} style={{width:"100%",height:"120%"}} />
          </div>

          <div className=" temp-col22" style={{backgroundColor:"",width:"47vw",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"column",/*width:"40vw",height:"40vw",*/minWidth:"300px"}}>
          {/* <h2 className='ftr italic' style={{margin:"40px"}} >Environmental Consciousness</h2> */}
          <div className='home-about-heading-sect'>
          <h2 className='fminerva' style={{textAlign:"left",width:"100%",marginLeft: "66px",
    fontSize: "23px",paddingRight:"30px"}} >Environmental Consciousness</h2>
         </div>
            <p className="sect-font ftr  para-mobile" style={{margin:"40px",textAlign:"left",fontSize:"18px",fontWeight:"normal"}}>
            Our commitment extends beyond aesthetics; it encompasses environmental responsibility. We strive to leave a gentle footprint on the earth, consciously minimizing our impact. This dedication is woven into the very fabric of Vinkee Bhasiin Ceramics, reflecting a belief in sustainable artistry.                    </p>
              </div>
              </div>  
        </div>
    )
}