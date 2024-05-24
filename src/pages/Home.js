import { Button } from 'reactstrap'
import about1 from '../home_about1.svg'
import about from '../About.jpg'
import topImg from '../home-img-10.jpeg'//'../home13.jpeg'
import homeMain2 from '../home-img-15.jpeg'//'../home-main2.jpeg'
import homeMain3 from '../home-img-16.jpeg'
import homeMain1 from '../home-main.jpg'
import homeMain4 from '../home-img-12.jpeg'

import homeP1 from '../home-12.jpg'
import homeP2 from '../home-c21.jpg'
import homeP3 from '../home-c22.jpg'
import tableware from '../tableware.jpg'
import art from '../art.jpg'

import { ShoppingBag, ShoppingCart } from 'react-feather'
import Carousel from "react-multi-carousel";
import { div } from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import { Card } from 'reactstrap';
import logo1 from '../logo_codrops.svg'
import logo2 from '../logo_speckyboy.svg'
import logo3 from '../logo_smashing.svg'
import vid1 from '../video pic1.jpg'
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import p1 from '../product-1.png';
import p2 from '../product-2.png';
import p3 from '../product-3.png';
import Categories from './components/Categories';
import DisplayCarousel from './components/DisplayCarousel';
import DisplayHomeProducts from './components/DisplayHomeProducts';
import { Helmet } from 'react-helmet-async'
import ContactUsForm from './components/ContactUsForm'

