import { Button,Row,Col } from 'reactstrap'
import {ShoppingBag,ShoppingCart} from 'react-feather'
import { Link } from 'react-router-dom'
import about1 from '../About-1.jpg'
import about2 from '../About-2.jpg'
import about3 from '../About-3.jpg'
import Categories from './components/Categories'
import homeP2 from '../home-c21.jpg'
import homeP3 from '../home-c22.jpg'
import homeP1 from '../About.jpg'//'../home-12.jpg'

import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'

export default function About(){


  let sect1Ref = useRef(null)
  let sect2Ref = useRef(null)
  // let sect3Ref = useRef(null)
  // let sect4Ref = useRef(null)
  
  function animationCallBack(entries) {
    var [entry] = entries;
    if (entry.isIntersecting) {
      // console.log(entry);
      entry.target.classList.add("animate-left-right")
      entry.target.classList.remove("remove-from-screen")

    }
    else {
      //entry.target.classList.remove("animate-left-right")

    }
  }


  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3

  }

  useEffect(() => {
    var observer = new IntersectionObserver(animationCallBack, options)
    if (sect1Ref.current) {
      observer.observe(sect1Ref.current)
      // observer.observe(sect2Ref.current)
     // observer.observe(sect3Ref.current)
      //  observer.observe(sect4Ref.current)

    }

    console.log(sect1Ref)

    return () => {
      if (sect1Ref.current ) {
        observer.unobserve(sect1Ref.current)
        //  observer.unobserve(sect2Ref.current)
     //   observer.unobserve(sect3Ref.current)
        //  observer.observe(sect4Ref.current)
      }
    }

  }, [sect1Ref, options])





    return(
        <div className='main-layout' style={{  marginTop: "90px"
    }}>
        <Helmet>
     <meta name="description" content="     Largely self-taught, I've embraced curiosity as my guiding force in this artistic exploration. This approach has led to a richly diverse portfolio, ranging from functional tableware to sculptural masterpieces. Each piece bears the mark of a personal journey, a testament to the power of self-discovery in art." />

          <meta name="description" content="We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition." />
          
          <meta name="keywords" content="Ceramics, Pottery, vinkee bhasiin ceramics" />

        </Helmet>
 <div className="about-page-top-sect">
     <div style={{margin:"2%",display:"block",textAlign:"left"}}>
    <h1 className='down-top-animate delay-1  italic category-main-sect-title finria-sans' style={{color:"#999999",fontWeight:"normal",lineHeight:"4.8rem",textAlign:"center"}}>Join Us on this Artistic Journey</h1>
    </div>
    <p className=' italic para-mobile finria-sans' style={{fontSize:"20px",margin:"0% 10%"}}>We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition. </p>
    </div>  


    <div className='about-body'>
       {/* <div className='about-sect-1 '>
        <h1 className='category-main-sect-title fminerva'  ><b>A Self-Taught Odyssey</b></h1>
        <p className='para-mobile' style={{marginBottom:"50px"}}>
        Largely self-taught, I've embraced curiosity as my guiding force in this artistic exploration. This approach has led to a richly diverse portfolio, ranging from functional tableware to sculptural masterpieces. Each piece bears the mark of a personal journey, a testament to the power of self-discovery in art.
        </p>
       </div> */}
       {/* <div className='spacer'></div> */}
       <div className='sect-1 remove-from-screen ' ref={sect1Ref} style={{ justifyContent: "space-around", background: "", marginBottom: "100px", marginTop: "0px", marginBottom: "0px" }} >
        <div className="col1 h-sect1-col1 abt-para-col-1-img" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "39vw",/*height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding: "0px" }}>
          <img loading='lazy' src={homeP1} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />
        </div>

        <div className="col1 h-sect1-col2 ftr abt-para-col-2 " style={{ display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "column", textAlign: "left", width: "60vw",/*height:"40vw",*/minWidth: "300px", padding: "44px", marginBottom: "0" }}>
          <div className='home-about-heading-sect'>
            <h2 className='finria-sans' style={{ textAlign: "left", width: "100%", marginLeft: "30PX",marginBottom:"13%" }} >Embracing Challenges, Igniting Motivation <br /> <span style={{
              color: "rgb(226 143 23)",
              fontWeight: "normal", fontSize: "21PX"
            }} className='ftr italic'> </span></h2>
          </div>
          <p className='para-mobile finria-sans' style={{ fontSize: "17px", fontWeight: "normal", fontStyle: "" }}>
          In this creative odyssey, every setback is a stepping stone. Challenges are not obstacles, but rather sparks that ignite a new wave of motivation. Each hurdle fuels the determination to transcend boundaries, resulting in creations that resonate with authenticity and resilience.{/* Sustainability is at the core of our ethos; we strive to leave a gentle footprint on the earth. We invite you to explore our world of ceramics, where each piece tells a story, and every touch evokes a sense of wonder. Thank you for being a part of our creative journey.    */}
          </p>
        </div>
      </div>
       </div>
       {/* <div className='spacer'></div> */}

       {/* <div style={{display:"flex",flexDirection:"column",marginTop:"90px"}}>
            
            </div>
       <div className='home-grid-2'>
  <div>
  <img loading='lazy'  src={homeP2} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />

  </div>
  <div className='mid-col'>
  <div style={{margin:"2%",display:"block",textAlign:"left"}}>
    <h1 className='down-top-animate delay-1 ftr italic category-main-sect-title' style={{color:"#999999",fontWeight:"normal",lineHeight:"4.8rem",textAlign:"center",fontSize:"28PX"}}>Join Us on this Artistic Journey</h1>
    </div>
    <p className='ftr italic para-mobile' style={{fontSize:"20px",margin:"0% 10%",fontSize:"16PX"}}>We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition. </p>
    <Link to="/AboutUs"><button className='view-abt-btn'>Meet Vinkee </button></Link>
  </div>
  <div>
  <img loading='lazy'  src={homeP3} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />

  </div>

</div>

<div style={{display:"flex",flexDirection:"column",marginTop:"90px"}}>
            
        </div>


       <div className='about-sect-2 '>
          <Row className='bg-white'>
            <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}} >
               <img loading='lazy' src={about1} style={{width:"100%",height:"100%",maxHeight:"599px",objectFit:"cover"}} /> 
            </Col>
            <Col className='about-col mobile-col-background1' md="6" style={{alignItems:"left"}}>
            <h1 className='fminerva' style={{margin:"10px 50px"}}><b>Simplicity and Craftsmanship at the Core</b></h1>
           <p className='frs text-mobile' style={{padding:"60px",textAlign:"left"}}>      At the heart of Vinkee Bhasiin Ceramics lies a dedication to simplicity, handcraftsmanship, and the celebration of functional beauty. With a delicate balance of traditional techniques and contemporary sensibilities, each creation is an embodiment of meticulous care and devotion.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
           
            </Col>

          </Row>
          <Row className='bg-white'>
          <Col className='about-col mobile-col-background2' md="6" style={{alignItems:"left"}}>
          <h1 className='fminerva' style={{margin:"10px 50px"}}><b>Natural Charm and Unique Character</b></h1>
           <p className='frs text-mobile'  style={{padding:"60px",textAlign:"left"}}>    Every piece exudes a natural, distinctive charm. It is a reflection of a thoughtful design process, one that ensures no two creations are alike. Each work of art carries a unique character, an imprint of its journey from raw clay to finished masterpiece.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
            </Col>
          <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}}>
          <img loading='lazy' src={about2} style={{width:"100%",height:"100%",maxHeight:"599px",objectFit:"cover"}} /> 

          </Col>

          </Row>
       </div>
       <h1 className='frs about-heading-temp' style={{margin:"10vh 2vh 0px",textUnderlineOffset:"initial",textDecoration:"underline"}}> Shop now by Category <i class="fas fa-shopping-bag" style={{color: "inherit",marginLeft:"30px"}}></i></h1>

       {/* <Categories/> */}

      {/* <h1 className='frs about-heading-temp' style={{margin:"30vh 0px"}}> <i class="fab fa-instagram" style={{margin:"0px 30px"}}></i>Follow us on Instagram</h1>

    </div> */}



    



    </div>
    )
}