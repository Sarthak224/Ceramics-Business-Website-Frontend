import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import { useState } from 'react';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';
import { baseURL } from '../utils/utils';
import DeliveryProgress from './DeliveryProgress';

export default function Footer(){
	
	const [ordersMenu,showOrdersMenu] = useState(false);
	const [orders,showOrders] = useState(false);
	const [orderData,setOrderData] = useState(false);
	var billing_details = localStorage.getItem("billing_details");
    var defaultEmail="";
	if(billing_details){
      defaultEmail = JSON.parse(billing_details).email;
	}

    console.log(orderData)
	async function getClientOrders(){
    
		try{
			

            var res = await axios.get(baseURL+"/api/orders/clientOrders?email="+defaultEmail);
			if(res.data){
				// alert("")
				setOrderData(res.data.reverse(res.data))
				showOrders(true);
			}

		}
		catch(e){
			alert("error while fetching orders");
		}


	}


    return(
        <footer class="footer">
 <div className=' nav-middle' style={{textAlign:"center",margin:" -10px auto"}}>
          <div className='nav-comp nav-color' style={{marginRight:"0%",marginBottom:"20px"}}>
		    <img src={logo} width={80} height={80}  />
            {/* <span className='brand-text ' style={{marginRight:"10%",marginBottom:"0px"}}>React Pottery</span> */}
          </div>
		</div>
  	 <div class="container">
	  
  	 	<div class="row" style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>company</h4>
  	 			<ul>
  	 				<li><Link to='/AboutUs'>About us</Link></li>
  	 				<li><Link to="/products">See our Products</Link></li>
  	 				<li><Link to="/contact-us">Connect</Link></li>
					<li style={{cursor:"pointer"}} onClick={()=>showOrdersMenu(true)}>Orders</li>

  	 				{/* <li><a href="#">affiliate program</a></li> */}
  	 			</ul>
  	 		</div>
  	 		{/* <div class="footer-col">
  	 			<h4 style={{position:"relative"}}>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>online shop</h4>
  	 			<ul>
  	 				<li><a href="#">watch</a></li>
  	 				<li><a href="#">bag</a></li>
  	 				<li><a href="#">shoes</a></li>
  	 				<li><a href="#">dress</a></li>
  	 			</ul>
  	 		</div> */}
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="https://www.facebook.com/people/Vinkee-Bhasiin-Ceramics/100063774127500/"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="https://www.instagram.com/vinkeebhasiin/"><i class="fab fa-instagram"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>





   <Modal isOpen={ordersMenu}>
	<ModalHeader>Enter your Email address</ModalHeader>
	<ModalBody>
     <Input placeholder="Enter email address.." value={defaultEmail} onChange={e=>{defaultEmail=e.target.value}} />
	 {/* <div style={orderData && orderData.length<=0? {maxHeight:"380px",overflow:"auto"}:{display:"none"}}>
              <div>
              <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Products:-</h6>
              <div style={{marginLeft:"23px",marginTop:"23px",marginBottom:"23px"}}>
         
                {orderData && orderData.map(currentOrder=>{
				<div>
				{currentOrder.products && currentOrder.products.map(val=>{
                  return(
                    <div>
                      <Row>
                        <Col md="5">{val.title}</Col>
                        <Col md="4"><b>&#8377;</b> {val.price}</Col>
                        <Col md="3"><b>Quantity: </b>{val.qty}</Col>
                      </Row>
                    </div>
                  );
                })
			}
			
              
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Other Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Subtotal: </b> <b>&#8377;</b> {(currentOrder.subtotal).toFixed(2)}</p>
                 <p><b>Name on order: </b> {currentOrder.firstname+" "+currentOrder.lastname}</p>
                 <p><b>Order Notes: </b> {currentOrder.order_notes}</p>
                 <p><b>Order Payment Type: </b> {currentOrder.order_type}</p>

                 </div>

                 {/* <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left"}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Phone No: </b>{currentOrder.phone}</p>
                 <p><b>E-mail: </b>{currentOrder.email}</p>
                 </div> *//*}
				 </div>
				})}
				 </div> 
                 </div>
	 </div>*/}
	</ModalBody>
	<ModalFooter>
		<Button onClick={()=>getClientOrders()}>Show orders</Button>
		<Button onClick={()=>showOrdersMenu(false)}>close</Button>

	</ModalFooter>
   </Modal>

   <Modal className='client-order-view' isOpen={orders}>
	<ModalHeader>Your Orders <i className='fas fa-times' style={{cursor:"pointer",fontSize:"22px"}} onClick={()=>showOrders(false)}></i></ModalHeader>
	<ModalBody>
	 <div style={orderData && orderData.length>0? {minHeight:"530px",height:"80vh",overflow:"auto"}:{display:"none"}}>
             


              <div>
              {/* <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Your Orders:-</h6> */}
              <div style={{marginLeft:"0px",marginTop:"23px",marginBottom:"23px"}}>
                  
                {orderData && orderData.map((currentOrder,index)=>{

				return <div className='ftr' style={{marginBottom:"40px",paddingBottom:"40px",borderBottom:"3px solid #d2af47",borderTop:"3px solid #d2af47",background: /*"linear-gradient(45deg, #f3c86d63, #edb8411f)"*/"#fff",padding:"14px",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",margin: "10px 10px"}}>
			   <h3 style={{fontSize:"21px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid #cac8ee",backgroundColor: "#3534352b",marginTop:"10px",
                padding: "20px",color: "rgb(80 79 79)"}}><span  style={{fontWeight:"normal"}}> Order: </span> #{index+1}: ({currentOrder.date})</h3>
				<DeliveryProgress step={currentOrder.order_status=="Confirmed"?1:currentOrder.order_status=="Shipped"?2:3} />
					<span><b>Status:</b></span><div style={(currentOrder.order_status=="Delivered")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(102 151 222)",color:"#fff"}:(currentOrder.order_status=="Shipped")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"#333",color:"#fff"}:{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(64 183 60 / 80%)",color:"#fff"}}>{currentOrder.order_status} {currentOrder.order_status=="Confirmed"?<i className="fas fa-check" style={{color:"#fff",marginLeft:"13px"}}></i>:(currentOrder.order_status=="Shipped")?<i className="fas fa-truck" style={{color: "#ffffff",marginLeft:"13px"}}></i>:<i className="fas fa-check-circle" style={{color: "#ffffff",marginLeft:"13px"}}></i>}</div>
				
			    <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"10px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Billing Details</h5>
                <div>
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Address:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"13px"}}>
                 <p style={{marginBottom:"2px"}}>{currentOrder.address}</p>
                 <p style={{marginBottom:"2px"}}>{currentOrder.city},{currentOrder.state} {currentOrder.zipcode}</p>
                 </div>

                 <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left",}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"13px"}}>
                 <p style={{marginBottom:"2px"}}><b>Phone No: </b>{currentOrder.phone}</p>
                 <p style={{marginBottom:"2px"}}><b>E-mail: </b>{currentOrder.email}</p>
                 </div>
                </div>


			    <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"20px",marginTop:"30px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Product Details</h5>

					{currentOrder.products && currentOrder.products.map((val,ind2)=>{
                  return(
                    <div style={ind2%2==0?{marginBottom:"20px",backgroundColor: "rgb(213 230 239 / 28%)"
					,padding: "10px",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}:{marginBottom:"20px",backgroundColor: "#e9e9e9"
					,padding: "10px",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}>
                      <Row>
                        <Col md="5">{val.title}</Col>
                        <Col md="4"><b>&#8377;</b> {val.price}</Col>
                        <Col md="3"><b>Quantity: </b>{val.qty}</Col>
                      </Row>
                    </div>
                  );
                })
			}
			
              
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Other Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Subtotal: </b> <b>&#8377;</b> {(currentOrder.subtotal).toFixed(2)}</p>
                 <p><b>Name on order: </b> {currentOrder.firstname+" "+currentOrder.lastname}</p>
                 <p><b>Order Notes: </b> {currentOrder.order_notes}</p>
                 <p><b>Order Payment Type: </b> {currentOrder.order_type}</p>

                 </div>

                 {/* <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left"}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Phone No: </b>{currentOrder.phone}</p>
                 <p><b>E-mail: </b>{currentOrder.email}</p>
                 </div> */}
				 </div>
				})}
				 </div>
                 </div>
	 </div>
	</ModalBody>
	{/* <ModalFooter>
		<Button onClick={()=>showOrders(false)}>close</Button>

	</ModalFooter> */}
   </Modal>





  </footer>
    )
}