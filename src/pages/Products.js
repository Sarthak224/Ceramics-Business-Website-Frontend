import { ChevronDown, Menu, Minus, Plus, RefreshCw, ShoppingBag } from "react-feather"
import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu,DropdownToggle,DropdownItem,UncontrolledDropdown, ModalHeader, ModalBody, Modal, ModalFooter, Button } from "reactstrap"
import p1 from '../product-images/product-1.png'
import p2 from '../product-images/product-2.png'
import p3 from '../product-images/product-3.png'
import p4 from '../product-images/product-4.png'
import p5 from '../product-images/product-5.png'
import p6 from '../product-images/product-6.png'
import p7 from '../product-images/product-7.png'
import p8 from '../product-images/product-8.png'
import p9 from '../product-images/product-9.png'
import p10 from '../product-images/product-10.png'
import p12 from '../product-images/product-12.png'
import p13 from '../product-images/product-13.png'
import p14 from '../product-images/product-14.png'
import p15 from '../product-images/product-15.png'
import p16 from '../product-images/product-16.png'
import p17 from '../product-images/product-17.png'
import p18 from '../product-images/product-18.png'
import p19 from '../product-images/product-19.png'
import p20 from '../product-images/product-20.png'
import p21 from '../product-images/product-21.png'
import BeatLoader from 'react-spinners/BeatLoader'
import p22 from '../product-images/product-22.png'
import notFoundImage from './utils/Icons/not-load-img.png';
import { useEffect, useState } from "react"
import { baseURL } from "./utils/utils"
import axios from "axios"
import Pagination from "./components/Pagination"
import ProductSidebar from "./components/ProductSidebar"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import { assignFilters } from "../redux/actions/productFilters"
import { assignCartQty } from "../redux/actions/navigation"

