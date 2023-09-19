import { Button, Col, Input, Row } from "reactstrap";

export default function ContactUs() {
    return (
        <div style={{marginTop:"110px"}}>
            <Row>
                <Col md="6">
                    <div className="liner-container" style={{ marginBottom: "49px" }}>

                        <h4 className="frs" style={{ color: "#666", fontWeight: "normal", fontSize: "23px" }}>Contact Details</h4>

                    </div>
                </Col>
                <Col md="6">
                    <div className="liner-container" style={{ marginBottom: "29px" }}>

                        <h4 className="frs" style={{ color: "#666", fontWeight: "normal", fontSize: "23px" }}>General Inquiries</h4>
                    </div>
                </Col>
            </Row>
            <Row className="contact-form-row" style={{ marginTop: "0px" }}>

                <Col className="left-col-sep2"  md="6">


                    <div className="frs" style={{ marginTop: "0px", marginBottom: "0px", width: "60%", marginLeft: "auto", marginRight: "auto" }}>
                        <p style={{ textAlign: "left" }}><span><b>E-mail: </b></span><span style={{ color: "#2193bf", margin: "14px 0px" }}>2littleclay@gmail.com</span></p>
                        <p style={{ textAlign: "left" }}><span><b>Phone: </b></span><span style={{ color: "#2193bf" }}>+91 9738999999</span></p>
                        <p style={{ textAlign: "left" }}>Uttarakhand, Dehradun</p>

                    </div>

                </Col>
                <Col md="6" >


                    <div className="contact-form-body frs" style={{marginTop:"0px"}}>
                        <h5 style={{ margin: "10px", fontSize: "18px", fontWeight: "normal" }}>Firstname  <span style={{ color: "red" }}>*</span></h5>

                        <Input type="text" />

                        <h5 style={{ margin: "10px", fontSize: "18px", fontWeight: "normal" }}>Lastname <span style={{ color: "red" }}>*</span></h5>

                        <Input type="text" />

                        <h5 style={{ margin: "10px", fontSize: "18px", fontWeight: "normal" }}>E-mail <span style={{ color: "red" }}>*</span></h5>

                        <Input type="email" />

                        <h5 style={{ margin: "10px", fontSize: "18px", fontWeight: "normal" }}>Your Message <span style={{ color: "red" }}>*</span></h5>

                        <Input type="textarea" rows="5" />

                        <Button className="button-7" color="" style={{margin:"10px 0px",width:"100%",backgroundColor:"#D5A372",color:"white"}}> Send </Button>
                    </div>

                </Col>

            </Row>
        </div>
    )
}