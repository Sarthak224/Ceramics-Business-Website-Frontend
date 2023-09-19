import { Button, Col, Modal, ModalBody, ModalFooter, Row, Table } from 'reactstrap';
import { baseURL } from '../../utils/utils';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import NotificationPopup from '../NotificationPopup';
import { Edit, X } from 'react-feather';
export default function Orders(){

    
    const [searchParams, setSearchParams] = useSearchParams();
    var page = searchParams.get("page");
    const [orders,setOrders] = useState([]);
    const [currentOrder,setCurrentOrder] = useState(false);
    const [openSuccessPopup,setOpenSuccessPopup] = useState(false);
    const [openOrderDetailsPopup,setOpenOrderDetailsPopup] = useState(false);
    // const [openStatusDropdown,setOpenStatusDropdown] = useState(false)

    const colourStyles = {
      control: (styles,{ data, isDisabled, isFocused, isSelected }) =>{ console.log(data); return { ...styles, backgroundColor: 'white'};   return ((data.label)=="Delivered"?{ ...styles, backgroundColor: 'black'}:data.label=="Confirmed"?{ ...styles, backgroundColor: 'grey'}:{ ...styles, backgroundColor: 'red'})},
      placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled ? 'white' : 'white',
          color: 'black'/*data.label=='Delivered'?'black':data.label=='Delivered'?'green':'red'*/,
          cursor: isDisabled ? 'not-allowed' : 'default',
        };
      },
    };


  async function getOrders(){
    try{
    var res = await axios.get(baseURL+"/api/orders/getOrders?page="+page,{});
    console.log(res);
    if(res.status==200){
        setOrders(res.data)
    }
}catch(err){
    alert("Error")
}
  }




  async function updateOrder(status){
    try{
    var res = await axios.post(baseURL+"/api/orders/updateOrder",{
      id:currentOrder._id,
      orderData:{...currentOrder,order_status:status}
    });
    console.log(res);
    if(res.status==200){
      getOrders();
      setOpenSuccessPopup(true);

    }
}catch(err){
  console.log(err)
    alert("Error")
  }
}

  useEffect(()=>{
    getOrders();
  },[])





  function OrderStatusDropdown(props){
    const val = props.val
    const [openStatusDropdown,setOpenStatusDropdown] = useState(false)

    return(
        <div>
               {!openStatusDropdown?<div style={{display:"flex",alignItems:"center"}}><Button color="" style={(val.order_status)=="Delivered"?{backgroundColor:"grey","color":"#fff",borderRadius:"0px"}:val.order_status=="Shipped"?{backgroundColor:"red","color":"#fff",borderRadius:"0px"}:val.order_status=="Confirmed"?{backgroundColor:"green",color:"#fff",borderRadius:"0px"}:{color:"#fff"}}>{val.order_status}</Button><Edit size={20} style={{backgroundColor:"black",color:"white",height:"38px",width:"27px",padding:"6px"}} onClick={()=>setOpenStatusDropdown(true)}/></div>:<div style={{display:"flex",alignItems:"center"}}><Select  options={[
            {
                value:"Shipped",
                label:"Shipped"
            },
            {
                value:"Delivered",
                label:"Delivered"
            },
            {
                value:"Confirmed",
                label:"Confirmed"
            }

         
        ]}
        styles={colourStyles}
           onChange = {(opt)=>{
              setCurrentOrder(val);
              updateOrder(opt.value);
            }}
        placeholder={val.order_status?val.order_status:"Confirmed"}
        />
        <X size={20} style={{backgroundColor:"black",color:"white",height:"37px",width:"27px"}} onClick={()=>setOpenStatusDropdown(false)}/>
        </div>
        }
        </div>
        
    )
}





    return(

        <div className="admin-pages" style={{flexDirection:"column",padding:"20px",justifyContent:"start",overflowX:"auto"}}>
            {/* <h>Orders page!</h1> */}
            <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>

            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Subtotal</th>

          </tr>
        </thead>
        <tbody>
          {orders.map((val,i)=>{
            return (
                <tr>
                <th scope="row">{i+1}</th>
                <td>{val._id}</td>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.email}</td>
                <td><OrderStatusDropdown val = {val}/></td>
                <td><b>&#8377;</b> {val.subtotal/100}</td>
                <td><i class='fas fa-clipboard-list' style={{'font-size':'24px'}} onClick={()=>{
                  setCurrentOrder(val);
                  setOpenOrderDetailsPopup(true)
                }}></i></td>
              </tr>  
            )
          })
        }
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
        <tfoot>
        <tr>
        
        <td colSpan={7}>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <Button disabled={page<=1?true:false} onClick={()=>window.location.href = ("/admin/orders?page="+(--page))}>Prev</Button>
        <Button disabled={orders.length<=0?true:false} onClick={()=>window.location.href = ("/admin/orders?page="+(++page))}>Next</Button>
        </div>
        
        </td>
        </tr>
        </tfoot>
      </Table>
      <NotificationPopup open={openSuccessPopup} setOpen={setOpenSuccessPopup} message={"Updated Successfully"}/>

      <Modal className='coupon-popup-main' isOpen={openOrderDetailsPopup}>
        <ModalBody>
          <div>
            <Row>
              <Col className='frs' md="6">
                <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"30px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Billing Details</h5>
                <div>
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Address:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p>{currentOrder.address}</p>
                 <p>{currentOrder.city},{currentOrder.state} {currentOrder.zipcode}</p>
                 </div>

                 <h6 style={{fontWeight:"bold",marginLeft:"10px",marginTop:"15px",textAlign:"left",}}>Contact Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Phone No: </b>{currentOrder.phone}</p>
                 <p><b>E-mail: </b>{currentOrder.email}</p>
                 </div>
                </div>
              </Col>
              <Col md="6">
              <h5 style={{fontWeight:"normal",marginBottom:"30px",textAlign:"center",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Order Details</h5>
              <div>
              <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Products:-</h6>
              <div style={{marginLeft:"23px",marginTop:"23px",marginBottom:"23px"}}>

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
                })}
                </div>
                <h6 style={{fontWeight:"bold",marginLeft:"10px",textAlign:"left"}}>Other Details:-</h6>
                 <div style={{marginLeft:"23px",marginTop:"23px"}}>
                 <p><b>Subtotal: </b> <b>&#8377;</b> {(currentOrder.subtotal/100).toFixed(2)}</p>
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
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>setOpenOrderDetailsPopup(false)}>Close</Button>
        </ModalFooter>
      </Modal>
        </div>
    )
}