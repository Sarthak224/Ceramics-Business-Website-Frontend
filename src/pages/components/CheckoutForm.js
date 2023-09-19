import {Row,Col,Input, Button, Modal, ModalBody, ModalFooter, Label} from 'reactstrap'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { baseURL } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { assignOverlay } from '../../redux/actions/navigation';
import { useFormik } from 'formik';
import orderSuccessImg from './categories-images/shopping_illustration.svg'
import rzp from './checkout-form-images/razorpay.svg'
import googlePayImg from './checkout-form-images/google-pay-1.svg';
import ppImg from './checkout-form-images/phonepe-1.svg';
import { X } from 'react-feather';

export default function CheckoutForm(){


	const [searchParams, setSearchParams] = useSearchParams();
	const [productData,setProductData] = useState({});
	const [totalPriceDetails,setTotalPrice] = useState({total:0,price:0,discount:0});
	const [openPaymentAlertModal,setOpenPaymentAlertModal] = useState(false);
	const [paymentAlert,setPaymentAlert] = useState("Payment Failed...");
	const [cartData,setCartData] = useState([]);
	const [orderType,setOrderType] = useState(null);
    

    var navigate = useNavigate();

 const formik = useFormik({
        initialValues: {
        firstname:"",
        lastname: "",
        order_notes: "",
        email:"",
        zipcode:"",
        state:"", 
        address:"",
        city:"",
        phone:""
        },
        validate: (values) => {
          const errors = {};
          if (!values.firstname) {
            errors.firstname = "First name is required";
          }
          if (!values.lastname) {
            errors.lastname = "Lastname is required";
          }
          if (!values.phone) {
            errors.phone = "Phone no is  required";
          }
          if (!values.zipcode) {
            errors.zipcode = "zipcode is required";
          }else  if (values.zipcode.toString().length>6) {
            errors.zipcode = "Invalid Zipcode";
          }
         
          if (!values.email) {
            errors.email = "Email is required"
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "Not a valid email"
          } 
         
          if (!values.state) {
            errors.state = "State is required";
          }
          if (!values.address) {
            errors.address = "Address is required";
          }
          if(!values.city){
            errors.city = "City is Required";
           
          }
        //   if(values.password.length>=8){
        //     var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        //     if(!regularExpression.test(values.password) && values.password.length>=8)
        //    errors.password = "password should contain alphanumeric and special characters";

        //   }
         if((values.phone.toString().length!=10)){
			errors.phone ='Phone Number is Invalid'
		 }
          return errors;
        },

        onSubmit: function (values) {
          console.log("values");
          //setOpenPopup(true)
        }
    
        
      });






    var dispatch = useDispatch();
	var productsOnCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
	
	var product_id = searchParams.get("product_id");
	var isCart = searchParams.get("cart")

	async function getSingleProducts(){
		try{
		var url = baseURL;
		var res = await axios.get(baseURL+"/products/productDetails?product_id="+product_id,{});
		if(res.data){

		  res.data = [res.data]
			res.data = res.data.map((val)=>{
			  
			  val.image = val.image.replace("localhost","192.168.29.141")
			  return val;
			})
			setProductData(res.data[0]);

		}
	  
		//setErrorComponent(false);
	  }catch(err){
	  
		//setErrorComponent(true);
	  }
	}
	
	  useEffect(()=>{
		if(product_id)
		getSingleProducts();
	else if(isCart){
		var prod_id_hash = getUniqueProductIds();
		var product_id_list = Object.keys(prod_id_hash)
		getProducts(product_id_list);
	  }
	  },[])
	
	  async function getProducts(product_id_list){
	//	alert("before")
		dispatch(assignOverlay(true))

		var url = baseURL+"/products/getCartProducts";
		
		var res = await axios.post(url,{product_id_list},{
		 headers: {
		   Accept: "application/json",
		   "Content-Type": "application/json",
		   "Access-Control-Allow-Origin": "*",
		 },
	   });
	  // alert("after")

	   console.log(res);
	   if(res.data && res.status==200){

         var obj={total:0.00,price:0.00,discount:0.00}	 
		 setCartData(res.data)
		res.data = res.data.map(val=>{
			productsOnCart.map(val2=>{
			  
			  if(val._id == val2.product_id){
              obj.total = obj.total+(val.original_price*val2.qty)
			  obj.price = obj.price+(val.price*val2.qty)
			  val.qtyAdded=val2.qty;
             // obj.discount = obj.discount+(val.original_price*val2.qty)
			  }
			})
			return val;
		 })
		 obj.discount = obj.total - obj.price;

	   } 
	   dispatch(assignOverlay(false))

          setTotalPrice({...obj})	 
	   }
	 
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
	 
	   useEffect(()=>{
		
	 
	 
	   },[isCart])


    const initPayment = (data) => {
		console.log(data)
		//alert(product_id)
		var productsDataForApi = [...cartData]
		productsDataForApi = productsDataForApi.map(val=>{
			productsOnCart.map(val2=>{
                 if(val._id==val2.product_id)
			     val.qty=val2.qty
				})
				return val;
		})
		const options = {
			key: "rzp_test_WlEZkSdFhgSkIl",
			amount: data.amount,
			currency: data.currency,
			name: productData?productData.title:cartData.map(val=>val.title).join(','),
			description: "Test Transaction",
			// image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					console.log(response)
					var paymentDetails = response;
					const verifyUrl = /*"http://localhost:3011"*/"http://192.168.29.141:3011/api/payment/verify";
					const  paymentRes  = await axios.post(verifyUrl, {...response,prod_arr:productsOnCart});
					console.log(paymentRes.data);
					console.log(paymentDetails)
					var dataObject = {
						firstname:formik.values.firstname,
						lastname:formik.values.lastname,
						address:formik.values.address,
						city:formik.values.city,
						state:formik.values.state,
						zipcode:formik.values.zipcode,
						phone:formik.values.phone,
						email:formik.values.email,
						order_notes:formik.values.order_notes,
						subtotal:data.amount,
						products:productsDataForApi,
						payment_details:paymentDetails

					}
					dispatch(assignOverlay(true))

					const orderResp = await axios.post(baseURL+'/api/orders/placeOrder',dataObject);
					if(orderResp.status==200){
						dispatch(assignOverlay(false))

						localStorage.setItem("billing_details",formik.values)
						navigate("/checkout/success",{checkoutSuccess:true})

					// setOpenPaymentAlertModal(true);
					// setPaymentAlert("Order Placed Successfully");
					}
					dispatch(assignOverlay(false))

				} catch (error) {
					console.log(error);
					 setOpenPaymentAlertModal(true);
					 setPaymentAlert("Payment Failed");
				}
			},
			theme: {
				color: "#ce7e2ed4",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			var body; 
		    if(product_id)
			body = { product_id };
			else
			body = {product_id_list:productsOnCart.map(val=>val)}
			const orderUrl = /*"http://localhost:3011"*/ "http://192.168.29.141:3011/api/payment/orders";
			const { data } = await axios.post(orderUrl, body);
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	async function placeCodOrder(){

		dispatch(assignOverlay(true))

		try {
			var productsDataForApi = [...cartData]
		productsDataForApi = productsDataForApi.map(val=>{
			productsOnCart.map(val2=>{
                 if(val._id==val2.product_id)
			     val.qty=val2.qty
				})
				return val;
		})
			var dataObject = {
				firstname:formik.values.firstname,
				lastname:formik.values.lastname,
				address:formik.values.address,
				city:formik.values.city,
				state:formik.values.state,
				zipcode:formik.values.zipcode,
				phone:formik.values.phone,
				email:formik.values.email,
				order_notes:formik.values.order_notes,
				// subtotal:data.amount,
				products:productsDataForApi,

			}
			const orderUrl = /*"http://localhost:3011"*/ baseURL+"/api/orders/placeCodOrder";
			const resp = await axios.post(orderUrl, dataObject);
			if(resp.status==200){
				dispatch(assignOverlay(false))

				navigate("/checkout/success",{checkoutSuccess:true})

			// setOpenPaymentAlertModal(true);
			// setPaymentAlert("Order Placed Successfully");
			}
			
		} catch (error) {
			console.log(error);
		}
		dispatch(assignOverlay(false))

	}

	useEffect(()=>{
		formik.validateForm();
	},[])
    return(
        <div className='frs'>
			{productsOnCart && productsOnCart.length>0?<div>
            <Row>
                <Col className='form-col1' md="7">
                   <h3 style={{fontSize:"27px",fontWeight:"bold"}}>Billing Details</h3>
				   <Row>
					<Col md="6">
                   <h3>Firstname <span style={{color:"red"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''} type="text" placeholder='Enter Firstname' name="firstname" onChange={formik.handleChange}/>{" "}
                  {formik.errors.firstname && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.firstname}</p>}
                    </Col>
					<Col md="6">
					<h3>Lastname <span style={{color:"red"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''} type="text" placeholder='Enter Lastname' name="lastname" onChange={formik.handleChange}/>{" "}
					{formik.errors.lastname && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.lastname}</p>}
					</Col>
					</Row>
				    <h3>Address <span style={{color:"red"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''} type="text" placeholder='Enter Address' name="address" onChange={formik.handleChange}/>{" "}
					{formik.errors.address && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.address}</p>}
					<Row>
					<Col md="6">
                    <h3>State <span style={{color:"red"}}>*</span></h3>

                    <Input className={formik.errors.firstname?'input-err':''} type="text" placeholder='Enter State' name="state" onChange={formik.handleChange}/>{" "}
					{formik.errors.state && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.state}</p>}
					</Col>
					<Col md="6">
                    <h3>Town/City <span style={{color:"red"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''} type="text" placeholder='Enter Town/City' name="city" onChange={formik.handleChange}/>{" "}
					{formik.errors.city && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.city}</p>}
                    </Col>
					</Row>
                    <h3>Zipcode <span style={{color:"red"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''}  type="number" placeholder='Enter Zipcode' name="zipcode" onChange={formik.handleChange}/>{" "}
					{formik.errors.zipcode && <p  style={{color:"red",margin:"7px 6px ",textAlign:"left",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.zipcode}</p>}
                    <h3>Phone <span style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''}  type="number" placeholder='Enter Phone'name="phone" onChange={formik.handleChange}/>{" "}
					{formik.errors.phone && <p style={{color:"red",margin:"7px 6px ",textAlign:"left",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.phone}</p>}
                    <h3>Emai <span style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>*</span></h3>
                    <Input className={formik.errors.firstname?'input-err':''} type="email" placeholder='Enter Email' name="email" onChange={formik.handleChange}/>{" "}
					{formik.errors.email && <p style={{color:"red",marginBottom:"7px",textAlign:"left",margin:"7px 6px ",fontSize:"12px",fontWeight:"lighter"}}>{formik.errors.email}</p>}
 
                  
                </Col>
                <Col className='form-col2' md="5">
                <h3 style={{fontSize:"27px",fontWeight:"bold"}}>Additional Details</h3>
                <h3>Order Notes (optional) </h3>
                

                    <Input type="textarea" rows="4" name="order_notes" onchange={formik.handleChange}/>
                </Col>


            </Row>
            <div>
                <h3 style={{fontSize:"27px",fontWeight:"bold",margin:"20px 0px"}}>Your Order</h3>

<div className='checkout-subtotal'>
<Row style={{margin:"0px",padding:"2px 1px",backgroundColor:"#333"}}>
 <Col className='heading-col1' md="7"><b>Product</b></Col>
 <Col className='heading-col1' md="4"><b>Subtotal</b></Col>
</Row>
{isCart ? cartData.map((val)=>{
	return(
<Row style={{margin:"0px",background:"rgba(255,255,255)"}}>
 <Col className='detail-col' md="7">{val.title} <b><X size={10} /> {val.qtyAdded}</b></Col>
 <Col className='detail-col' md="4" style={{color:"#21a3bf"}}><b> &#x20b9; </b> {val.price*val.qtyAdded}</Col>
 {/* <Col className='detail-col' md="7">Product-2(vase)</Col>
 <Col className='detail-col' md="4">$149</Col> */}
</Row>
)
}):<Row style={{margin:"0px",background:"rgba(255,255,255)"}}>
<Col className='detail-col' md="7">{productData.title} </Col>
<Col className='detail-col' md="4" style={{color:"#21a3bf"}}><b> &#x20b9; </b> {productData.price}</Col>
{/* <Col className='detail-col' md="7">Product-2(vase)</Col>
<Col className='detail-col' md="4">$149</Col> */}
</Row>
}
{isCart ? <Row style={{margin:"0px",padding:"2px 1px"}}>
 <Col className='heading-col' md="7"><b>Subtotal</b></Col>
 <Col className='detail-col' md="4"  style={{color:"#21a3bf"}}><b> &#x20b9; </b> {totalPriceDetails.price.toFixed(2)}</Col>
</Row> :<Row style={{margin:"0px",padding:"2px 1px"}}>
 <Col className='heading-col' md="7"><b>Subtotal</b></Col>
 <Col className='detail-col' md="4"  style={{color:"#21a3bf"}}><b> &#x20b9; </b> {productData.price}</Col>
</Row>}
</div>
 <h2 style={{fontSize:"24px",padding:"20px",textAlign:"left"}}>Payment Option : <span style={{fontSize:"16px",fontWeight:"bold"}}></span></h2> {/* <i class="fab fa-cc-visa" style={{margin:"0px 7px",fontSize:"24px"}}></i><i class="fab fa-cc-mastercard" style={{margin:"0px 7px",fontSize:"24px"}}></i>*/}
 <div style={{width:"100%",textAlign:"left",padding:"10px 60px"}}>
 <div style={{marginBottom:"20px"}}>
 <Input type="radio" name="radio1"onClick={()=>setOrderType("Cash on Delivery")} /><Label className='frs' style={{marginLeft:"23px"}}>Cash on Delivery</Label><br/>
 </div>
 <div style={{marginBottom:"20px"}}>
 <Input type="radio" name="radio1" onClick={()=>setOrderType("Online")}/><Label className='frs' style={{marginLeft:"23px"}}>Pay Online <img src={rzp} style={{width:"55px",marginLeft:"15px"}} /><img src={googlePayImg} style={{width:"32px",marginLeft:"15px"}} /><img src={ppImg} style={{width:"80px",marginLeft:"15px"}} /></Label>
</div>
</div>
<Button style={{backgroundColor:"#ce7e2ed4",border:"none",width:"90%",padding:"10px"}} className='button-7'  onClick={()=>{if(Object.keys(formik.errors).length>0 || orderType == null){alert("Please fill all details")}else {if(orderType=="Online")handlePayment();else placeCodOrder();}}}>{orderType=="Cash on Delivery"?"Place Order":<div>Pay  <b> &#x20b9; </b> {(productData.price?productData.price:totalPriceDetails.price).toFixed(2)}</div>}</Button>
</div>
</div>:        <div className="checkout-message"><i class="fas fa-cart-arrow-down" style={{color:"white",margin:"0px 10px",fontSize:"21px"}}></i>Your cart is empty</div>
}
{/*Payment Alert Modal */}
<Modal isOpen={openPaymentAlertModal}>
	<ModalBody style={{backgroundColor:"transparent",color:'white',display:"flex",alignItems:"center",flexDirection:"column"}}>
	{paymentAlert=="Payment Failed"?<div style={{color:"#333",width:"100%",textAlign:"center"}}><i class="fas fa-exclamation-triangle" style={{color:"#333",margin:"0px 10px",fontSize:"21px"}}></i> <b>Payment Failed</b><br/>
	<Button style={{backgroundColor:"#grey",border:"none",margin:"10px auto",boxShadow:"none",marginLeft:"auto"}} onClick={()=>{setOpenPaymentAlertModal(false) }}>  Close </Button>

	</div>:
	<div style={{display:"flex",alignItems:"center",flexDirection:"column",color:"#333",justifyContent:"space-between",}}><h5><b>Order placed Successfully! </b><i class="fas fa-check-circle" style={{"color": "#32e81e"}}></i></h5>
	
	<img src={orderSuccessImg} className='order-success-img' />

	<div style={{display:"flex",alignItems:"center",flexDirection:"column",color:"#333",justifyContent:"space-between"}}><h5>Thank You for Shopping with us <i class="fas fa-shopping-cart" style={{color: "#8c7b42"}}></i></h5></div>
	<Button style={{backgroundColor:"#ce7e2ed4",border:"none",margin:"10px auto",boxShadow:"none"}} onClick={()=>{setOpenPaymentAlertModal(false);window.location.href="/" }}>   Back to Home page  </Button>
	<Button style={{backgroundColor:"#ce7e2ed4",border:"none",margin:"10px auto",boxShadow:"none"}} onClick={()=>{setOpenPaymentAlertModal(false);window.location.href="/products" }}>Back to Products Page</Button>

	</div>}

	</ModalBody>
	{/* <ModalFooter>
		<Button style={{backgroundColor:"#ce7e2ed4",border:"none",marginLeft:"auto"}} onClick={()=>{setOpenPaymentAlertModal(false)}}>Done</Button>
	</ModalFooter> */}
</Modal>
        </div>
    )
}