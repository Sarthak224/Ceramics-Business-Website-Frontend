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
	const [currentOrderData,setCurrentOrderData] = useState(false);
	const [ordersList,setOrdersList] = useState(false)
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
				setOrdersList(true);
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
  	 				<a href="https://www.facebook.com/people/Vinkee-Bhasiin-Ceramics/100063774127500/" target='_blank'><i class="fab fa-facebook-f"></i></a>
  	 				<a href="https://www.instagram.com/vinkeebhasiin/" target='_blank'><i class="fab fa-instagram"></i></a>
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
                  
                {currentOrderData && 

			    <div className='ftr' style={{marginBottom:"40px",paddingBottom:"40px",borderBottom:"3px solid #d2af47",borderTop:"3px solid #d2af47",background: /*"linear-gradient(45deg, #f3c86d63, #edb8411f)"*/"#fff",padding:"14px",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",margin: "10px 10px"}}>
			   <h3 className='order-title' style={{fontSize:"21px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid #cac8ee",backgroundColor: "#3534352b",marginTop:"10px",
                padding: "20px",color: "rgb(80 79 79)"}}><span  style={{fontWeight:"normal"}}> Order Date: #</span> : ({currentOrderData.date})</h3>
				<DeliveryProgress step={currentOrderData.order_status=="Confirmed"?1:currentOrderData.order_status=="Shipped"?2:3} />
					<span><b>Status:</b></span><div style={(currentOrderData.order_status=="Delivered")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(102 151 222)",color:"#fff"}:(currentOrderData.order_status=="Shipped")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"#333",color:"#fff"}:{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(64 183 60 / 80%)",color:"#fff"}}>{currentOrderData.order_status} {currentOrderData.order_status=="Confirmed"?<i className="fas fa-check" style={{color:"#fff",marginLeft:"13px"}}></i>:(currentOrderData.order_status=="Shipped")?<i className="fas fa-truck" style={{color: "#ffffff",marginLeft:"13px"}}></i>:<i className="fas fa-check-circle" style={{color: "#ffffff",marginLeft:"13px"}}></i>}</div>
				
			    <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"10px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Billing Details</h5>
                <div>
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Address:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"13px"}}>
                 <p style={{marginBottom:"2px"}}>{currentOrderData.address}</p>
                 <p style={{marginBottom:"2px"}}>{currentOrderData.city},{currentOrderData.state} {currentOrderData.zipcode}</p>
                 </div>

                 <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left",}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"13px"}}>
                 <p style={{marginBottom:"2px"}}><b>Phone No: </b>{currentOrderData.phone}</p>
                 <p style={{marginBottom:"2px"}}><b>E-mail: </b>{currentOrderData.email}</p>
                 </div>
                </div>


			    <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"20px",marginTop:"30px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Product Details</h5>

					{currentOrderData.products && currentOrderData.products.map((val,ind2)=>{
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
                 <p><b>Subtotal: </b> <b>&#8377;</b> {(currentOrderData.subtotal).toFixed(2)}</p>
                 <p><b>Name on order: </b> {currentOrderData.firstname+" "+currentOrderData.lastname}</p>
                 <p><b>Order Notes: </b> {currentOrderData.order_notes}</p>
                 <p><b>Order Payment Type: </b> {currentOrderData.order_type}</p>

                 </div>

                 {/* <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left"}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Phone No: </b>{currentOrder.phone}</p>
                 <p><b>E-mail: </b>{currentOrder.email}</p>
                 </div> */}
				 </div>
                }
		
	 </div>
	 </div>
	 </div>
	</ModalBody>
	{/* <ModalFooter>
		<Button onClick={()=>showOrders(false)}>close</Button>

	</ModalFooter> */}
   </Modal>

   

   <Modal className='client-order-view1' isOpen={ordersList}>
	<ModalHeader>Your Orders List <i className='fas fa-times' style={{cursor:"pointer",fontSize:"22px"}} onClick={()=>setOrdersList(false)}></i></ModalHeader>
	<ModalBody>
     {/* <Input placeholder="Enter email address.." value={defaultEmail} onChange={e=>{defaultEmail=e.target.value}} /> */}
	 <div style={{marginLeft:"0px",marginTop:"23px",marginBottom:"23px",overflow:"auto",maxHeight:"520px"}}>
                  <p>Your Orders with email:<br/><br/> <b>{orderData[0] && orderData[0].email}</b><br/></p>
				  {orderData && orderData.map((val,ind2)=>{
  
				//   return <div className='ftr' style={{marginBottom:"40px",paddingBottom:"40px",borderBottom:"3px solid #d2af47",borderTop:"3px solid #d2af47",background: /*"linear-gradient(45deg, #f3c86d63, #edb8411f)"*/"#fff",padding:"14px",boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",margin: "10px 10px"}}>
				//  <h3 style={{fontSize:"21px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid #cac8ee",backgroundColor: "#3534352b",marginTop:"10px",
				//   padding: "20px",color: "rgb(80 79 79)"}}><span  style={{fontWeight:"normal"}}> Order: </span> #{index+1}: ({currentOrder.date})</h3>
				//   <DeliveryProgress step={currentOrder.order_status=="Confirmed"?1:currentOrder.order_status=="Shipped"?2:3} />
				// 	  <span><b>Status:</b></span><div style={(currentOrder.order_status=="Delivered")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(102 151 222)",color:"#fff"}:(currentOrder.order_status=="Shipped")?{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"#333",color:"#fff"}:{display:"block",padding:"10px 20px", margin:"30px 10px",borderRadius:"10px",backgroundColor:"rgb(64 183 60 / 80%)",color:"#fff"}}>{currentOrder.order_status} {currentOrder.order_status=="Confirmed"?<i className="fas fa-check" style={{color:"#fff",marginLeft:"13px"}}></i>:(currentOrder.order_status=="Shipped")?<i className="fas fa-truck" style={{color: "#ffffff",marginLeft:"13px"}}></i>:<i className="fas fa-check-circle" style={{color: "#ffffff",marginLeft:"13px"}}></i>}</div>
				  
				//   <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"10px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Billing Details</h5>
				//   <div>
				//   <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Address:-</h6>
				//    <div style={{marginLeft:"23px",marginTop:"13px"}}>
				//    <p style={{marginBottom:"2px"}}>{currentOrder.address}</p>
				//    <p style={{marginBottom:"2px"}}>{currentOrder.city},{currentOrder.state} {currentOrder.zipcode}</p>
				//    </div>
  
				//    <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left",}}>Contact Details:-</h6>
				//    <div style={{marginLeft:"23px",marginTop:"13px"}}>
				//    <p style={{marginBottom:"2px"}}><b>Phone No: </b>{currentOrder.phone}</p>
				//    <p style={{marginBottom:"2px"}}><b>E-mail: </b>{currentOrder.email}</p>
				//    </div>
				//   </div>
  
  
				//   <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"20px",marginTop:"30px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Product Details</h5>
  
				// 	  {currentOrder.products && currentOrder.products.map((val,ind2)=>{
					
				
				return(
					<div style={ind2%2==0?{margin:"0px 10px",marginBottom:"20px",backgroundColor: "rgb(255 255 255 / 100%)"
					,padding: "10px",boxShadow: "0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)",borderRadius:"10px"}:{margin:"0px 10px",marginBottom:"20px",backgroundColor: "#fff"
					,padding: "10px",boxShadow: "0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)",borderRadius:"10px"}}>
					  <Row>
						<Col md="4" style={{marginBottom:"10px"}}>
						<Row>
						<Col md="6" style={{maxWidth:"120px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}><img src={val.products[0].image[0]} width="80" height="80" /></Col>
						<Col md="6" style={{maxWidth:"180px"}} ><p className='ftr' style={{maxWidth:"180px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:"2px"}}>{val.products[0].title} {val.products.length>0?' and more...':''}</p><span className='frs' style={{fontSize:"13px"}}><b>Date: </b>{val.date}</span> </Col>
						
						</Row>
						<hr className='view-mobile' style={{width:"90%", margin:"10px auto",borderTop:"2px solid #c5c5c5",marginTop:"30px"}} />

						</Col>

						<Col md="2" className='view-mobile' style={{    margin: "1px 10px",color: "#0d0b0bb0"}} ><p><b style={{textAlign:"center",fontSize:"18px"}}>Total:</b> <span className='frs' style={{marginLeft:"5px"}}>{val.products.length} products</span></p></Col>

						<Col className='view-mobile' md="2"><span></span><a  className='' 
						style={{display:"block",textAlign:"center",color:"#333",cursor:"pointer",backgroundColor:"#fff",padding:"10px 10px",borderRadius:"5px",margin:"5px auto",borderBottom:"5px solid yellowgreen",width:"70%",minWidth:"140px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>{val.order_status}<i className="fas fa-check-circle" style={{color: "yellowgreen",marginLeft:"13px"}}></i></a>
						</Col>
						<Col className='view-pc' md="2" style={{    margin: "15px 0px",color: "#0d0b0bb0"}} ><p><b style={{textAlign:"center"}}>{val.products.length}</b> <span className='frs' style={{marginLeft:"5px"}}>products total.</span></p></Col>
						<Col className='view-pc' md="2"><span></span><a  className='' 
						style={{display:"block",textAlign:"center",color:"#333",cursor:"pointer",backgroundColor:"#fff",padding:"10px 10px",borderRadius:"5px",margin:"5px auto",borderBottom:"5px solid yellowgreen",width:"50%",minWidth:"140px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>{val.order_status}<i className="fas fa-check-circle" style={{color: "yellowgreen",marginLeft:"13px"}}></i></a>
						</Col>
                        
						<Col md="4"><a  className='frs' onClick={()=>{
							showOrders(true);
							setCurrentOrderData(val);
						}} style={{display:"block",textAlign:"center",color:"#fff",cursor:"pointer",backgroundColor:"#d49529c2",padding:"10px 10px",borderRadius:"5px",margin:"5px auto",width:"70%",minWidth:"120px"}}>View Order</a>
						</Col>

					  </Row>
					</div>
				  );
				    })
			  }
		</div>
			  
	
	</ModalBody>
	{/* <ModalFooter>
		<Button onClick={()=>getClientOrders()}>Show orders</Button>
		<Button onClick={()=>showOrdersMenu(false)}>close</Button>

	</ModalFooter> */}
   </Modal>




  </footer>
    )
}