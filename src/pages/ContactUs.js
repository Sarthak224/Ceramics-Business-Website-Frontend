import { Button, Col, Input, Row } from "reactstrap";
import ContactUsForm from "./components/ContactUsForm";

export default function ContactUs() {
    return (
        <div style={{marginTop:"90px",background:""}}>
            <Row>
                <Col md="6">
                    <div className="liner-container" style={{ marginBottom: "49px" }}>
                        <div>
                        <h4 className="finria-sans" style={{ color: "#333", fontWeight: "normal", fontSize: "23px" }}>Contact Details</h4>
                        <h4 className="finria-sans" style={{ color: "#333", fontWeight: "normal", fontSize: "13px" }}>For all enquiries please use the form below to get in touch</h4>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="liner-container" style={{ marginBottom: "29px",marginTop:"19px" }}>

                        <h4 className="finria-sans" style={{ color: "#333", fontWeight: "normal", fontSize: "23px" }}>General Inquiries</h4>
                    </div>
                </Col>
            </Row>
            <Row className="contact-form-row" style={{ marginTop: "0px" }}>

                <Col className="left-col-sep2"  md="6">


                    <div className="frs" style={{ marginTop: "0px", marginBottom: "0px", width: "60%", marginLeft: "auto", marginRight: "auto" }}>
                        <p className="finria-sans" style={{ textAlign: "left",color:"rgb(84 73 73)" }}><span><b>E-mail: </b></span><span style={{ color: "#2193bf", margin: "14px 0px" }}>***@mail.com</span></p>
                        <p className="finria-sans" style={{ textAlign: "left",color:"rgb(84 73 73)" }}><span><b>Phone: </b></span><span style={{ color: "#2193bf" }}>**********</span></p>
                        <p className="finria-sans" style={{ textAlign: "left",color:"rgb(84 73 73)" }}>Uttarakhand, Dehradun</p>

                    </div>

                </Col>
                <Col md="6" >


                    <ContactUsForm />
                    <div class="social-links contact-footer-br">
                    <span className="finria-sans" style={{color:"#f1f1f1"}}>Follow us on</span><br/>
  	 				<a href="https://www.facebook.com/people/Vinkee-Bhasiin-Ceramics/100063774127500/" target="_blank"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="https://www.instagram.com/vinkeebhasiin/" target="_blank"><i class="fab fa-instagram"></i></a>
  	 			</div>

                </Col>

            </Row>
        </div>
    )
}