export default function Products(){


    var dispatch = useDispatch();
    
    var navigator = useNavigate();
    const [products,setProducts] = useState([]);
    const [retryApi,setRetry] = useState(true);
    const [page,setPage] = useState(1);
    const [errorComponent,setErrorComponent] = useState(false);
    const [loader,setLoader] = useState(false);

    const [productData,setProductData] = useState({});
    const [qty,setQty] = useState(1);
    const [cartPopup,setCartPopup] = useState(false);
    const [sidebarClass,setSidebarClass] = useState("");

    
    var productFilters = useSelector(state=>state.productFilterReducer);




    async function getProducts(){
      setLoader(true)
 
      try{

        var url = baseURL;
        var res = await axios.post(baseURL+"/products/?page="+page,{filters:productFilters},{ headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }});
      console.log(res.data)

        if(res.data){

            res.data = res.data.map((val)=>{
              
              if(val.image)
            //  val.image = val.image.replace("localhost","192.168.29.69")
              return val;
            })
            console.log(res.data)
           // alert(page)

            setProducts([...res.data]);
        }
      
        setErrorComponent(false);
      }catch(err){
       // alert(err)
        console.log(err)
        setErrorComponent(true);
      }
      setLoader(false)

    }

    useEffect(()=>{
      window.scrollTo({ top: 0, left: 0, });
       getProducts();
    },[page,productFilters]);



    function addProductToCart(product_id){
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
      setCartPopup(false);
      notifySuccess();
    }
    // var data = [
    //     {
    //         "id": 1,
    //         "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //         "price": 109.95,
    //         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //         "category": "men's clothing",
    //         "image": p1,
    //         "rating": {
    //             "rate": 3.9,
    //             "count": 120
    //         }
    //     },
    //     {
    //         "id": 2,
    //         "title": "Mens Casual Premium Slim Fit T-Shirts ",
    //         "price": 22.3,
    //         "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    //         "category": "men's clothing",
    //         "image": p2,
    //         "rating": {
    //             "rate": 4.1,
    //             "count": 259
    //         }
    //     },
    //     {
    //         "id": 3,
    //         "title": "Mens Cotton Jacket",
    //         "price": 55.99,
    //         "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    //         "category": "men's clothing",
    //         "image": p3,
    //         "rating": {
    //             "rate": 4.7,
    //             "count": 500
    //         }
    //     },
    //     {
    //         "id": 4,
    //         "title": "Mens Casual Slim Fit",
    //         "price": 15.99,
    //         "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    //         "category": "men's clothing",
    //         "image": p4,
    //         "rating": {
    //             "rate": 2.1,
    //             "count": 430
    //         }
    //     },
    //     {
    //         "id": 5,
    //         "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    //         "price": 695,
    //         "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    //         "category": "jewelery",
    //         "image": p5,
    //         "rating": {
    //             "rate": 4.6,
    //             "count": 400
    //         }
    //     },
    //     {
    //         "id": 6,
    //         "title": "Solid Gold Petite Micropave ",
    //         "price": 168,
    //         "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    //         "category": "jewelery",
    //         "image": p6,
    //         "rating": {
    //             "rate": 3.9,
    //             "count": 70
    //         }
    //     },
    //     {
    //         "id": 7,
    //         "title": "White Gold Plated Princess",
    //         "price": 9.99,
    //         "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    //         "category": "jewelery",
    //         "image": p7,
    //         "rating": {
    //             "rate": 3,
    //             "count": 400
    //         }
    //     },
    //     {
    //         "id": 8,
    //         "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    //         "price": 10.99,
    //         "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    //         "category": "jewelery",
    //         "image": p8,
    //         "rating": {
    //             "rate": 1.9,
    //             "count": 100
    //         }
    //     },
    //     {
    //         "id": 9,
    //         "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    //         "price": 64,
    //         "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    //         "category": "electronics",
    //         "image": p9,
    //         "rating": {
    //             "rate": 3.3,
    //             "count": 203
    //         }
    //     },
    //     {
    //         "id": 10,
    //         "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    //         "price": 109,
    //         "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    //         "category": "electronics",
    //         "image": p10,
    //         "rating": {
    //             "rate": 2.9,
    //             "count": 470
    //         }
    //     },
    //     {
    //         "id": 11,
    //         "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    //         "price": 109,
    //         "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    //         "category": "electronics",
    //         "image": p12,
    //         "rating": {
    //             "rate": 4.8,
    //             "count": 319
    //         }
    //     },
    //     {
    //         "id": 12,
    //         "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    //         "price": 114,
    //         "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    //         "category": "electronics",
    //         "image": p13,
    //         "rating": {
    //             "rate": 4.8,
    //             "count": 400
    //         }
    //     },
    //     {
    //         "id": 13,
    //         "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    //         "price": 599,
    //         "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    //         "category": "electronics",
    //         "image": p14,
    //         "rating": {
    //             "rate": 2.9,
    //             "count": 250
    //         }
    //     },
    //     {
    //         "id": 14,
    //         "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    //         "price": 999.99,
    //         "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    //         "category": "electronics",
    //         "image": p15,
    //         "rating": {
    //             "rate": 2.2,
    //             "count": 140
    //         }
    //     },
    //     {
    //         "id": 15,
    //         "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    //         "price": 56.99,
    //         "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    //         "category": "women's clothing",
    //         "image": p16,
    //         "rating": {
    //             "rate": 2.6,
    //             "count": 235
    //         }
    //     },
    //     {
    //         "id": 16,
    //         "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    //         "price": 29.95,
    //         "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    //         "category": "women's clothing",
    //         "image": p17,
    //         "rating": {
    //             "rate": 2.9,
    //             "count": 340
    //         }
    //     },
    //     {
    //         "id": 17,
    //         "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    //         "price": 39.99,
    //         "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    //         "category": "women's clothing",
    //         "image": p18,
    //         "rating": {
    //             "rate": 3.8,
    //             "count": 679
    //         }
    //     },
    //     {
    //         "id": 18,
    //         "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    //         "price": 9.85,
    //         "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    //         "category": "women's clothing",
    //         "image": p19,
    //         "rating": {
    //             "rate": 4.7,
    //             "count": 130
    //         }
    //     },
    //     {
    //         "id": 19,
    //         "title": "Opna Women's Short Sleeve Moisture",
    //         "price": 7.95,
    //         "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    //         "category": "women's clothing",
    //         "image": p20,
    //         "rating": {
    //             "rate": 4.5,
    //             "count": 146
    //         }
    //     },
    //     {
    //         "id": 20,
    //         "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    //         "price": 12.99,
    //         "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    //         "category": "women's clothing",
    //         "image": p21,
    //         "rating": {
    //             "rate": 3.6,
    //             "count": 145
    //         }
    //     }
    // ]

    console.log(products)

    const notifySuccess = () => toast.success("Successfully added on Cart.");

    return(
    <div className="product-sect-main" style={{marginTop:"90px",}}>
    <h3 className="product-title-main frs" style={{marginBottom:"40px",position:"relative",textAlign:"center",marginTop:"40px"}}><span style={{backgroundColor:"#ffffff",padding:"0px 20px",marginBottom:"0px"}}>Our Products</span></h3>
    {/* Filter Sect */}
    {/* <div className='filter-parent-sect' style={{width:"90%",textAlign:"left",display:"flex",marginBottom:"10px",marginTop:"25px"}}>
    <span className="product-title" style={{marginTop:"1px"}}>Filters:</span>

      <UncontrolledDropdown>
        <DropdownToggle tag="span"> <button className="button-17 marg-2" style={{margin:"0px 6px",height:"28px"}}>Price <ChevronDown size={10} /></button></DropdownToggle>
        <DropdownMenu className="filter-menu">
            <div className="filter-opt">&#x20b9;100 - &#x20b9;500</div>
            <div className="filter-opt">Above &#x20b9;500</div>
        </DropdownMenu>
      </UncontrolledDropdown>

      <UncontrolledDropdown>
        <DropdownToggle tag="span"> <button className="button-17 marg-2" style={{margin:"0px 6px",height:"28px"}}>Sort <ChevronDown size={10} /></button></DropdownToggle>
         <DropdownMenu className="filter-menu">
        <div className="filter-opt">Price: High to low</div>
        <div className="filter-opt">Price: Low to high</div>
        </DropdownMenu>
       </UncontrolledDropdown> 
      
      <DropdownToggle tag="span"> <button className="button-17 marg-2" style={{margin:"0px 6px",height:"28px"}}>Category <ChevronDown size={10} /></button></DropdownToggle>
      <DropdownToggle tag="span"> <button className="button-17 marg-2" style={{margin:"0px 6px",height:"28px"}}>Discount <ChevronDown size={10} /></button></DropdownToggle>
      <DropdownToggle tag="span"> <button className="button-17 marg-2" style={{margin:"0px 6px",height:"28px"}}>filter<ChevronDown size={10} /></button></DropdownToggle>


    </div> */}
    {/* <hr className='img-sep'  /> */}
      <div style={{display:"flex",flexDirection:"row",flexWrap:"nowrap"}}>
      {!(errorComponent) && <ProductSidebar  sidebarClass = {sidebarClass}   setSidebarClass={setSidebarClass}/>}
      <div className="product-sect-main" style={{width:"100%",position:"relative"}}>
        <div style={{width:"100%",textAlign:"left",marginLeft:"30px",display:"flex",alignItems:"center"}}>
        <Menu className="prod-sidebar-open-btn" size={20} style={{cursor:"pointer"}} onClick={()=>setSidebarClass("prod-sidebar-active")} /> <span className="frs prod-sidebar-open-text" style={{marginTop:"6px",marginLeft:"20px"}}>Open Filters</span>
        </div>
        {/* onClick={()=>navigator("/product-view?product_id="+val.detail_id+"&product="+val.title)} */}
      {(products.length>0 && !errorComponent)?products.map((val,i)=>{
        return(
            <div className="product-item frs"  >
                <img className="prod-col1 prod-img" src={val.image} onError={({ currentTarget }) => {
               currentTarget.onerror = null; // prevents looping
               currentTarget.src=""+notFoundImage;
               currentTarget.setAttribute("class",'error-img');
  }} />
                <hr className='img-sep prod-sep-line' />
                <div  className="prod-col2">
                {/* <h3 className="category-text"><span className="category-label" style={{color:"#0d4471d1"}}>Category</span> - {val.category}</h3> */}

                <h3 className="product-title frs">{val.title}</h3>
                <span style={{padding:"1px"}}><span><b>Price</b></span>: &#x20b9; {val.price}</span><span style={{fontWeight:"bold",color:"rgb(29, 217, 23)"}}> {(((val.original_price-val.price)/val.original_price)*100).toFixed(2)} % Off </span><br/>
                <p style={{padding:"1px",color:"rgb(109 91 91)",marginTop:"5px", marginBottom:"0px"}} className="f1" >Qty: <b style={{fontSize:"12px",color:"black"}}>{val.qty>10?"in Stock":val.qty==0?<span style={{color:"red",fontWeight:"bold"}}>Out of Stock</span>:<span style={{color:"red",fontWeight:"bold"}}>only {val.qty} left</span>}</b></p>

                <Link style={{color:"white",textDecoration:"none"}} to={"/product-view?product_id="+val.detail_id+"&product="+val.title}><button disabled={val.qty==0?true:false} className="add-cart-btn vertical-btn-marg" >View <i class="fas fa-shopping-cart" style={{color: "#f5f5f5"}}></i></button></Link>
                <button onClick={()=>{setProductData(val);setCartPopup(true)}} style={{marginTop:"5px",marginBottom:"10px"}} disabled={val.qty==0?true:false} className="add-cart-btn vertical-btn-marg" ><span onClick={(e)=>e.preventDefault()} style={{color:"white",textDecoration:"none",}} >Add Cart <i class="fas fa-shopping-cart" style={{color: "#f5f5f5"}}></i></span></button>

                </div>
            </div>
        )
      }):(errorComponent)?
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:"column"}}>
     <i class="fas fa-exclamation-triangle" style={{color:"#afb7c5",fontSize:"155px"}}></i>
     <p style={{color: "#333",fontWeight:"bold",fontSize:"21px",marginTop:"40px"}}>Unable to Load Products...</p><p className="refresh-text" onClick={()=>{setPage(new Number(page));setErrorComponent(false)}}>Retry <RefreshCw size={10} /> </p>
      </div>:(products.length==0 && !loader)?<div className="product-not-found-sect" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:"column"}}>
      <i class="fas fa-search-minus" style={{"color": "#c9c9d6",marginBottom:"20px",fontSize:"37px"}}></i> 
             <p style={{color:"#afb7c5",marginTop:"15px"}}>No products Found</p>
        </div>:<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:"column"}}>
        <BeatLoader size={25} loading={true} color="#965c22" />
        <p style={{color:"#afb7c5",marginTop:"15px"}}>Loading Products...</p>
        </div>
      }
      </div>
      </div>
      <Pagination setPage={setPage} />


      <Modal isOpen={cartPopup}>
      <ModalHeader>Select Quantity:</ModalHeader>
      <ModalBody>
      <div style={{border:"1px solid #c5c5c5",width:"120px",height:"35px",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0px"}}>
               <Plus className='button-7 add-del-btn' onClick={()=>{if(qty<3 && qty<productData.qty)setQty(qty+1)}} size={35}  />
               <span style={{padding:"19px"}}>{qty}</span>
               <Minus className='button-7 add-del-btn' onClick={()=>{if(qty>0)setQty(qty-1)}} size={35} />
      </div>
       
      </ModalBody>
      <ModalFooter>
        <Button  className="button-7" color="" style={{marginLeft:"20px",backgroundColor:"#D5A372",color:"#fff"}} onClick={()=>addProductToCart(productData.detail_id)}>Add to Cart</Button>
        <Button  className="button-7" color="" style={{marginLeft:"20px",backgroundColor:"#D5A372",color:"#fff"}} onClick={()=>{setCartPopup(false);setQty(1);}}>Cancel</Button>

      </ModalFooter>
      </Modal>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
    )
}