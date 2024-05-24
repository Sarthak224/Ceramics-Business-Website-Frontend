import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'
import { baseURL } from '../utils/utils';
import axios from 'axios';

const ContactUsForm = ({onFooter}) => {


  const [email,setEmail] = useState("");
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [message,setMessage] = useState("");


  const sendFeedback = async()=>{
    try{
      var res = await axios.post(baseURL+'/api/contact-us/',{
        message,email,firstname,lastname
      })
      if(res.status == 201){
        alert("Sent");
      }
    }
    catch(e){
        alert("Error while sending feedback");
    }
  }

  return (
    <div className={onFooter?"contact-form-body frs footer-form":"contact-form-body frs"} style={{marginTop:"0px"}}>
    <Row>
    <Col md="6">
    <h5 className="finria-sans contact-form-label" >Firstname  <span style={{ color: "red" }}>*</span></h5>

    <Input type="text" onChange={(e)=>setFirstName(e.target.value)} />
    </Col>

    <Col md="6">
    <h5 className="finria-sans contact-form-label" >Lastname <span style={{ color: "red" }}>*</span></h5>

    <Input type="text" onChange={(e)=>setLastName(e.target.value)} />
    </Col>

     </Row>
    <h5 className="finria-sans contact-form-label" >E-mail <span style={{ color: "red" }}>*</span></h5>

    <Input type="email" onChange={(e)=>setEmail(e.target.value)} />

    <h5 className="finria-sans contact-form-label" >Your Message <span style={{ color: "red" }}>*</span></h5>

    <Input type="textarea" rows="5" onChange={(e)=>setMessage(e.target.value)} />

    <Button onClick={sendFeedback} className="button-7" color="" style={{margin:"10px 0px",width:"100%",backgroundColor:"#D5A372",color:"white",marginTop:"10%"}}> Send </Button>
</div>
)
}

export default ContactUsForm