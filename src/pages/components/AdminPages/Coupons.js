import { Button, Col, Input, Modal, ModalBody, Row, Table } from 'reactstrap';
import { baseURL } from '../../utils/utils';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from 'react-feather';

export default function Coupons(){


    const [searchParams, setSearchParams] = useSearchParams();
    var page = searchParams.get("page");
    const [orders,setOrders] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [openCreateCoupon, setOpenCreateCoupon] = useState(false);

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

  useEffect(()=>{
    getOrders();
  },[])

  console.log(startDate)

    return(
      <div className="admin-pages" style={{flexDirection:"column",padding:"20px",justifyContent:"start"}}>
        <Button onClick={()=>setOpenCreateCoupon(true)}> Create New Coupon +</Button>
      <Modal isOpen={openCreateCoupon} className='coupon-popup-main'>
        <ModalBody className='coupon-form'>
          <X style={{position:"absolute",left:"95%",top:"10px",cursor:"pointer"}} size={23} onClick={()=>setOpenCreateCoupon(false)}  />
      <div className="admin-pages" style={{flexDirection:"column",padding:"20px",justifyContent:"start"}}>
       <h4>Coupon code</h4>
       <Input type="text" placeholder="enter Coupon code" />      
       <Row style={{marginTop:"80px",width:"100%"}}>
       <Col md="6">
       <h4 style={{margin:"20px",marginBottom:"80px",textAlign:"left",borderBottom:"1px solid rgb(102 102 102 / 10%)",padding:"20px"}}>Coupon Details</h4>
       <h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Coupon type <span style={{color:"red"}}>*</span></h5>

       <Select options={[{
        label:"Percentage % Discount ",
        value:"Percentage"

       },{  
       label:"Fixed Cart Discounr",
       value:"Percentage"
      },{   
       label:"Fixed Discount",
       value:"Percentage"
       }]} />
       <h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Coupon Value <span style={{color:"red"}}>*</span></h5>

       <Input type="text" placeholder="Enter Coupon code" />      
      
      <h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Valid Till <span style={{color:"red"}}>*</span></h5>

      <DatePicker className='coupon-date-pick' selected={startDate} onChange={(date) => setStartDate(date)} />

       </Col>
       <Col md="6">
       <h4  style={{margin:"20px",marginBottom:"80px",textAlign:"left",borderBottom:"1px solid rgb(102 102 102 / 10%)",padding:"20px"}}>Usage Restrictions</h4>

       <h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Valid For Products <span style={{color:"red"}}>*</span></h5>

      <Select options={[]} />

      <h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Max spend <span style={{color:"red"}}>*</span></h5>

<Input type="text" placeholder="Enter Max spend" />      


<h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Min spend <span style={{color:"red"}}>*</span></h5>
<Input type="text" placeholder="Enter Min spend" />      


<h5 style={{margin:"20px 2px",fontSize:"15px",textAlign:"left"}}>Usage limit per user <span style={{color:"red"}}>*</span></h5>
<Input type="text" placeholder="Enter usage limit per user" />     

       </Col>
  </Row>
  <Button style={{margin:"20px",marginLeft:"auto"}}>Create Coupon</Button>
    </div>
      </ModalBody>
      </Modal>
      </div>
    )
}