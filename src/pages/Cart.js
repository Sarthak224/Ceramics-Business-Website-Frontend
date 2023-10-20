import { Row, Col, Card } from 'reactstrap'
import p1 from '../product-images/product-1.png'
import p2 from '../product-images/product-2.png'
import p3 from '../product-images/product-3.png'
import p4 from '../product-images/product-4.png'
import p5 from '../product-images/product-5.png'
import { Plus,Minus,Heart, ShoppingCart,Trash } from 'react-feather';
import { useEffect,useState } from 'react'
import { baseURL } from './utils/utils'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { assignCartQty, assignOverlay } from '../redux/actions/navigation'





export default function Cart(){


  const [cartData,setCartData] = useState([]);
  const [productDataQtyMapping,setProductDataQtyMapping] = useState({});
  const [totalPrice,setTotalPrice] = useState({});
  const [priceMapping,setPriceMapping] = useState({});
  const [apiState,setApiState] = useState(false);

  var dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  var productsOnCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
  
  var [reset,setReset] = useState(false)
  var dispatch = useDispatch();

  async function verifyProductsOnCart(){
     

    var productsOnCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
    try{
      
      dispatch(assignOverlay(true))
      var url = baseURL;
      var res = await axios.post(baseURL+"/api/cart/verifyCart",{product_id_list:productsOnCart});
      if(res.data){
        
        //  res.data = [res.data]
         var newProducts = [];
         var cartChanged = false
         console.log(res.data)
         newProducts = productsOnCart.filter((val)=>{
        //  console.log(res.data,val,res.data[""+val.product_id])
           if(!res.data[""+val.product_id]){
            cartChanged = true;
           }
           else{
            return val;
           }
      })
      if(cartChanged){
        console.log("Carts diff",newProducts,productsOnCart,res.data)
        localStorage.setItem("cart",JSON.stringify(newProducts))
        alert("Some products are out of stock")
        setReset(!reset)
        window.location.reload();
      }

        //  setProductData(res.data[0]);
      }

    }catch(e){

    }
    
      dispatch(assignOverlay(false))

  }

  useEffect(()=>{

   verifyProductsOnCart();


  },[])

  //Function to list all unique id's
  function getUniqueProductIds(){
    var hash={},arr=[];
    productsOnCart.map(val=>{
       if(hash[val.product_id]==undefined){
          hash[val.product_id]=val.qty;
          //arr.push(val.product_id);
       }else{
        hash[val.product_id] = hash[val.product_id] +  val.qty;

       }
    })
    return hash;
  }

  
  //Func to call cart data api
  async function getProducts(product_id_list){
   var url = baseURL+"/products/getCartProducts";
   dispatch(assignOverlay(true));
   var res = await axios.post(url,{product_id_list},{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log(res);
  if(res.data && res.status==200){


    setCartData([...res.data])
     setTimeout(()=>{
      dispatch(assignOverlay(false));

     },900)

  
  
  } 

  }
  console.log("productsOnCart",productsOnCart)

console.log("ProductDataQtyMapping",productDataQtyMapping)
//UseEffect for loading/reloading cart data
  useEffect(()=>{
     var prod_id_hash = getUniqueProductIds();
     var product_id_list = Object.keys(prod_id_hash);

      

     var tempObj = {...productDataQtyMapping};
     productsOnCart.map(val=>{
      //alert(tempObj[val.product_id]+','+val.product_id+','+val.qty)
      // if(tempObj[val.product_id]){
      //   if(tempObj[val.product_id] + val.qty >3)
      //   tempObj[val.product_id] = 3;
      //   else
      //   tempObj[val.product_id] = tempObj[val.product_id] + val.qty
      // }
      // else
      tempObj[val.product_id] = val.qty

     })

     
     console.log(tempObj)
     setProductDataQtyMapping({...tempObj})
     getProducts(product_id_list);



  },[apiState])


  //Calculate total price useEffect
  useEffect(()=>{
    var productAdded={};
    var tempObj = {...productDataQtyMapping};
    var newProductCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
    productsOnCart.map(val=>{
    //  if(tempObj[val.product_id]){
    //    if(tempObj[val.product_id] + val.qty >3)
    //    tempObj[val.product_id] = 3;
    //    else
    //    tempObj[val.product_id] = tempObj[val.product_id] + val.qty
    //  }
    //  else
     tempObj[val.product_id] = val.qty

    })
    console.log(tempObj)

    var priceObj={price:0,discount:0,total:0};
     cartData.map(val=>{

       if(productAdded[val._id] == undefined){
       priceObj.price  = priceObj.price + (val.price*tempObj[val._id]);
       priceObj.total  = priceObj.total + (val.original_price*tempObj[val._id]);
       productAdded[val._id] = true;
     }
     });
     priceObj.discount = priceObj.total - priceObj.price 
     priceObj.price = priceObj.price.toFixed(2)
     priceObj.total = priceObj.total.toFixed(2)
     priceObj.discount = priceObj.discount.toFixed(2)

     setTotalPrice({...priceObj})
  },[cartData])


  function CartProduct(props){

    let val = props.val;
   // console.log(val)
   function removeProductFromCart(){
    var data = JSON.parse(localStorage.getItem("cart"));
    var indexToRemove=-1;
    for(var i=0;i<data.length;++i){
       var values = data[i]; 
       if(values.product_id==props.val._id){
         // alert(""+updatedCounter+','+values.product_id+','+val._id)
         indexToRemove = i;         // alert(data[i].qty)

        }
    }
    data.splice(indexToRemove,1);
      //})
      localStorage.setItem("cart",JSON.stringify(data));
      dispatch(assignCartQty(data.length));
      setApiState(!apiState)

      navigate("/cart")
   }
    function updateQty(updatedCounter){
      var data = JSON.parse(localStorage.getItem("cart"));
for(var i=0;i<data.length;++i){
       var values = data[i]; 
       if(values.product_id==props.val._id){
         // alert(""+updatedCounter+','+values.product_id+','+val._id)
          values.qty=updatedCounter;
         // alert(data[i].qty)

        }
}
//alert(data[0].qty)

      //})
      localStorage.setItem("cart",JSON.stringify(data));
      //alert("Navigating to another page "+updatedCounter)
      dispatch(assignCartQty(data.length));

      navigate("/cart")
    }
   // val.image = val.image.map(val=>val.replace("localhost","192.168.29.69"))
    const [counter,setCounter] = useState(productDataQtyMapping[val._id]);

       return(
          <div className='cart-prod-row' style={{display:"flex",justifyContent:"space-between",margin:"20px",alignItems:"center",borderBottom:"1px solid #c5c5c5"}}>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <img src={val.image[0]} width={100} height={100} />
            <div className='cart-detail-col' style={{textAlign:"left",margin:"15px"}}>
            {/* <h3 className="category-text"><span className="category-label" style={{color:"#0d4471d1"}}>Category</span> - {val.category}</h3> */}
           <h3 className="product-title replace-with-wrap "><b>{val.title}</b></h3>
            <span style={{padding:"1px"}}><span><b>Price</b></span>: <b>&#x20b9; {(val.price).toFixed(2)}</b></span><span style={{fontWeight:"normal",textDecoration:"line-through"}}> &#x20b9; {(val.original_price).toFixed(2)} </span><br/>
            <br/>
            <span style={{background:"rgba(51, 240, 120, 0.14)",padding:"7px",borderRadius:"5px",color:"#06f05c",fontSize:"14px",marginTop:"10px",fontWeight:"bold"}}>You Save &#x20b9; {(val.original_price-val.price).toFixed(2)}</span>
            </div>
          </div>
          
          <div style={{border:"1px solid #c5c5c5",width:"70px",height:"35px",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px",fontSize:"13px"}}>
             <Plus size={15}  onClick={()=>{  if(counter<3){updateQty(counter+1);setCounter(counter+1);setApiState(!apiState)}}}  />
             <span>{counter}</span>
             <Minus size={15} onClick={()=>{ if(counter>0){updateQty(counter-1);setCounter(counter-1);setApiState(!apiState)}}} />
            </div>
            
            <span className='cart-price-col' style={{fontWeight:"normal",textDecoration:"",textAlign:"right",display:"flex",alignItems:"center"}}> &#x20b9; {val.price} <Trash onClick={()=>removeProductFromCart()} size={25} style={{padding:"0px 6px"}}/></span>

         </div>
        )
    

    
  }







    return(
      <div className='cart-mobile-main' style={{margin:"110px 0%",}}>
          <div className='order-steps-header' style={{width:"100%",padding:"30px",margin:"0px auto",marginBottom:"50px",backgroundColor:"#f6f6f6c4"}} >
             
             <div style={{textAlign:"center"}}><div className='circle-1 active-circle'>1</div><span><b>Your Cart</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1 '>2</div><span><b>Checkout Details</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1'>3</div><span><b>Payment</b></span></div>
 
             
           </div>
       {cartData.length>0?<div className='cart-body-mobile-main' style={{margin:"20px 19px",}}>
           
           <h1 className='ftr' style={{margin:"60px 0px",marginTop:"40px",textAlign:"left",fontWeight:"500",fontSize:"33px",borderBottom:"1px solid rgba(223, 223, 223, 0.48) ",paddingBottom:"30px"}}>My Cart<br/><span style={{fontSize:"19px",color:"#777"}}>Added items</span></h1>
          
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",/*backgroundColor: "#f5fbff36",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px"*/}}>
           <div className='cart-col1-mobile' style={{display:"flex",flexDirection:"column",/*border:"1px solid #e0e0e0",*/width:"60%",minWidth:"470px"}}>
           {/* Rows */}
           {/* <div className='cart-prod-row' style={{display:"flex",justifyContent:"space-between",margin:"20px",alignItems:"center",borderBottom:"1px solid #c5c5c5"}}>
          <span><b>Product</b></span>
          <span><b>Qty</b></span>
          <span><b>Price</b></span>
</div> */}
{  cartData.map(value=>{
    return <CartProduct val={value} />

})
}
           
         
           </div>

           <div className='col2 cart-col2-mobile' style={{width:"35%",minWidth:"270px",border:"none",margin:"10px"}}>
           {/* <div className='order-steps-header' style={{width:"90%",padding:"10px"}} >
             
             <div style={{textAlign:"center"}}><div className='circle-1 active-circle'>1</div><span><b>Your Cart</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1'>2</div><span><b>Order Review</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1'>3</div><span><b>Payment</b></span></div>
 
             
           </div> */}
           <div className='frs' style={{/*border:"1px solid #e3e3e3",*/borderRadius:"10px",padding:"10px 20px",marginTop:"10px",color:"rgba(0,0,0,.65)",backgroundColor:"#f7f7f7"}}>
            <h5 style={{color:"black",textAlign:"left",margin:"10px"}}>Payment Details</h5>
            <Card style={{backgroundColor:"transparent",margin:"15px",padding:"10px",border:"none"}}>
            {/* <Row style={{justifyContent:"space-between",borderBottom:"1px solid #c5c5c5",padding:"15px"}}> */}
              <div style={{borderBottom:"1px solid #dfdfdf",padding:"20px 15px"}}>
              <Row md="6">Total Amount</Row>
              <Row md="6" style={{color:"#001e2b"}}><b style={{    width: "100%",
    textAlign: "left",
    margin: "20px -8px"}}> &#x20b9; {totalPrice.total} </b></Row>
              </div>
              <div style={{borderBottom:"1px solid #dfdfdf",padding:"20px 15px"}}>
              <Row md="6">Discount</Row>
              <Row md="6" style={{color:"#10d974"}}><b style={{    width: "100%",
    textAlign: "left",
    margin: "20px -8px"}}> - &#x20b9;{totalPrice.discount} </b></Row>
              </div>
              <div style={{borderBottom:"1px solid #dfdfdf",padding:"20px 15px"}}>
              <Row md="6">Shipping</Row>
              <Row md="6" style={{color:"#10d974"}}><b style={{    width: "100%",
    textAlign: "left",
    margin: "20px -8px"}}>+ &#x20b9; 30.00</b></Row>
              </div>
              <div style={{padding:"20px 15px"}}>
              <Row md="6"><h3 style={{margin:"40px 0px",width:"100%",textAlign:"left"}}>Total</h3></Row>
              <Row md="6" style={{color:"black"}}><b style={{    width: "100%",
    textAlign: "left",
    margin: "20px -8px"}}> &#x20b9; {totalPrice.price}</b></Row>
              </div>
            {/* </Row> */}
            {/* <Row style={{justifyContent:"space-between",borderBottom:"1px solid #c5c5c5",padding:"15px"}}>
              <Col md="6"><b>Discount</b></Col>
              <Col md="6" style={{color:"#10d974"}}><b> - &#x20b9;699.00 </b></Col>
            </Row>  
            <Row style={{justifyContent:"space-between",borderBottom:"1px solid #c5c5c5",padding:"15px"}}>
              <Col md="6"><b>Shipping</b></Col>
              <Col md="6" style={{color:"#10d974"}}>+<b> &#x20b9; 0.00</b></Col>
            </Row>
               <Row style={{justifyContent:"space-between",borderBottom:"1px solid #c5c5c5",padding:"15px"}}>
              <Col md="6"><b>Total</b></Col>
              <Col md="6" style={{color:"black"}}><b> &#x20b9; 899.00</b></Col>
            </Row> */}
           <Link to="/checkout?cart=1"> <button class="button-1" role="button" style={{borderRadius:"25px"}}>Proceed to Checkout</button></Link>
            </Card>
           </div>
            
           </div>



       </div>
           
           
        </div>:<div style={{height:"80vh"}}>
        <div className="checkout-message"><i class="fas fa-cart-arrow-down" style={{color:"white",margin:"0px 10px",fontSize:"21px"}}></i>Your cart is empty</div>

          </div>}
        </div>
    )
}