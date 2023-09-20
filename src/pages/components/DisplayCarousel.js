import pv1 from '../../product-1.png'
import pv2 from '../../product-2.png'
import pv3 from '../../product-3.png'
import p1 from '../../product-1.png'; 
import p2 from '../../product-2.png'; 
import p3 from '../../product-3.png'; 
import Carousel from "react-multi-carousel";
import { ShoppingCart } from 'react-feather';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../utils/utils';
import { useNavigate } from 'react-router-dom';





export default  function DisplayCarousel(){

  const navigate = useNavigate();
  const [latestProducts,setLatestProducts] = useState([]);

async function getLatestProducts(){
  try{

    var res = await axios.get(baseURL+"/products/latestProducts");
    if(res.status == 200)
    setLatestProducts(res.data.latestProducts);

  }catch(e){
    
  }
}

useEffect(()=>{
  getLatestProducts();
},[])
//     return ( <Carousel
//      additionalTransfrom={0}
//      arrows
//      autoPlaySpeed={3000}
//      centerMode={false}
//      className=""
//      containerClass="container-with-dots"
//      dotListClass=""
//      draggable
//      focusOnSelect={false}
//      infinite
//      itemClass=""
//      keyBoardControl
//      minimumTouchDrag={80}
//      pauseOnHover
//      renderArrowsWhenDisabled={false}
//      renderButtonGroupOutside={false}
//      renderDotsOutside={false}
//      responsive={{
//        desktop: {
//          breakpoint: {
//            max: 3000,
//            min: 1024
//          },
//          items: 4,
//          partialVisibilityGutter: 40
//        },
//        mobile: {
//          breakpoint: {
//           max: 464,
//          min: 0
//          },
//          items: 2,
//          partialVisibilityGutter: 30
//        },
//        tablet: {
//          breakpoint: {
//            max: 1024,
//            min: 464
//          },
//          items: 2,
//          partialVisibilityGutter: 30
//        }
//      }}
//      rewind={false}
//      rewindWithAnimation={false}
//      rtl={false}
//      shouldResetAutoplay
//      showDots={false}
//      sliderClass=""
//      slidesToSlide={1}
//      swipeable
//    >

return (
      <div className='carousel-cont-main'>  
    
    {latestProducts.map(val=>{
      
      return (<div className="carousel-product">
      
      <img src={val.image} className='rel-product-img'     />
       <p style={{whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",}}><b>{val.title}</b></p>
       <p>Rs : <b> &#x20b9; </b> {val.price} <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;{val.original_price}</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>{(((val.original_price-val.price)/val.original_price)*100).toFixed(2)} % Off</span> </p>
       <button className="add-cart-btn carousel-purchase-btn" onClick={()=>window.location.href = ("/product-view?product_id="+val.detail_id+"&product="+val.title)} >Buy Now <ShoppingCart size={17} /></button>
       {/* <button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}}>Add to Whilist <Heart size={17} /> </button> */}

    </div>)
    })} 
     
     </div>);
{/* </Carousel>); */}

   } 