export default function Home() {

  var product1 = p1;
  let sect1Ref = useRef(null)
  let sect2Ref = useRef(null)
  let sect3Ref = useRef(null)
  let sect4Ref = useRef(null)
  const [titleHide,setTitleHide] = useState(true)


  let prevScroll = useRef(0);


  useEffect(() => {
    window.onscroll = function () {
      //   console.log(window)
      var currentScrollPos = window.pageYOffset;
      console.log(prevScroll, currentScrollPos, window.scrollY, 80)
      if (currentScrollPos > 180) {
        setTitleHide(false);
       // console.log(true);
      } else {
       // console.log(false);

        setTitleHide(true);
      }
      prevScroll.current = currentScrollPos
      //setPrevScroll(currentScrollPos);
    }
    return () => { }
  });




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
    root: null,
    rootMargin: "0px",
    threshold: 0.3

  }

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

  useEffect(() => {
    var observer = new IntersectionObserver(animationCallBack, options)
    if (sect1Ref.current && sect2Ref.current) {
      observer.observe(sect1Ref.current)
      // observer.observe(sect2Ref.current)
     // observer.observe(sect3Ref.current)
      //  observer.observe(sect4Ref.current)

    }

    console.log(sect1Ref)

    return () => {
      if (sect1Ref.current && sect2Ref.current) {
        observer.unobserve(sect1Ref.current)
        //  observer.unobserve(sect2Ref.current)
     //   observer.unobserve(sect3Ref.current)
        //  observer.observe(sect4Ref.current)
      }
    }

  }, [sect1Ref, options])





  function displayCarousel() {
    return (<Carousel
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

        <img loading='lazy' src={p1} className='rel-product-img' />
        <p><b>Product1 vase</b></p>
        <p>Rs : <b> &#x20b9; </b> 299 <span style={{ textDecoration: "line-through", fontSize: "14px", margin: "0px 5px" }}> &#x20b9;499</span> <span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}>50 % Off</span> </p>
        <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}

      </div>
      <div className="carousel-product">

        <img loading='lazy' src={p2} className='rel-product-img' />
        <p><b>Product2 vase</b></p>
        <p>Rs : <b> &#x20b9; </b> 299 <span style={{ textDecoration: "line-through", fontSize: "14px", margin: "0px 5px" }}> &#x20b9;499</span> <span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}>50 % Off</span> </p>
        <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


      </div>
      <div className="carousel-product">

        <img loading='lazy' src={p3} className='rel-product-img' />
        <p><b>Product3 vase</b></p>
        <p>Rs : <b> &#x20b9; </b> 299 <span style={{ textDecoration: "line-through", fontSize: "14px", margin: "0px 5px" }}> &#x20b9;499</span> <span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}>50 % Off</span> </p>
        <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


      </div>
      <div className="carousel-product">

        <img loading='lazy' src={p1} className='rel-product-img' />
        <p><b>Product4 vase</b></p>
        <p>Rs : <b> &#x20b9; </b> 299 <span style={{ textDecoration: "line-through", fontSize: "14px", margin: "0px 5px" }}> &#x20b9;499</span> <span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}>50 % Off</span> </p>
        <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


      </div>
      <div className="carousel-product">

        <img loading='lazy' src={p2} className='rel-product-img' />
        <p><b>Product5 vase</b></p>
        <p>Rs : <b> &#x20b9; </b> 299 <span style={{ textDecoration: "line-through", fontSize: "14px", margin: "0px 5px" }}> &#x20b9;499</span> <span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}>50 % Off</span> </p>
        <button className="add-cart-btn carousel-purchase-btn" >Buy Now <ShoppingCart size={17} /></button>
        {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}


      </div>
    </Carousel>);
  }

  return (
    <div style={{
      marginTop: "80px", backgroundColor: "var(--background)", color: "var(--maincolor)", position: "relative"
    }}>
      <Helmet>
        <meta name="description" content="     Largely self-taught, I've embraced curiosity as my guiding force in this artistic exploration. This approach has led to a richly diverse portfolio, ranging from functional tableware to sculptural masterpieces. Each piece bears the mark of a personal journey, a testament to the power of self-discovery in art." />

        <meta name="description" content="We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition." />

        <meta name="keywords" content="Ceramics, Pottery, vinkee bhasiin ceramics" />

      </Helmet>

      <div className='home-top-sect2'>
        <div className="site-title-col" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%" }}>
          <h2 className='finria-sans home-top-lbl-ttl' style={{ fontSize: "43px", color: "rgb(212 150 152)", minWidth: "242px" }}>Vinkee Bhasiin Ceramics</h2>

        </div>
        <div className='image-col'>
          <img loading='lazy' src={topImg} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{}} />

        </div>
      </div>

    

      <div className='tableware-art-sect intro-sect'>
        <div className='abt-col1'>


          <div className='capt fminerva intro-top-img'>
            <img loading='lazy' src={homeMain2} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{ padding: "0%" }} />
          </div>


        </div>
        <div className='abt-col2'>


          <div className='capt fminerva'>
            {/* <h3>Art</h3> */}
            <div className="col1 h-sect1-col2 ftr " style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", textAlign: "left", width: "90vw",/*height:"40vw",*/minWidth: "300px", padding: "44px", marginBottom: "0" }}>
              <div className='home-about-heading-sect'>
                <h2 className='finria-sans' style={{ textAlign: "left", width: "100%", marginLeft: "30PX" }} >{/*About us*/}Welcome! <br /> <span style={{
                  color: "rgb(226 143 23)",
                  fontWeight: "normal", fontSize: "21PX"
                }} className='ftr italic'>Creation with my hands</span></h2>
              </div>
              <p className='para-mobile finria-sans welcome-para' style={{ fontSize: "1.23rem", fontWeight: "normal", fontStyle: "" }}>
                Welcome to Vinkee Bhasiin ceramics.I am a passionate artisan dedicated to crafting exquisite ceramic pieces that infuse artistry into everyday life. My journey began with a love for clay and a dream to create objects of beauty and utility. Each piece is a testament to meticulous craftsmanship, blending traditional techniques with a touch of modernity.
                From functional tableware to sculptural marvels, our collection reflects a harmonious blend of form and function. We draw inspiration from nature, culture, and emotions, channeling them into every creation.
                {/* Sustainability is at the core of our ethos; we strive to leave a gentle footprint on the earth. We invite you to explore our world of ceramics, where each piece tells a story, and every touch evokes a sense of wonder. Thank you for being a part of our creative journey.    */}
              </p>
            </div>
          </div>

        </div>

      </div>
    





      <div className='intro-sect2'>
        <div className='abt-col1'>


          <div className='capt fminerva intro-top-img'>
            <img loading='lazy' src={homeMain3} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{ padding: "0%" }} />
          </div>


        </div>




        <div className='abt-col1'>


          <div className='capt fminerva intro-top-img'>
            <img loading='lazy' src={homeMain1} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{ padding: "0%" }} />
          </div>


        </div>




        <div className='abt-col1'>


          <div className='capt fminerva intro-top-img'>
            <img loading='lazy' src={homeMain4} alt={"https://www.freepik.com/free-vector/set-people-making-pottery-flat-design_4931770.htm#query=pottery&position=5&from_view=search&track=sph"} className="home-img1" style={{ padding: "0%" }} />
          </div>


        </div>


      </div>

      <div className='intro-sect-2-para'>
      Finding joy and contentment in observing moment to moment, the expression of compassion, care and Kindness the feeling of warmth in a cup of tea with a delicious handmade cake!! This is what i seek in my routine for days and weekdays. The simple, secluded life with a pottery wheel in my garden got me into pottery.

      </div>

      <br/>
      <br/>
      <div className='intro-sect-2-para'>
      The value of making my own kitchen vessels and opt vouyage whether waky donky or weel crafted with bright colors. I bring this all to your table handmade by me.

      </div>









      <div className='sect-1' style={{ justifyContent: "space-around", background: "", marginBottom: "100px", marginTop: "0px", marginBottom: "0px" }} >
        <div className="col1 h-sect1-col1" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "58vw",/*height:"40vw",minWidth:"300px",*//* borderRight:"2px solid #cac8ee",*/padding: "0px", height: "fit-content", minHeight: "fit-content" }}>
        </div>

        <div className="col1 h-sect1-col2 ftr " style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", textAlign: "left", width: "40vw",/*height:"40vw",*/height: "fit-content", minHeight: "fit-content", minWidth: "300px", padding: "44px", marginBottom: "0" }}>
          <div className='home-about-heading-sect'>

            <p className='para-mobile ftr italic' style={{ fontSize: "17px", fontWeight: "normal", color: "black", textDecoration: "underline" }}><Link to="https://www.instagram.com/vinkeebhasiin/">Follow me on instagram</Link></p>
          </div>

        </div>
      </div>




      <div style={{ display: "flex", flexDirection: "column", marginTop: "90px" }}>

      </div>

      {/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal"}}>Our Delivery Partners</h2> */}

      <div className="sect1" ref={sect2Ref} >
      



      </div>






      {/* <h2 className='' style={{color:"#333333",fontSize:"29px",fontWeight:"normal",lineHeight:"2.8rem"}}><b>Our Products!</b><br/>Check some of our top selling Products!</h2> */}
      <div className="liner-container">

        <h4 className="finria-sans" style={{ color: "#D5A372", fontWeight: "bold", fontSize: "30px" }}>Our Products</h4>
      </div>
      {<DisplayHomeProducts />}
 

     
    
    </div>
  )
}