import {Row,Col, UncontrolledCollapse, } from 'reactstrap';
import { useState,useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {Collapse} from 'react-collapse';
import { Plus,Minus,Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'react-feather';
import { baseURL } from '../utils/utils';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader'
import { useNavigate } from 'react-router-dom';
import NotificationPopup from './NotificationPopup';
import { useDispatch } from 'react-redux';
import { assignCartQty } from '../../redux/actions/navigation';
import DisplayCarousel from './DisplayCarousel';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as $ from 'jquery'


export default function ProductView(){
  
  const navigator = useNavigate();
  const [displayDetail1,setDetail1] = useState(false);
  const [displayDetail2,setDetail2] = useState(false);
  const [displayDetail3,setDetail3] = useState(false);
  const [productData,setProductData] = useState(null);
  const [errorComponent,setErrorComponent] = useState(false);
  const [addedCartPopup,setCartPopup] = useState(false);
  const [qty,setQty] = useState(1);
  var dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  var product_id = searchParams.get("product_id");

  async function getProducts(){
    try{
    var url = baseURL;
    var res = await axios.get(baseURL+"/products/productDetails?product_id="+product_id,{});
    if(res.data){
      res.data = [res.data]
        res.data = res.data.map((val)=>{
          
       //   val.image = val.image.map(val2=>val2.replace("localhost","192.168.29.69"))
          return val;
        })
        setProductData(res.data[0]);
    }
  
    setErrorComponent(false);
  }catch(err){
  
    setErrorComponent(true);
  }
}

function addProductToCart(){
  var data = localStorage.getItem("cart");
  if(data){
    
    data = JSON.parse(data);
    var isIdPresent = false
    data.map(val=>{
       if(val.product_id==product_id){
        isIdPresent = true;
       }
    })
    if(isIdPresent){
     var tempData = data;
     for(var i=0;i<tempData.length;++i){
      if(tempData[i].product_id==product_id)
        tempData[i].qty = qty;
     }
     data = tempData;
    }else
    data.push({
      product_id,
      qty,
    })
  }
  else{
    data = [{
      product_id,
      qty,
    }]

  }
  dispatch(assignCartQty(data.length));
  localStorage.setItem("cart",JSON.stringify(data));
  setCartPopup(true);
}

  useEffect(()=>{
    getProducts();
    
  },[])

  useEffect(()=>{
    // setProducts()
  },[productData])


   
       function getRating(rating){
        
        var ratingArray=[null,null,null,null,null];
        for(var i=0;i<rating;++i){
          ratingArray[i]=1;
        }
        
        return(
          <span >
            
          {ratingArray.map((rating)=>{

            return <span class={rating?"fa fa-star checked":"fa fa-star"}></span>
          })
        }
          </span>
        )

       
       }




   


       function ProductViewCarousel(args){

        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);
        var items = [
          {
            // src: 'https://picsum.photos/id/123/1200/400',
            src:productData.image,
            key:0
          },
     
          // {
          //   src: 'https://picsum.photos/id/678/1200/400',
          //   altText: 'Slide 3',
          //   caption: 'Slide 3',
          //   key: 3,
          // },
        ];
        if(Array.isArray(productData.image)){
          items = productData.image.map(img=>({
            src:img
          }))
        }


       const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
      };
    
      const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
      };
    
      const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
      };
    
      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img   className='p-view-image product-photo' style={{width:"57vw",height:"57vw",maxWidth:"469px",maxHeight:"446px"}}  src={item.src} alt={item.altText} />
            {/* <CarouselCaption
              captionText={item.caption}
              captionHeader={item.caption}
            /> */}
          </CarouselItem>
         
        );
      });
    
      return (
        <div>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          {...args}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
            
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>

<div className='carousel-cont-main1 ' style={{/*backgroundColor:"#f6f6f6",*/padding:"10px 10px",alignItems:"center",position:"relative"}}>
<div style={{position:"absolute",width:"100%",height:"100%",display:"flex",justifyContent:"space-between"}}>      
      <div  style={{position:"",left:"5px",top:"-30px",height:"100%",width:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}><b> <ChevronLeft size={30} /> </b></div>
      <div  style={{marginLeft:"auto",position:"",left:"90%",top:"-30px",height:"100%",width:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}><b> <ChevronRight size={30} /> </b></div>
      </div>
        <div className='carousel-cont-main ' style={{/*backgroundColor:"#f6f6f6",*/padding:"10px 10px",alignItems:"center",position:"relative"}}>
     
    {productData.image.map((val,i)=>{
      
      return (<div onClick={()=>goToIndex(i)} className="carousel-product-navigate" style={{padding:"13px",margin:"15px",  /*boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"*/}} >
      
      <img src={val} className='rel-product-img-navigate'     />
       
    </div>)
    })}
          </div>
</div>
        </div>
      )    

      }


      function DisplayCarouselProductView({prod_images}){







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
  <></>
  );
{/* </Carousel>); */}

    
      }





      useEffect(()=>{
        $('.p-view-image2')
        // tile mouse actions
        .on('mouseover', function(){
          console.log($(this).children('.carousel-inner').children('.carousel-item').children('img'))
          $(this).children('.carousel-inner').children('.carousel-item').children('img').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
        })
        .on('mouseout', function(){
          $(this).children('.carousel-inner').children('.carousel-item').children('img').css({'transform': 'scale(1)'});
        })
        .on('mousemove', function(e){
          $(this).children('.carousel-inner').children('.carousel-item').children('img').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
        })
      })
      





       console.log(productData)
    return(
      <>
        {productData!=null && !errorComponent? <div style={{overflowX:"hidden"}}><Row style={{marginTop:"80px",
         }}>
            <Col className="pview-col1" md="5" style={{textAlign:"left",margin:"70px 37px",minWidth:"43%"}}>
             {/* <img src={productData.image[0]} className='p-view-image' style={{width:"57vw",height:"57vw",maxWidth:"449px",maxHeight:"446px"}} /> */}
             <ProductViewCarousel data-scale="1.6" className='p-view-image p-view-image2' style={{width:"57vw",height:"57vw",maxWidth:"469px",maxHeight:"446px"}} />
             <DisplayCarouselProductView className='p-view-image p-view-image2' style={{width:"57vw",height:"57vw",maxWidth:"469px",maxHeight:"446px"}}/>
            </Col>
            <Col className="pview-col2" md="6" >
              <div style={{display:"flex",justifyContent:"start",alignItems:"start",minHeight:"65%",margin:"40px",flexDirection:"column"}}>
              <h1 style={{padding:"28px 2px",marginBottom:"28px",borderBottom:"1px solid rgb(197 197 197 / 66%)",width:"97%",textAlign:"left",fontWeight:"bolder"}}>{productData.title}</h1>
              <p style={{fontSize:"18px"}}><span style={{color:"#174ea6",fontWeight:"bold"}}>Price:</span><b> &#x20b9; </b> {productData.price} <span style={{textDecoration:"line-through",fontSize:"14px",margin:"0px 5px"}}> &#x20b9;{productData.original_price}</span> <span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}>{(((productData.original_price-productData.price)/productData.original_price)*100).toFixed(2)} % Off</span> </p>
              <span style={{background:"rgba(51, 240, 120, 0.14)",padding:"7px",borderRadius:"5px",color:"#06f05c",fontSize:"15px",marginTop:"10px",fontWeight:"bold"}}>You Save &#x20b9; {((productData.original_price-productData.price).toFixed(2))}</span>
              <div style={{margin:"14px 2px"}}>
               {getRating(productData.rating.rate)}<span style={{color:"#333",marginLeft:"10px"}}>From {productData.rating.count }  reviews</span>
              </div>
              <div style={{margin:"11px 0px"}}>
                <b>Quantity:</b> <span style={productData.qty<10?{color:"red"}:{}}> <b>{productData.qty<=0?"Out of Stock":productData.qty<10?"Only "+productData.qty+" left":"in Stock"}</b></span>
              </div>
              <div style={{margin:"21px 0px"}}>
                <b>Category:</b> <span className='category-label2'>{productData.category}</span>
              </div>
              <h4 style={{fontWeight:650,color:"#110",marginBottom:"54px"}}>Description:</h4>
              <p className='prod-desc frs' style={{lineHeight:"1.5rem"}}>
              {productData.description}

                </p>
              <h4 style={{fontWeight:550,color:"#110",marginBottom:"25px"}}>Select Quantity:</h4>

              <div style={{border:"1px solid #c5c5c5",width:"120px",height:"35px",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0px"}}>
               <Plus className='button-7 add-del-btn' onClick={()=>{if(qty<3 && qty<productData.qty)setQty(qty+1)}} size={35}  />
               <span style={{padding:"19px"}}>{qty}</span>
               <Minus className='button-7 add-del-btn' onClick={()=>{if(qty>0)setQty(qty-1)}} size={35} />
              </div>

              {/*productData.qty>0?<button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}} onClick={()=>navigator("/checkout?product_id="+productData._id)}>Buy Now <i class="fas fa-shopping-basket" style={{color: "#ffffff",margin:"0px 10px"}}></i></button>:null*/}
              {productData.qty>0?<button className="add-cart-btn" style={{marginTop:"40px",padding:"10px 20px",width:"100%",fontSize:"15px"}} onClick={()=>{addProductToCart();}}>Add to Cart <i class="fas fa-shopping-cart" style={{color: "#f5f5f5",margin:"0px 10px"}}></i> </button>:null}

              <div style={{width:"100%"}}>
              <div color="primary" onClick={()=>{setDetail1(!displayDetail1)}} id="Detailstoggler1" style={{ margin: '1rem 10px',textAlign:"left",fontFamily: "'Open Sans', sans-serif",fontWeight:"bolder",fontSize:"21px",padding:"17px",borderBottom:"1px solid #c5c5c5" }}>Additional Details <span style={{float:"right"}}>{!displayDetail1?"+":"-"}</span><br/>
          
          <div isOpened={displayDetail1} className='collapse-con' style={displayDetail1?{height:"auto",display:"block",transition:"3s ease"}:{height:"0px",display:"none",transition:"3s ease"}}>
             <div className='details-para' style={{fontFamily: "'Open Sans', sans-serif",fontSize:"14px",fontWeight:"normal",margin:"40px",maxWidth:"280px"}}>
 
           {productData.additional_details}
         </div>
       
     </div>
          </div>
         
          
          
          
          
          
          <div color="primary" onClick={()=>{setDetail2(!displayDetail2)}}  id="Detailstoggler2" style={{ margin: '1rem 10px',textAlign:"left",fontFamily: "'Open Sans', sans-serif",fontWeight:"bold",fontSize:"21px",padding:"17px",borderBottom:"1px solid #c5c5c5" }}>Specifications <span style={{float:"right"}}>{!displayDetail2?"+":"-"}</span><br/>
          <Collapse isOpened={displayDetail2} className='collapse-con'>
             <div>
             <div className='details-para' style={{fontFamily: "'Open Sans', sans-serif",fontSize:"14px",fontWeight:"normal",margin:"40px",maxWidth:"280px"}}>
 
             {productData.specifications}

         </div>
       </div>
     </Collapse>
          </div>
          
          
          
          
          
          
          
          <div color="primary" onClick={()=>{setDetail3(!displayDetail3)}} id="Detailstoggler3" style={{ margin: '1rem 10px',marginBottom:"100px",textAlign:"left",fontFamily: "'Open Sans', sans-serif",fontWeight:"bolder",fontSize:"21px",padding:"17px",borderBottom:"1px solid #c5c5c5" }}>Other Details <span style={{float:"right"}}>{!displayDetail3?"+":"-"}</span><br/>
          <Collapse isOpened={displayDetail3} className='collapse-con'>
             <div>
             <div className='details-para' style={{fontFamily: "'Open Sans', sans-serif",fontSize:"14px",fontWeight:"normal",margin:"40px",maxWidth:"280px"}}>
 
             {productData.other_details}

         </div>
       </div>
     </Collapse>
          </div>
          </div>
              
              </div>
             
              
            </Col>
         </Row>
         
        




        
          
    <h2 style={{textAlign:"left",marginLeft:"40px",fontWeight:"normal",fontFamily:"'Open Sans'"}}>Latest Products</h2>
    <hr className='img-sep' style={{width:"7%",minWidth:"240px",marginLeft:"40px",padding:"1px",border:" 1px solid #D5A372",backgroundColor:"#D5A372"}} />
    {<DisplayCarousel />} 
    </div>:(errorComponent)?
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:"column"}}>
     <i class="fas fa-exclamation-triangle" style={{color:"#afb7c5",fontSize:"155px"}}></i>
     <p style={{color: "#333",fontWeight:"bold",fontSize:"21px",marginTop:"40px"}}>Unable to Load Products...</p>
      </div>:<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:"column"}}>
        <BeatLoader size={25} loading={true} color="#965c22" />
        <p style={{color:"#afb7c5",marginTop:"15px"}}>Loading Products...</p>
        </div>
      }
      <NotificationPopup open={addedCartPopup} setOpen={setCartPopup} message={"Successfully added on cart, Qty:"+qty}/>
         </>
    )

}