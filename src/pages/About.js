import { Button,Row,Col } from 'reactstrap'
import {ShoppingBag,ShoppingCart} from 'react-feather'
import { Link } from 'react-router-dom'
import about1 from '../About-1.jpg'
import about2 from '../About-2.jpg'
import about3 from '../About-3.jpg'
import Categories from './components/Categories'

export default function About(){
    return(
        <div style={{  marginTop: "110px"
    }}>
    <div className="about-page-top-sect">
     <div style={{margin:"2%",display:"block",textAlign:"left"}}>
    <h1 className='down-top-animate delay-1 ftr italic' style={{color:"#999999",fontWeight:"normal",lineHeight:"4.8rem"}}>Lorem Ipsum</h1>
    </div>
    <p className='ftr italic' style={{fontSize:"20px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
    </div>  

    <div className='about-body'>
       <div className='about-sect-1 '>
        <h1  ><b>About us</b></h1>
        <p style={{marginBottom:"50px"}}>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
       </p>
       </div>


       <div className='about-sect-2 '>
          <Row className='bg-white'>
            <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}} >
               <img src={about1} style={{width:"100%",height:"100%",maxHeight:"480px"}} /> 
            </Col>
            <Col className='about-col mobile-col-background1' md="6" style={{alignItems:"left"}}>
            <h1 className='frs' style={{margin:"10px 50px"}}><b>About us</b></h1>
           <p className='frs' style={{padding:"60px",textAlign:"left"}}>      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
           
            </Col>

          </Row>
          <Row className='bg-white'>
          <Col className='about-col mobile-col-background2' md="6" style={{alignItems:"left"}}>
          <h1 className='frs' style={{margin:"10px 50px"}}><b>About us</b></h1>
           <p className='frs'  style={{padding:"60px",textAlign:"left"}}>      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
            </Col>
          <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}}>
          <img src={about2} style={{width:"100%",height:"100%",maxHeight:"480px"}} /> 

          </Col>

          </Row>
       </div>
       <h1 className='frs about-heading-temp' style={{margin:"10vh 2vh 0px",textUnderlineOffset:"initial",textDecoration:"underline"}}> Shop now by Category <i class="fas fa-shopping-bag" style={{color: "inherit",marginLeft:"30px"}}></i></h1>

       <Categories/>

       <h1 className='frs about-heading-temp' style={{margin:"30vh 0px"}}> <i class="fab fa-instagram" style={{margin:"0px 30px"}}></i>Follow us on Instagram</h1>

    </div>



    



    </div>
    )
}