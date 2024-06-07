import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import tablewareImg from '../../home-img-5.jpeg'
import dinnerSetsImg from '../../home-main3.jpeg'
import uniquesImg from '../../home-img-11.jpeg'
import { ChevronLeft, ChevronRight } from 'react-feather';

// import allImg from '../../home-top-sect-new1.jpg'
import notFoundImage from '../utils/Icons/not-load-img.png'

function FeaturedCollectionsTop(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    var items = [
        {
          src: tablewareImg,//'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
          altText: 'Tableware',
          key:1,
        //   caption: 'Slide 1'
        },
        {
          src: dinnerSetsImg,//'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
          altText: 'Dinner Sets',
          key:2
         
        },
        {
          src: uniquesImg,//'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
          altText: 'Uniques',
          key:3
          
        }
      ];
    // if(Array.isArray(productData.image)){
    //   items = productData.image.map(img=>({
    //     src:img
    //   }))
    // }


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
        style={{position:"relative"}}
      >
        <div style={{backgroundColor:"#2b282869",width:"100%",height:"100%",position:"absolute",top:0,left:0}}></div>
        <img onError={({ currentTarget }) => {
           currentTarget.onerror = null; // prevents looping
           currentTarget.src=""+notFoundImage;
           currentTarget.setAttribute("class",'error-img');
}}  className='featured-collection-product-img-top'   src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={<button  style={{ marginTop: "5px", marginBottom: "10px",zIndex:21,/*backgroundColor:"#b37536",*/minWidth:"275px" }} className="add-cart-btn learn-more-btn finria-sans category-shop-btn" ><span  style={{ color: "white", textDecoration: "none", }} >Shop Now <i class="fas fa-arrow-circle-right" style={{ color: "#f5f5f5" }}></i></span></button>            }
          captionHeader={<div className='carousel-capt-cont'><h3>{item.altText}</h3>
          <p className='sub-detail' style={{fontSize:"1.0rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
          </div>}
        />
      </CarouselItem>
     
    );
  });

  return (
    <div className='featured-collections-main' style={{minHeight:"70vh",marginTop:0}}>
    <Carousel className='category-carousel'
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
      interval={null}
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

</div>
  )    


//   return (
//     <div className='featured-collections-main'>
//         <h1 className='finria-sans' style={{marginBottom:"32px"}}>Featured Collections</h1>

//         <div className='featured-list'>
//             <div className='featured-sect tableware'>
//                 <img src={tablewareImg} />
//                 <div className='category-text'>
//                     <h3 className='fminerva'>Tableware</h3>
//                 </div>
//             </div>
//             <div className='featured-sect dinner-sets'>
//             <img src={dinnerSetsImg} />
//             <div className='category-text'>
//                     <h3 className='fminerva'>Dinner Sets</h3>
//                 </div>

//             </div>
//         </div>

//         <div className='featured-list'>
//             <div className='featured-sect unique'>

//             <img src={uniquesImg} />
//             <div className='category-text'>
//                     <h3 className='fminerva'>Uniques</h3>
//                 </div>

//             </div>
//             <div className='featured-sect all'>
//             <div className='category-text'>
//                     <h3 className='fminerva'>All</h3>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
}

export default FeaturedCollectionsTop;