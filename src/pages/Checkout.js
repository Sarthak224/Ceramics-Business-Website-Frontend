import { useSearchParams } from "react-router-dom";
import CheckoutForm from "./components/CheckoutForm";
import { baseURL } from "./utils/utils";
import axios from 'axios';
import {useState,useEffect} from 'react';

export default function Checkout(){
    const [searchParams, setSearchParams] = useSearchParams();
    var product_id = searchParams.get("product_id");
    var [reset,setReset] = useState(false)
    async function verifyProductsOnCart(){
     
      var productsOnCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
      try{
        
        var url = baseURL;
        var res = await axios.post(baseURL+"/api/cart/verifyCart",{product_id_list:productsOnCart});
        if(res.data){
          //  res.data = [res.data]
           var newProducts = [];
           var cartChanged = false
           newProducts = productsOnCart.filter((val)=>{
             if(res.data[val.product_id]){
              cartChanged = true
              return val;
             }
        })
        if(cartChanged){

          localStorage.setItem("cart",JSON.stringify(newProducts))
          alert("Some products are out of stock")

          setReset(!reset)
          window.location.reload();

        }
          //  setProductData(res.data[0]);
        }
  
      }catch(e){

      }
      

    }

    useEffect(()=>{

     verifyProductsOnCart();


    },[])
    
    return(
      <div style={{marginTop:"120px"}}>
          <div className='order-steps-header' style={{width:"100%",padding:"30px",margin:"0px auto",marginBottom:"50px",backgroundColor:"#f6f6f6c4"}} >
             
             <div style={{textAlign:"center"}}><div className='circle-1 '>1</div><span><b>Your Cart</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1 active-circle'>2</div><span><b>Checkout Details</b></span></div>
             <div style={{textAlign:"center"}}><div className='circle-1'>3</div><span><b>Payment</b></span></div>
 
             
           </div>
           {/* <h3>Checkout</h3> */}
        <div className="checkout-message"><i class="fas fa-truck" style={{color:"white",margin:"0px 10px",fontSize:"21px"}}></i>Enter correct Billing Details</div>
       <div className="checkout-container-main frs">
       
         <div className="checkout-col1">
          <CheckoutForm />
         </div>
         <div className="checkout-col2">
          <div className="product-checkout-catgories">
          <h1 className="product-category-title">Product Categories</h1>
          <h1 className="product-categories-label"><i style={{margin:"0px 7px"}} class="fas fa-gift"></i>Gift Products</h1>
          <h1 className="product-categories-label">Vases</h1>
          <h1 className="product-categories-label">Creamics</h1>


          </div>
         </div>
    </div>
    </div>
    
    )
}